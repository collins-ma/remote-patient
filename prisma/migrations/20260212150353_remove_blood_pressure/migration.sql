/*
  Warnings:

  - You are about to drop the column `diastolic` on the `Vital` table. All the data in the column will be lost.
  - You are about to drop the column `systolic` on the `Vital` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vital" DROP COLUMN "diastolic",
DROP COLUMN "systolic";
