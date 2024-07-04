/*
  Warnings:

  - Added the required column `Role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "USEROLE" AS ENUM ('admin', 'common');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "Role" "USEROLE" NOT NULL;
