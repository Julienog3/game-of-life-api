/*
  Warnings:

  - You are about to alter the column `speed` on the `Pattern` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Pattern` MODIFY `period` INTEGER NULL,
    MODIFY `speed` INTEGER NULL;
