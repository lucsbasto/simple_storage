import ethers from "ethers";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const main = async () => {
  //http://localhost:7545
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const encryptJson = fs.readFileSync("./.encryptedKey.json", "utf-8");

  let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    encryptJson,
    process.env.PRIVATE_KEY_PASSWORD
  );
  wallet = wallet.connect(provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const bin = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf-8");

  const factory = new ethers.ContractFactory(abi, bin, wallet);
  console.log("Deploying contract...");
  const contract = await factory.deploy();
  const transactionReceipt = await contract.deployTransaction.wait(1);
  console.log(`Contract deployed to ${contract.address}`);
  console.log(`Deployment took ${transactionReceipt.gasUsed} gas`);
  console.log(`Transaction hash: ${transactionReceipt.transactionHash}`);
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
