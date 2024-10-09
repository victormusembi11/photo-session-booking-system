/*
  Warnings:

  - A unique constraint covering the columns `[bookingId]` on the table `album` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "album_bookingId_key" ON "album"("bookingId");
