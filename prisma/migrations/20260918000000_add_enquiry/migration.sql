-- CreateTable
CREATE TABLE `Enquiry` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(64) NULL,
    `requirement` TEXT NOT NULL,
    `subject` VARCHAR(255) NULL,
    `sourcePath` VARCHAR(512) NULL,
    `sourceKey` VARCHAR(191) NULL,
    `status` ENUM('NEW', 'CONTACTED', 'QUALIFIED', 'ARCHIVED') NOT NULL DEFAULT 'NEW',
    `ipAddress` VARCHAR(45) NULL,
    `userAgent` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Enquiry_createdAt_idx`(`createdAt`),
    INDEX `Enquiry_status_idx`(`status`),
    INDEX `Enquiry_email_idx`(`email`),
    INDEX `Enquiry_sourcePath_idx`(`sourcePath`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
