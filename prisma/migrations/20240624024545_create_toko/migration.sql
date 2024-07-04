-- CreateTable
CREATE TABLE "tokos" (
    "Id" TEXT NOT NULL,
    "Name" VARCHAR(200) NOT NULL,
    "Descripsi_Toko" TEXT NOT NULL,
    "Photo" VARCHAR(255) NOT NULL,
    "Alamat" TEXT NOT NULL,
    "User_id" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tokos_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tokos_User_id_key" ON "tokos"("User_id");

-- CreateIndex
CREATE UNIQUE INDEX "tokos_Id_User_id_key" ON "tokos"("Id", "User_id");

-- AddForeignKey
ALTER TABLE "tokos" ADD CONSTRAINT "tokos_User_id_fkey" FOREIGN KEY ("User_id") REFERENCES "users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
