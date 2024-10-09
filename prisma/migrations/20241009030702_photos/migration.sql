/*
  Warnings:

  - You are about to drop the `album` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `photo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "album" DROP CONSTRAINT "album_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "album" DROP CONSTRAINT "album_userId_fkey";

-- DropForeignKey
ALTER TABLE "photo" DROP CONSTRAINT "photo_albumId_fkey";

-- DropTable
DROP TABLE "album";

-- DropTable
DROP TABLE "photo";

-- CreateTable
CREATE TABLE "Album" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "albumName" VARCHAR(100) NOT NULL,
    "visibleToUser" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "albumId" INTEGER NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
