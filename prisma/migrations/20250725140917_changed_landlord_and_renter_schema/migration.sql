/*
  Warnings:

  - You are about to drop the column `address` on the `LandLordProfile` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `LandLordProfile` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `LandLordProfile` table. All the data in the column will be lost.
  - You are about to drop the column `otherName` on the `LandLordProfile` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `TenantProfile` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `TenantProfile` table. All the data in the column will be lost.
  - You are about to drop the column `otherName` on the `TenantProfile` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `TenantProfile` table. All the data in the column will be lost.
  - Added the required column `city` to the `LandLordProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `LandLordProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `LandLordProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LandLordProfile" DROP COLUMN "address",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "otherName",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TenantProfile" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "otherName",
DROP COLUMN "street";
