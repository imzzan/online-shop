/*
  Warnings:

  - Changed the type of `Price` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "Price",
ADD COLUMN     "Price" INTEGER NOT NULL;
