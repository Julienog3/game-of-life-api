/*
  Warnings:

  - You are about to drop the column `bounding` on the `Pattern` table. All the data in the column will be lost.
  - You are about to drop the column `map` on the `Pattern` table. All the data in the column will be lost.
  - Added the required column `boundingX` to the `Pattern` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boundingY` to the `Pattern` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pattern` to the `Pattern` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Pattern` DROP COLUMN `bounding`,
    DROP COLUMN `map`,
    ADD COLUMN `boundingX` INTEGER NOT NULL,
    ADD COLUMN `boundingY` INTEGER NOT NULL,
    ADD COLUMN `pattern` JSON NOT NULL;
