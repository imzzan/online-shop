-- CreateTable
CREATE TABLE "users" (
    "Id" TEXT NOT NULL,
    "Name" VARCHAR(200) NOT NULL,
    "Email" VARCHAR(200) NOT NULL,
    "Phone" VARCHAR(100) NOT NULL,
    "Password" VARCHAR(100) NOT NULL,
    "Photo" VARCHAR(255) NOT NULL,
    "Is_Active" BOOLEAN NOT NULL DEFAULT false,
    "Alamat" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("Id")
);
