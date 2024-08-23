/*
  Warnings:

  - You are about to drop the `BroserFingerprint` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "BroserFingerprint";

-- CreateTable
CREATE TABLE "BrowserFingerprint" (
    "id" SERIAL NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BrowserFingerprint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BrowserFingerprint_fingerprint_key" ON "BrowserFingerprint"("fingerprint");
