/*
  Warnings:

  - You are about to drop the column `birthday` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `identity_card` on the `Address` table. All the data in the column will be lost.
  - Added the required column `neighborhood` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "birthday",
DROP COLUMN "identity_card",
ADD COLUMN     "neighborhood" VARCHAR(30) NOT NULL;

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "card_number" INTEGER NOT NULL,
    "names" VARCHAR(50) NOT NULL,
    "surnames" VARCHAR(50) NOT NULL,
    "due_date" TIMESTAMPTZ NOT NULL,
    "security_code" INTEGER NOT NULL,
    "number_identification" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
