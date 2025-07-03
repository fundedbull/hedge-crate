import { restClient } from "@polygon.io/client-js";
import { getLatestPrice } from "../alpha-vantage/api";

export type AnalyzedOptionContract = {
  // Basic contract info
  ticker: string;
  contract: string;
  strike: number;
  expiration: string;
  currentPrice: number;

  // Pricing data
  premium: number;
  bid?: number;
  ask?: number;
  mid?: number;
  spread?: number;
  spreadPercent?: number;

  // Contract economics
  maxContracts: number;
  totalPremiumIncome: number;
  totalCashRequired: number;

  // Risk metrics
  moneyness: number; // (current - strike) / current
  moneynessType: "ITM" | "OTM";
  distanceFromCurrent: number; // % below current price
  breakeven: number;
  maxLoss: number; // if assigned

  // Yield calculations
  premiumYield: number; // premium / strike (per contract)
  annualizedYield: number; // annualized based on DTE
  yieldOnCash: number; // total premium / total cash required
  annualizedYieldOnCash: number;

  // Time metrics
  daysToExpiration: number;

  // Quality scores (0-100)
  liquidityScore: number;
  yieldScore: number;
  riskScore: number;
  overallScore: number;

  // Flags for easy filtering
  isHighYield: boolean;
  isLowRisk: boolean;
  isLiquid: boolean;
  isRecommended: boolean;
};

const rest = restClient(process.env.POLYGON_API_KEY || "your-key-here");

function calculateDaysToExpiration(expirationDate: string): number {
  const expiration = new Date(expirationDate);
  const today = new Date();
  const diffTime = expiration.getTime() - today.getTime();
  return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1);
}

function estimatePremium(
  strike: number,
  currentPrice: number,
  daysToExpiration: number
): number {
  // Enhanced premium estimation for American puts
  const moneyness = strike / currentPrice;
  const timeDecay = Math.sqrt(daysToExpiration / 365);
  const intrinsicValue = Math.max(strike - currentPrice, 0);

  // More realistic time value estimation
  const volatility = 0.25; // Assume 25% volatility
  const timeValue =
    currentPrice * volatility * timeDecay * Math.sqrt(moneyness);

  // American put early exercise premium
  const earlyExercisePremium = intrinsicValue > 0 ? intrinsicValue * 0.1 : 0;

  return Math.max(intrinsicValue + timeValue + earlyExercisePremium, 0.05);
}

function calculateLiquidityScore(
  bid: number,
  ask: number,
  premium: number
): number {
  if (!bid || !ask || bid <= 0 || ask <= 0) return 0;

  const spread = ask - bid;
  const spreadPercent = (spread / premium) * 100;

  // Score based on spread percentage
  if (spreadPercent <= 5) return 100;
  if (spreadPercent <= 10) return 80;
  if (spreadPercent <= 20) return 60;
  if (spreadPercent <= 30) return 40;
  return 20;
}

function calculateYieldScore(annualizedYield: number): number {
  // Score based on annualized yield
  const yieldPercent = annualizedYield * 100;

  if (yieldPercent >= 20) return 100;
  if (yieldPercent >= 15) return 90;
  if (yieldPercent >= 12) return 80;
  if (yieldPercent >= 10) return 70;
  if (yieldPercent >= 8) return 60;
  if (yieldPercent >= 6) return 50;
  if (yieldPercent >= 4) return 40;
  return Math.max(yieldPercent * 10, 10);
}

function calculateRiskScore(
  moneyness: number,
  daysToExpiration: number
): number {
  let score = 100;

  // Penalize ITM options (higher assignment risk)
  if (moneyness > 0) {
    score -= moneyness * 200; // Heavy penalty for ITM
  }

  // Penalize very short-term options (higher gamma risk)
  if (daysToExpiration <= 7) {
    score -= 30;
  } else if (daysToExpiration <= 14) {
    score -= 15;
  }

  // Penalize options too close to current price
  const distanceFromCurrent = Math.abs(moneyness);
  if (distanceFromCurrent < 0.05) {
    // Within 5%
    score -= 20;
  }

  return Math.max(score, 0);
}

