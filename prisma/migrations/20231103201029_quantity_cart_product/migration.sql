/*
  Warnings:

  - Added the required column `quantity` to the `CartProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartProduct" ADD COLUMN     "quantity" INTEGER NOT NULL;
