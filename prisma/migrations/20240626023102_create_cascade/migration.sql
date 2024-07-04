-- DropForeignKey
ALTER TABLE "otp" DROP CONSTRAINT "otp_User_id_fkey";

-- DropForeignKey
ALTER TABLE "tokos" DROP CONSTRAINT "tokos_User_id_fkey";

-- AddForeignKey
ALTER TABLE "otp" ADD CONSTRAINT "otp_User_id_fkey" FOREIGN KEY ("User_id") REFERENCES "users"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokos" ADD CONSTRAINT "tokos_User_id_fkey" FOREIGN KEY ("User_id") REFERENCES "users"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
