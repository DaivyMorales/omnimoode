/*
  Warnings:

  - Added the required column `isLoaded` to the `CartProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartProduct" ADD COLUMN     "isLoaded" BOOLEAN NOT NULL;
