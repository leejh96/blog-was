/*
  Warnings:

  - You are about to alter the column `GENDER` on the `USER_INFO` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Int`.
  - You are about to alter the column `ROLE` on the `USER_INFO` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Int`.
  - You are about to alter the column `PROVIDER` on the `USER_INFO` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `STATUS` on the `USER_INFO` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Int`.

*/
-- AlterTable
ALTER TABLE `USER_INFO` MODIFY `GENDER` INTEGER NOT NULL,
    MODIFY `ROLE` INTEGER NOT NULL,
    MODIFY `PROVIDER` INTEGER NOT NULL,
    MODIFY `STATUS` INTEGER NOT NULL;
