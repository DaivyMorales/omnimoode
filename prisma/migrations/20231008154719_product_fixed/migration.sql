/*
  Warnings:

  - You are about to drop the column `sizes` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `stockId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Stock` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_stockId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "sizes";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "stockId",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL default 0.00;

-- DropTable
DROP TABLE "Stock";

-- CreateTable
CREATE TABLE "Size" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Size" ADD CONSTRAINT "Size_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
