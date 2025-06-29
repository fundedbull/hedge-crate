CREATE TABLE `hedge_crates_cards_table` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`ticker` text NOT NULL,
	`strike` decimal(10,2) NOT NULL,
	`expiration` text NOT NULL,
	`contract` text NOT NULL,
	`contracts_to_sell` int NOT NULL,
	`premium_per_contract` decimal(10,2) NOT NULL,
	`total_premium_income` decimal(10,2) NOT NULL,
	`cash_required` decimal(10,2) NOT NULL,
	`annualized_yield` decimal(10,4) NOT NULL,
	`break_even_price` decimal(10,2) NOT NULL,
	`setup_plan` text NOT NULL,
	`exit_plan` json NOT NULL,
	`risk_assessment` text NOT NULL,
	`reasoning` text NOT NULL,
	`rarity` enum('common','rare','epic') NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `hedge_crates_cards_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `user_id_index` ON `hedge_crates_cards_table` (`user_id`);--> statement-breakpoint
CREATE TABLE `hedge_crates_credits_transaction_table` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`amount` int NOT NULL,
	`type` enum('purchase','reward','crate_open','other') NOT NULL,
	`card_id` bigint unsigned,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `hedge_crates_credits_transaction_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `user_id_index` ON `hedge_crates_credits_transaction_table` (`user_id`);--> statement-breakpoint
CREATE TABLE `hedge_crates_users_table` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`clerk_id` text NOT NULL,
	`credits` int NOT NULL DEFAULT 0,
	`tier` enum('no_tier','free_tier','pro_tier') NOT NULL DEFAULT 'free_tier',
	`subscribed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`joined_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `hedge_crates_users_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `clerk_id_index` ON `hedge_crates_users_table` (`clerk_id`);