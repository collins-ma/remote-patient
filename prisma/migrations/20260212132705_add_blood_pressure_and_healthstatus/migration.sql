/*
  Warnings:

  - You are about to drop the column `heartRate` on the `Vital` table. All the data in the column will be lost.
  - You are about to drop the column `temperature` on the `Vital` table. All the data in the column will be lost.
  - Added the required column `diastolic` to the `Vital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `systolic` to the `Vital` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HealthStatus" AS ENUM ('GOOD', 'AVERAGE', 'CRITICAL');

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "healthStatus" "HealthStatus";

-- AlterTable
ALTER TABLE "Vital" DROP COLUMN "heartRate",
DROP COLUMN "temperature",
ADD COLUMN     "diastolic" INTEGER NOT NULL,
ADD COLUMN     "systolic" INTEGER NOT NULL;
