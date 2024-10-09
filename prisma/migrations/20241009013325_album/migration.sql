-- CreateTable
CREATE TABLE "album" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "albumName" VARCHAR(100) NOT NULL,
    "visibleToUser" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "album_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "album" ADD CONSTRAINT "album_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "album" ADD CONSTRAINT "album_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
