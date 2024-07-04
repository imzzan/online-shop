/*
  Warnings:

  - You are about to drop the `otp` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "otp" DROP CONSTRAINT "otp_User_id_fkey";

-- DropTable
DROP TABLE "otp";

-- CreateTable
CREATE TABLE "otps" (
    "Id" TEXT NOT NULL,
    "Otp_code" TEXT NOT NULL,
    "User_id" TEXT NOT NULL,
    "Expired_time" TIMESTAMP(3) NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "otps_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "otps_User_id_key" ON "otps"("User_id");

-- CreateIndex
CREATE UNIQUE INDEX "otps_Id_User_id_key" ON "otps"("Id", "User_id");

-- AddForeignKey
ALTER TABLE "otps" ADD CONSTRAINT "otps_User_id_fkey" FOREIGN KEY ("User_id") REFERENCES "users"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
