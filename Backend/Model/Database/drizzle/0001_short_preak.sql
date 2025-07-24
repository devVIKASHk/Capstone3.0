CREATE TABLE `googleAuthTable` (
	`_id` serial AUTO_INCREMENT NOT NULL,
	`auth_provider` enum('google','github','facebook') NOT NULL,
	`provider_id` varchar(255) NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `googleAuthTable__id` PRIMARY KEY(`_id`),
	CONSTRAINT `googleAuthTable_provider_id_unique` UNIQUE(`provider_id`)
);
--> statement-breakpoint
ALTER TABLE `googleAuthTable` ADD CONSTRAINT `googleAuthTable_user_id_usersTable_id_fk` FOREIGN KEY (`user_id`) REFERENCES `usersTable`(`id`) ON DELETE cascade ON UPDATE cascade;