function analyzeContract(
  ticker: string,
  contract: any,
  currentPrice: number,
  premium: number,
  bid: number,
  ask: number,
  budget: number
): AnalyzedOptionContract {
  const strike = contract.strike_price ?? 0;
  const expiration = contract.expiration_date ?? "";
  const daysToExpiration = calculateDaysToExpiration(expiration);

  // Calculate basic metrics
  const moneyness = (currentPrice - strike) / currentPrice;
  const moneynessType = moneyness > 0 ? "ITM" : "OTM";
  const distanceFromCurrent = ((currentPrice - strike) / currentPrice) * 100;
  const breakeven = strike - premium;

  // Contract economics
  const maxContracts = Math.floor(budget / (strike * 100));
  const totalPremiumIncome = premium * 100 * maxContracts;
  const totalCashRequired = strike * 100 * maxContracts;
  const maxLoss = totalCashRequired - totalPremiumIncome; // If assigned and stock goes to 0

  // Yield calculations
  const premiumYield = premium / strike;
  const annualizedYield = premiumYield * (365 / daysToExpiration);
  const yieldOnCash = totalPremiumIncome / totalCashRequired;
  const annualizedYieldOnCash = yieldOnCash * (365 / daysToExpiration);

  // Spread analysis
  const spread = ask > 0 && bid > 0 ? ask - bid : 0;
  const spreadPercent = spread > 0 ? (spread / premium) * 100 : 0;

  // Quality scores
  const liquidityScore = calculateLiquidityScore(bid, ask, premium);
  const yieldScore = calculateYieldScore(annualizedYield);
  const riskScore = calculateRiskScore(moneyness, daysToExpiration);
  const overallScore =
    liquidityScore * 0.3 + yieldScore * 0.4 + riskScore * 0.3;

  // Remove overly restrictive filters
  const isHighYield = annualizedYield >= 0.08; // Lower to 8%+ annualized
  const isLowRisk = moneynessType === "OTM" && Math.abs(moneyness) >= 0.02; // Lower to 2%+ OTM
  const isLiquid = liquidityScore >= 40 || (bid === 0 && ask === 0); // Accept estimates
  const isRecommended =
    (isHighYield || yieldScore >= 50) &&
    (isLowRisk || riskScore >= 60) &&
    overallScore >= 50;

  return {
    ticker,
    contract: contract.ticker!,
    strike,
    expiration,
    currentPrice,
    premium: Number(premium.toFixed(2)),
    bid: bid > 0 ? Number(bid.toFixed(2)) : undefined,
    ask: ask > 0 ? Number(ask.toFixed(2)) : undefined,
    mid: ask > 0 && bid > 0 ? Number(((ask + bid) / 2).toFixed(2)) : undefined,
    spread: spread > 0 ? Number(spread.toFixed(2)) : undefined,
    spreadPercent:
      spreadPercent > 0 ? Number(spreadPercent.toFixed(1)) : undefined,
    maxContracts,
    totalPremiumIncome: Number(totalPremiumIncome.toFixed(2)),
    totalCashRequired: Number(totalCashRequired.toFixed(2)),
    moneyness: Number(moneyness.toFixed(4)),
    moneynessType,
    distanceFromCurrent: Number(distanceFromCurrent.toFixed(1)),
    breakeven: Number(breakeven.toFixed(2)),
    maxLoss: Number(maxLoss.toFixed(2)),
    premiumYield: Number((premiumYield * 100).toFixed(2)), // As percentage
    annualizedYield: Number((annualizedYield * 100).toFixed(2)), // As percentage
    yieldOnCash: Number((yieldOnCash * 100).toFixed(2)), // As percentage
    annualizedYieldOnCash: Number((annualizedYieldOnCash * 100).toFixed(2)), // As percentage
    daysToExpiration,
    liquidityScore: Number(liquidityScore.toFixed(0)),
    yieldScore: Number(yieldScore.toFixed(0)),
    riskScore: Number(riskScore.toFixed(0)),
    overallScore: Number(overallScore.toFixed(0)),
    isHighYield,
    isLowRisk,
    isLiquid,
    isRecommended,
  };
}

