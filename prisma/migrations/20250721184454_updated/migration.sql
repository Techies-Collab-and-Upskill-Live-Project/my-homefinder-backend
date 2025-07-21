/*
  Warnings:

  - Added the required column `documentNumber` to the `UserDocument` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserDocument" ADD COLUMN     "documentNumber" TEXT NOT NULL;
