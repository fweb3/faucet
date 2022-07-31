-- CreateTable
CREATE TABLE "User" (
    "account" TEXT NOT NULL,
    "email" TEXT,
    "twitter" TEXT,
    "discord" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "sentFweb3" BOOLEAN NOT NULL DEFAULT false,
    "sentMatic" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("account")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_twitter_key" ON "User"("twitter");

-- CreateIndex
CREATE UNIQUE INDEX "User_discord_key" ON "User"("discord");
