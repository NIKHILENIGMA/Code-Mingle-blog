/*
  Warnings:

  - You are about to drop the column `auth_provider` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `auth_provider_access_token` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `auth_provider_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `auth_provider_refresh_token` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `auth_provider_token_expiry` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "auth_provider",
DROP COLUMN "auth_provider_access_token",
DROP COLUMN "auth_provider_id",
DROP COLUMN "auth_provider_refresh_token",
DROP COLUMN "auth_provider_token_expiry";

-- CreateTable
CREATE TABLE "UserProvider" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "provider_name" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "provider_access_token" TEXT,
    "provider_refresh_token" TEXT,
    "provider_token_expiry" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProvider_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProvider_user_id_provider_name_key" ON "UserProvider"("user_id", "provider_name");

-- AddForeignKey
ALTER TABLE "UserProvider" ADD CONSTRAINT "UserProvider_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
