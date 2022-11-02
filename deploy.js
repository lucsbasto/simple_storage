import ethers from "ethers";
import fs from "fs";

const main = async () => {
  //http://localhost:7545
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet(
    "b6eae6f309aaa72f522d9630e44b150f60b5c11a9f2134489002ffd0a991629e",
    provider
  );
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
