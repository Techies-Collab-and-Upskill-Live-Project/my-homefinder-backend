-- CreateEnum
CREATE TYPE "Preference" AS ENUM ('calls', 'chat', 'both');

-- CreateTable
CREATE TABLE "TenantProfile" (
    "id" SERIAL NOT NULL,
    "profileImage" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "NIN" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TenantProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandLordProfile" (
    "id" SERIAL NOT NULL,
    "profileImage" TEXT NOT NULL,
    "typeOfHouse" TEXT NOT NULL,
    "numberOfRooms" TEXT NOT NULL,
    "otherInfo" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "preference" "Preference" NOT NULL DEFAULT 'calls',
    "NIN" TEXT NOT NULL,
    "driversLicense" TEXT NOT NULL,
    "BVN" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "LandLordProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "propertyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TenantProfile_phoneNumber_key" ON "TenantProfile"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "TenantProfile_NIN_key" ON "TenantProfile"("NIN");

-- CreateIndex
CREATE UNIQUE INDEX "LandLordProfile_NIN_key" ON "LandLordProfile"("NIN");

-- CreateIndex
CREATE UNIQUE INDEX "LandLordProfile_driversLicense_key" ON "LandLordProfile"("driversLicense");

-- CreateIndex
CREATE UNIQUE INDEX "LandLordProfile_BVN_key" ON "LandLordProfile"("BVN");

-- AddForeignKey
ALTER TABLE "TenantProfile" ADD CONSTRAINT "TenantProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandLordProfile" ADD CONSTRAINT "LandLordProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;
