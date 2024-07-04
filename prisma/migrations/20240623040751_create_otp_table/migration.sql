-- CreateTable
CREATE TABLE "otp" (
    "Id" TEXT NOT NULL,
    "Otp_code" TEXT NOT NULL,
    "User_id" TEXT NOT NULL,
    "Expired_time" TIMESTAMP(3) NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "otp_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "otp_User_id_key" ON "otp"("User_id");

-- CreateIndex
CREATE UNIQUE INDEX "otp_Id_User_id_key" ON "otp"("Id", "User_id");

-- AddForeignKey
ALTER TABLE "otp" ADD CONSTRAINT "otp_User_id_fkey" FOREIGN KEY ("User_id") REFERENCES "users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