export async function findBestCashSecuredPuts(
  tickers: string[],
  targetYieldPercent: number,
  expiration: string,
  budget: number,
  debug: boolean = true
): Promise<{
  allContracts: AnalyzedOptionContract[];
  recommended: AnalyzedOptionContract[];
  summary: {
    totalAnalyzed: number;
    highYieldCount: number;
    lowRiskCount: number;
    liquidCount: number;
    recommendedCount: number;
    averageYield: number;
    bestYield: number;
    bestOverallScore: number;
  };
}> {
  const allContracts: AnalyzedOptionContract[] = [];
  const targetPremiumIncome = budget * targetYieldPercent;

  if (debug) {
    console.log(`\n=== CASH SECURED PUT ANALYSIS ===`);
    console.log(`Budget: ${budget.toLocaleString()}`);
    console.log(
      `Target Premium Income: ${targetPremiumIncome.toLocaleString()}`
    );
    console.log(`Target Yield: ${(targetYieldPercent * 100).toFixed(1)}%`);
    console.log(`Expiration: ${expiration}\n`);
  }

  for (const ticker of tickers) {
    try {
      if (debug) console.log(`\n📊 Analyzing ${ticker}...`);

      const currentPrice = await getLatestPrice(ticker);
      if (currentPrice <= 0.0) {
        console.error(`❌ No current price for ${ticker}, skipping...`);
        continue;
      }

      // More aggressive strike range - ASTS at $46 should have lots of options
      const minStrike = Math.max(currentPrice * 0.6, 1); // 40% below or $1 minimum
      const maxStrike = currentPrice * 1.05; // Include slightly ITM puts too

      if (debug) {
        console.log(`Current Price: ${currentPrice.toFixed(2)}`);
        console.log(
          `Strike Range: ${minStrike.toFixed(2)} - ${maxStrike.toFixed(2)}`
        );
        console.log(
          `Max possible contracts at ${currentPrice}: ${Math.floor(
            budget / (currentPrice * 100)
          )}`
        );
      }

      // First, try to get ANY put options for this expiration
      let optionsContracts;
      try {
        optionsContracts = await rest.reference.optionsContracts({
          underlying_ticker: ticker,
          contract_type: "put",
          expiration_date: expiration,
          "strike_price.gte": minStrike.toString(),
          "strike_price.lte": maxStrike.toString(),
          order: "desc",
          limit: 100,
          sort: "strike_price",
        });

        if (debug) {
          console.log(
            `📋 API Response: Found ${
              optionsContracts.results?.length || 0
            } contracts`
          );
        }
      } catch (apiError) {
        console.error(`❌ API Error for ${ticker}:`, apiError);

        // Try without strike price filters as fallback
        try {
          if (debug) console.log(`🔄 Retrying without strike filters...`);
          optionsContracts = await rest.reference.optionsContracts({
            underlying_ticker: ticker,
            contract_type: "put",
            expiration_date: expiration,
            order: "desc",
            limit: 100,
            sort: "strike_price",
          });
          if (debug)
            console.log(
              `📋 Fallback found: ${
                optionsContracts.results?.length || 0
              } contracts`
            );
        } catch (fallbackError) {
          console.error(
            `❌ Fallback also failed for ${ticker}:`,
            fallbackError
          );
          continue;
        }
      }

      let contractsFound = 0;
      let contractsWithPricing = 0;

      for (const contract of optionsContracts.results || []) {
        const strikePrice = contract.strike_price ?? 0;

        // Apply strike filter manually if we used fallback API call
        if (strikePrice < minStrike || strikePrice > maxStrike) {
          continue;
        }

        try {
          const optionTicker = contract.ticker!;
          if (debug && contractsFound < 3) {
            console.log(`🔍 Checking ${optionTicker} (Strike: ${strikePrice})`);
          }

          let premium = 0;
          let bid = 0;
          let ask = 0;
          let hasRealData = false;

          // Try to get snapshot data
          try {
            const snapshot = await rest.options.snapshotOptionContract(
              ticker,
              optionTicker
            );

            if (snapshot?.results?.last_quote) {
              bid = snapshot.results.last_quote.bid ?? 0;
              ask = snapshot.results.last_quote.ask ?? 0;
              if (bid > 0 || ask > 0) {
                premium =
                  ask > 0 && bid > 0 ? (ask + bid) / 2 : ask > 0 ? ask : bid;
                hasRealData = true;
                contractsWithPricing++;
              }
            }

            // Fallback to last trade
            if (premium === 0 && snapshot?.results?.last_trade) {
              premium = snapshot.results.last_trade.price ?? 0;
              if (premium > 0) hasRealData = true;
            }
          } catch (snapshotError) {
            if (debug && contractsFound < 3) {
              console.log(
                `⚠️  Snapshot failed for ${optionTicker}, will estimate`
              );
            }
          }

          // Always estimate if no real data, but be more realistic
          if (premium === 0) {
            const daysToExp = calculateDaysToExpiration(
              contract.expiration_date ?? ""
            );
            premium = estimatePremium(strikePrice, currentPrice, daysToExp);
            if (debug && contractsFound < 3) {
              console.log(`📊 Estimated premium: ${premium.toFixed(2)}`);
            }
          }

          // Basic sanity check - premium should be reasonable
          const maxReasonablePremium = Math.min(
            strikePrice * 0.5,
            currentPrice * 0.3
          );
          if (premium > maxReasonablePremium) {
            premium = maxReasonablePremium;
          }

          // Calculate potential income to see if it meets basic threshold
          const maxContracts = Math.floor(budget / (strikePrice * 100));
          const totalPremiumIncome = premium * 100 * maxContracts;

          if (debug && contractsFound < 3) {
            console.log(
              `💰 Max contracts: ${maxContracts}, Total income: ${totalPremiumIncome.toFixed(
                2
              )}`
            );
          }

          if (premium > 0.01 && maxContracts > 0) {
            // Very basic filters
            const analyzed = analyzeContract(
              ticker,
              contract,
              currentPrice,
              premium,
              bid,
              ask,
              budget
            );
            allContracts.push(analyzed);
            contractsFound++;

            if (debug && contractsFound <= 3) {
              console.log(
                `✅ Added ${optionTicker}: Premium ${premium.toFixed(
                  2
                )}, Yield ${analyzed.annualizedYield.toFixed(1)}%`
              );
            }
          }

          // Rate limiting
          if (contractsFound % 10 === 0) {
            await new Promise((resolve) => setTimeout(resolve, 200));
          }
        } catch (e) {
          if (debug) console.error(`❌ Error analyzing contract: ${e}`);
        }
      }

      if (debug) {
        console.log(`✅ ${ticker} Summary:`);
        console.log(`   - Contracts found: ${contractsFound}`);
        console.log(`   - With real pricing: ${contractsWithPricing}`);
        console.log(
          `   - With estimates: ${contractsFound - contractsWithPricing}`
        );
      }
    } catch (e) {
      console.error(`❌ Error fetching data for ${ticker}:`, e);
    }
  }

  // Sort by overall score
  allContracts.sort((a, b) => b.overallScore - a.overallScore);

  // Filter recommended contracts
  const recommended = allContracts.filter((c) => c.isRecommended);

  // Calculate summary statistics
  const summary = {
    totalAnalyzed: allContracts.length,
    highYieldCount: allContracts.filter((c) => c.isHighYield).length,
    lowRiskCount: allContracts.filter((c) => c.isLowRisk).length,
    liquidCount: allContracts.filter((c) => c.isLiquid).length,
    recommendedCount: recommended.length,
    averageYield:
      allContracts.length > 0
        ? Number(
            (
              allContracts.reduce((sum, c) => sum + c.annualizedYield, 0) /
              allContracts.length
            ).toFixed(2)
          )
        : 0,
    bestYield:
      allContracts.length > 0
        ? Math.max(...allContracts.map((c) => c.annualizedYield))
        : 0,
    bestOverallScore:
      allContracts.length > 0
        ? Math.max(...allContracts.map((c) => c.overallScore))
        : 0,
  };

  if (debug) {
    console.log(`\n=== ANALYSIS COMPLETE ===`);
    console.log(`Total Contracts Analyzed: ${summary.totalAnalyzed}`);
    console.log(`High Yield (8%+): ${summary.highYieldCount}`);
    console.log(`Low Risk: ${summary.lowRiskCount}`);
    console.log(`Liquid: ${summary.liquidCount}`);
    console.log(`Recommended: ${summary.recommendedCount}`);
    console.log(`Average Annualized Yield: ${summary.averageYield}%`);
    console.log(`Best Yield Found: ${summary.bestYield}%`);

    if (summary.totalAnalyzed === 0) {
      console.log(`\n🚨 DEBUGGING HELP:`);
      console.log(`1. Check if expiration date is valid: ${expiration}`);
      console.log(`2. Verify API key has options permissions`);
      console.log(`3. Try a different expiration date (next monthly expiry)`);
      console.log(`4. Check if ${tickers[0]} actually has options`);
    }
  }

  return { allContracts, recommended, summary };
}

