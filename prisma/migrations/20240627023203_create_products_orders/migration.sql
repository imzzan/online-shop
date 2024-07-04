-- CreateTable
CREATE TABLE "products" (
    "Id" TEXT NOT NULL,
    "Name" VARCHAR(255) NOT NULL,
    "Description" TEXT NOT NULL,
    "Price" VARCHAR(255) NOT NULL,
    "Rating" INTEGER,
    "Discount" INTEGER,
    "Toko_id" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "orders" (
    "Id" TEXT NOT NULL,
    "Product_id" TEXT NOT NULL,
    "User_Id" TEXT NOT NULL,
    "Status" BOOLEAN NOT NULL DEFAULT false,
    "Method" TEXT NOT NULL,
    "Payment_Order" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Payment_Date" TIMESTAMP(3),

    CONSTRAINT "orders_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_Toko_id_key" ON "products"("Toko_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_Id_Toko_id_key" ON "products"("Id", "Toko_id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_Toko_id_fkey" FOREIGN KEY ("Toko_id") REFERENCES "tokos"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_Product_id_fkey" FOREIGN KEY ("Product_id") REFERENCES "products"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_User_Id_fkey" FOREIGN KEY ("User_Id") REFERENCES "users"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
