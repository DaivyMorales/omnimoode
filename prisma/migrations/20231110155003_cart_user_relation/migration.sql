/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cartId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Cart` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `cartId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cartId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_cartId_key" ON "User"("cartId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
