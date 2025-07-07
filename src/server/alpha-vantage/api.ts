export async function getLatestPrice(symbol: string) {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  if (!apiKey) {
    return -1.0;
  }
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const timeSeries = data["Time Series (1min)"];
  const latestTimestamp = Object.keys(timeSeries)[0];
  const latestData = timeSeries[latestTimestamp];
  return parseFloat(latestData["4. close"]);
}
