-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "country" VARCHAR(25) NOT NULL,
    "names" VARCHAR(50) NOT NULL,
    "surnames" VARCHAR(50) NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "specifications" TEXT NOT NULL,
    "state" VARCHAR(20) NOT NULL,
    "city" VARCHAR(30) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
