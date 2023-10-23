/*
  Warnings:

  - You are about to drop the column `sizeId` on the `Cart` table. All the data in the column will be lost.
  - Added the required column `sizeId` to the `CartProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_sizeId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "sizeId";

-- AlterTable
ALTER TABLE "CartProduct" ADD COLUMN     "sizeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CartProduct" ADD CONSTRAINT "CartProduct_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
