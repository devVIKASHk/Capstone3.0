CREATE TABLE `sessionId` (
	`_id` serial AUTO_INCREMENT NOT NULL,
	`valid` boolean NOT NULL DEFAULT true,
	`ip_address` varchar(45) NOT NULL,
	`user_agent` text NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sessionId__id` PRIMARY KEY(`_id`)
);
--> statement-breakpoint
CREATE TABLE `usersTable` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255),
	`is_email_verified` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `usersTable_id` PRIMARY KEY(`id`),
	CONSTRAINT `usersTable_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `sessionId` ADD CONSTRAINT `sessionId_user_id_usersTable_id_fk` FOREIGN KEY (`user_id`) REFERENCES `usersTable`(`id`) ON DELETE cascade ON UPDATE cascade;