/*
  Warnings:

  - Added the required column `diastolic` to the `Vital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `systolic` to the `Vital` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vital" ADD COLUMN     "diastolic" INTEGER NOT NULL,
ADD COLUMN     "systolic" INTEGER NOT NULL;
