/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `collections` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,user_id]` on the table `collections` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_collectionId_fkey";

-- CreateTable
CREATE TABLE "save_posts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "collection_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "save_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "save_posts_user_id_post_id_collection_id_key" ON "save_posts"("user_id", "post_id", "collection_id");

-- CreateIndex
CREATE UNIQUE INDEX "collections_name_key" ON "collections"("name");

-- CreateIndex
CREATE UNIQUE INDEX "collections_name_user_id_key" ON "collections"("name", "user_id");

-- AddForeignKey
ALTER TABLE "save_posts" ADD CONSTRAINT "save_posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "save_posts" ADD CONSTRAINT "save_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "save_posts" ADD CONSTRAINT "save_posts_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
