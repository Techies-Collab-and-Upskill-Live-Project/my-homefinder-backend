/*
  Warnings:

  - Added the required column `type` to the `UserDocument` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserDocument" ADD COLUMN     "type" TEXT NOT NULL;
