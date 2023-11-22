/*
  Warnings:

  - Changed the type of `due_date` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "due_date",
ADD COLUMN     "due_date" VARCHAR(4) NOT NULL;
