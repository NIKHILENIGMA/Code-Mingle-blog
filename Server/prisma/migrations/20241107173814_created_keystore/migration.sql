-- CreateTable
CREATE TABLE "key_store" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "access_key" TEXT NOT NULL,
    "refresh_key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "key_store_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "key_store_user_id_key" ON "key_store"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "key_store_access_key_key" ON "key_store"("access_key");

-- CreateIndex
CREATE UNIQUE INDEX "key_store_refresh_key_key" ON "key_store"("refresh_key");
