/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `USER_INFO` (
    `USER_IDX` INTEGER NOT NULL AUTO_INCREMENT,
    `EMAIL` VARCHAR(191) NOT NULL,
    `FIRST_NAME` VARCHAR(191) NULL,
    `LAST_NAME` VARCHAR(191) NULL,
    `PASSWORD` VARCHAR(191) NOT NULL,
    `NICKNAME` VARCHAR(191) NULL,
    `TAG` VARCHAR(191) NOT NULL,
    `PHONE_NUMBER` VARCHAR(191) NULL,
    `GENDER` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    `ROLE` ENUM('USER', 'ADMIN') NOT NULL,
    `PROVIDER` VARCHAR(191) NOT NULL,
    `DATE_OF_BIRTH` DATETIME(3) NOT NULL,
    `LAST_LOGIN_TIME` DATETIME(3) NULL,
    `STATUS` ENUM('INACTIVE', 'ACTIVE', 'SUSPENDED', 'BANNED', 'DELETED') NOT NULL,
    `PROFILE_IMAGE` VARCHAR(191) NULL,
    `ENABLE` BOOLEAN NOT NULL DEFAULT true,
    `CREATED_AT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UPDATED_AT` DATETIME(3) NOT NULL,

    UNIQUE INDEX `USER_INFO_EMAIL_key`(`EMAIL`),
    UNIQUE INDEX `USER_INFO_PHONE_NUMBER_key`(`PHONE_NUMBER`),
    INDEX `USER_INFO_CREATED_AT_PROVIDER_idx`(`CREATED_AT`, `PROVIDER`),
    INDEX `USER_INFO_LAST_LOGIN_TIME_PROVIDER_idx`(`LAST_LOGIN_TIME`, `PROVIDER`),
    UNIQUE INDEX `USER_INFO_NICKNAME_TAG_key`(`NICKNAME`, `TAG`),
    PRIMARY KEY (`USER_IDX`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NOTICE` (
    `NOTICE_IDX` INTEGER NOT NULL AUTO_INCREMENT,
    `TITLE` VARCHAR(191) NOT NULL,
    `CONTENT` VARCHAR(191) NOT NULL,
    `IS_PUBLISHED` BOOLEAN NOT NULL DEFAULT true,
    `PUBLISHED_AT` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ENABLE` BOOLEAN NOT NULL DEFAULT true,
    `CREATED_AT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UPDATED_AT` DATETIME(3) NOT NULL,
    `USER_IDX` INTEGER NOT NULL,

    INDEX `NOTICE_PUBLISHED_AT_IS_PUBLISHED_idx`(`PUBLISHED_AT`, `IS_PUBLISHED`),
    INDEX `NOTICE_IS_PUBLISHED_idx`(`IS_PUBLISHED`),
    INDEX `NOTICE_TITLE_IS_PUBLISHED_idx`(`TITLE`, `IS_PUBLISHED`),
    INDEX `NOTICE_USER_IDX_idx`(`USER_IDX`),
    PRIMARY KEY (`NOTICE_IDX`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NOTICE_FILE` (
    `NOTICE_FILE_IDX` INTEGER NOT NULL AUTO_INCREMENT,
    `FILE_URL` VARCHAR(191) NOT NULL,
    `ENABLE` BOOLEAN NOT NULL DEFAULT true,
    `CREATED_AT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UPDATED_AT` DATETIME(3) NOT NULL,
    `NOTICE_IDX` INTEGER NOT NULL,

    PRIMARY KEY (`NOTICE_FILE_IDX`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `POST` (
    `POST_IDX` INTEGER NOT NULL AUTO_INCREMENT,
    `TITLE` VARCHAR(191) NOT NULL,
    `CONTENT` TEXT NOT NULL,
    `IS_PUBLISHED` BOOLEAN NOT NULL DEFAULT false,
    `USER_IDX` INTEGER NOT NULL,
    `POST_CATEGORY_IDX` INTEGER NOT NULL,
    `PUBLISHED_AT` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ENABLE` BOOLEAN NOT NULL DEFAULT true,
    `CREATED_AT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UPDATED_AT` DATETIME(3) NOT NULL,

    INDEX `POST_PUBLISHED_AT_IS_PUBLISHED_idx`(`PUBLISHED_AT`, `IS_PUBLISHED`),
    INDEX `POST_IS_PUBLISHED_idx`(`IS_PUBLISHED`),
    INDEX `POST_TITLE_IS_PUBLISHED_idx`(`TITLE`, `IS_PUBLISHED`),
    INDEX `POST_USER_IDX_idx`(`USER_IDX`),
    PRIMARY KEY (`POST_IDX`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `POST_CATEGORY` (
    `POST_CATEGORY_IDX` INTEGER NOT NULL AUTO_INCREMENT,
    `NAME` VARCHAR(191) NOT NULL,
    `DESCRIPTION` VARCHAR(191) NULL,
    `ENABLE` BOOLEAN NOT NULL DEFAULT true,
    `CREATED_AT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UPDATED_AT` DATETIME(3) NOT NULL,

    UNIQUE INDEX `POST_CATEGORY_NAME_key`(`NAME`),
    INDEX `POST_CATEGORY_NAME_ENABLE_idx`(`NAME`, `ENABLE`),
    PRIMARY KEY (`POST_CATEGORY_IDX`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `POST_COMMENT` (
    `POST_COMMENT_IDX` INTEGER NOT NULL AUTO_INCREMENT,
    `CONTENT` TEXT NOT NULL,
    `POST_IDX` INTEGER NOT NULL,
    `USER_IDX` INTEGER NOT NULL,
    `PARENT_COMMENT_IDX` INTEGER NULL,
    `ENABLE` BOOLEAN NOT NULL DEFAULT true,
    `CREATED_AT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UPDATED_AT` DATETIME(3) NOT NULL,

    INDEX `POST_COMMENT_PARENT_COMMENT_IDX_idx`(`PARENT_COMMENT_IDX`),
    INDEX `POST_COMMENT_POST_IDX_idx`(`POST_IDX`),
    INDEX `POST_COMMENT_USER_IDX_idx`(`USER_IDX`),
    PRIMARY KEY (`POST_COMMENT_IDX`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NOTICE` ADD CONSTRAINT `NOTICE_USER_IDX_fkey` FOREIGN KEY (`USER_IDX`) REFERENCES `USER_INFO`(`USER_IDX`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NOTICE_FILE` ADD CONSTRAINT `NOTICE_FILE_NOTICE_IDX_fkey` FOREIGN KEY (`NOTICE_IDX`) REFERENCES `NOTICE`(`NOTICE_IDX`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `POST` ADD CONSTRAINT `POST_USER_IDX_fkey` FOREIGN KEY (`USER_IDX`) REFERENCES `USER_INFO`(`USER_IDX`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `POST` ADD CONSTRAINT `POST_POST_CATEGORY_IDX_fkey` FOREIGN KEY (`POST_CATEGORY_IDX`) REFERENCES `POST_CATEGORY`(`POST_CATEGORY_IDX`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `POST_COMMENT` ADD CONSTRAINT `POST_COMMENT_POST_IDX_fkey` FOREIGN KEY (`POST_IDX`) REFERENCES `POST`(`POST_IDX`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `POST_COMMENT` ADD CONSTRAINT `POST_COMMENT_USER_IDX_fkey` FOREIGN KEY (`USER_IDX`) REFERENCES `USER_INFO`(`USER_IDX`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `POST_COMMENT` ADD CONSTRAINT `POST_COMMENT_PARENT_COMMENT_IDX_fkey` FOREIGN KEY (`PARENT_COMMENT_IDX`) REFERENCES `POST_COMMENT`(`POST_COMMENT_IDX`) ON DELETE SET NULL ON UPDATE CASCADE;
