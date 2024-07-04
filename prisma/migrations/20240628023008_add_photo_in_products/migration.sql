/*
  Warnings:

  - Added the required column `Photo` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "Photo" VARCHAR(255) NOT NULL;