// Helper function to format contract for LLM consumption
export function formatContractForLLM(contract: AnalyzedOptionContract): string {
  return `
Contract: ${contract.ticker} ${contract.expiration} $${contract.strike} PUT
Current Stock Price: $${contract.currentPrice}
Premium: $${contract.premium} (${contract.moneynessType})
Annualized Yield: ${contract.annualizedYield}%
Risk Level: ${contract.isLowRisk ? "LOW" : "MODERATE/HIGH"}
Liquidity: ${contract.isLiquid ? "HIGH" : "LOW"} (Score: ${
    contract.liquidityScore
  }/100)
Days to Expiration: ${contract.daysToExpiration}
Max Contracts: ${contract.maxContracts}
Total Premium Income: $${contract.totalPremiumIncome.toLocaleString()}
Total Cash Required: $${contract.totalCashRequired.toLocaleString()}
Breakeven Stock Price: $${contract.breakeven}
Overall Score: ${contract.overallScore}/100
${contract.isRecommended ? "✅ RECOMMENDED" : ""}
`.trim();
}

// Quick debug function to test API connectivity
export async function debugOptionChain(
  ticker: string,
  expiration: string
): Promise<void> {
  console.log(`\n🔧 DEBUGGING ${ticker} for ${expiration}...`);

  try {
    // Test basic stock price
    const currentPrice = await getLatestPrice(ticker);
    console.log(`✅ Stock price: ${currentPrice}`);

    if (currentPrice <= 0) {
      console.log(`❌ Cannot get stock price - check ticker or API`);
      return;
    }

    // Test options API without filters
    const allOptions = await rest.reference.optionsContracts({
      underlying_ticker: ticker,
      contract_type: "put",
      limit: 10,
    });

    console.log(
      `📊 Total put options available: ${allOptions.results?.length || 0}`
    );

    if (allOptions.results && allOptions.results.length > 0) {
      console.log(`📋 Sample contracts:`);
      allOptions.results.slice(0, 3).forEach((contract) => {
        console.log(
          `   ${contract.ticker} - Strike: ${contract.strike_price} - Exp: ${contract.expiration_date}`
        );
      });
    }

    // Test specific expiration
    const expOptions = await rest.reference.optionsContracts({
      underlying_ticker: ticker,
      contract_type: "put",
      expiration_date: expiration,
      limit: 10,
    });

    console.log(
      `📅 Put options for ${expiration}: ${expOptions.results?.length || 0}`
    );

    if (expOptions.results && expOptions.results.length > 0) {
      console.log(`📋 Available strikes for ${expiration}:`);
      expOptions.results.slice(0, 5).forEach((contract) => {
        console.log(`   Strike: ${contract.strike_price}`);
      });
    } else {
      console.log(`❌ No options found for ${expiration}`);
      console.log(`💡 Try these common monthly expirations:`);

      // Suggest next few monthly expirations (3rd Friday)
      const now = new Date();
      for (let i = 0; i < 4; i++) {
        const targetMonth = new Date(
          now.getFullYear(),
          now.getMonth() + i + 1,
          1
        );
        const thirdFriday = getThirdFriday(targetMonth);
        console.log(`   ${thirdFriday.toISOString().split("T")[0]}`);
      }
    }
  } catch (error) {
    console.error(`❌ Debug failed:`, error);
  }
}

function getThirdFriday(date: Date): Date {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstFriday = new Date(
    year,
    month,
    1 + ((5 - firstDay.getDay() + 7) % 7)
  );
  return new Date(year, month, firstDay.getDate() + 14);
}
export function getTopPicksAnalytical(
  contracts: AnalyzedOptionContract[],
  maxPicks: number = 3
): AnalyzedOptionContract[] {
  return contracts
    .filter((c) => c.isRecommended)
    .sort((a, b) => {
      // Primary: Overall score
      if (Math.abs(a.overallScore - b.overallScore) > 5) {
        return b.overallScore - a.overallScore;
      }
      // Secondary: Annualized yield
      return b.annualizedYield - a.annualizedYield;
    })
    .slice(0, maxPicks);
}
