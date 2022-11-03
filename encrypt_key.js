import ethers from "ethers";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const main = async () => {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const encrypted = await wallet.encrypt(
    process.env.PASSWORD,
    process.env.PRIVATE_KEY
  );

  console.log(encrypted);
  fs.writeFileSync(".encryptedKey.json", encrypted);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
