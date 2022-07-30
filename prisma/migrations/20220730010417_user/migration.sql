-- CreateTable
CREATE TABLE "User" (
    "account" TEXT NOT NULL,
    "twitter" TEXT,
    "discord" TEXT,
    "userToken" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("account")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_twitter_key" ON "User"("twitter");

-- CreateIndex
CREATE UNIQUE INDEX "User_userToken_key" ON "User"("userToken");
