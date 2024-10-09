/*
  Warnings:

  - You are about to drop the `Album` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Photo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_userId_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_albumId_fkey";

-- DropTable
DROP TABLE "Album";

-- DropTable
DROP TABLE "Photo";

-- CreateTable
CREATE TABLE "album" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "albumName" VARCHAR(100) NOT NULL,
    "visibleToUser" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photo" (
    "id" SERIAL NOT NULL,
    "albumId" INTEGER NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "photo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "album" ADD CONSTRAINT "album_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "album" ADD CONSTRAINT "album_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo" ADD CONSTRAINT "photo_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
