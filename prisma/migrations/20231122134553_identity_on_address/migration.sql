/*
  Warnings:

  - Added the required column `identity_card` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "identity_card" INTEGER NOT NULL;
