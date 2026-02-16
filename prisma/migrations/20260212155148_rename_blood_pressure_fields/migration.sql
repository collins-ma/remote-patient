/*
  Warnings:

  - Added the required column `highPressure` to the `Vital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lowPressure` to the `Vital` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vital" ADD COLUMN     "highPressure" INTEGER NOT NULL,
ADD COLUMN     "lowPressure" INTEGER NOT NULL;
