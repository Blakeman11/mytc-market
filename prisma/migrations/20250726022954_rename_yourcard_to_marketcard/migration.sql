/*
  Warnings:

  - You are about to drop the `YourCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "YourCard";

-- CreateTable
CREATE TABLE "MarketCard" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "playerName" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "variant" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "isSold" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MarketCard_pkey" PRIMARY KEY ("id")
);
