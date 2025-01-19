/*
  Warnings:

  - Made the column `FIRST_NAME` on table `USER_INFO` required. This step will fail if there are existing NULL values in that column.
  - Made the column `LAST_NAME` on table `USER_INFO` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `USER_INFO` MODIFY `FIRST_NAME` VARCHAR(191) NOT NULL,
    MODIFY `LAST_NAME` VARCHAR(191) NOT NULL,
    MODIFY `TAG` VARCHAR(191) NULL,
    MODIFY `DATE_OF_BIRTH` DATE NOT NULL;
