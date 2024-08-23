-- CreateTable
CREATE TABLE "BroserFingerprint" (
    "id" SERIAL NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BroserFingerprint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BroserFingerprint_fingerprint_key" ON "BroserFingerprint"("fingerprint");
