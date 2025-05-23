const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  // if you changed the name of the contract, be sure to update this here!
  const MyToken = await hre.ethers.getContractFactory("MyToken");

  const nft = await MyToken.deploy();

  await nft.deployed();

  console.log("NFT deployed to:", nft.address);

  // mint one to yourself!
  const signer0 = await ethers.provider.getSigner(0);
  // update the IPFS CID to be your metadata CID
  await nft.safeMint(
    await signer0.getAddress(),
    "https://bafybeiaiz2dpkve7zwafmqghqd6pmwglmcxfal4rczcqcfxp6buaq6vd4y.ipfs.dweb.link?filename=Screenshot%20at%20Aug%2031%2012-02-04.png"
  );

  console.log("NFT Minted!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
