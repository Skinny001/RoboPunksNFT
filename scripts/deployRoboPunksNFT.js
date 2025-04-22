// Import hardhat as a CommonJS module in an ES Module environment
import pkg from 'hardhat';
const { ethers } = pkg;

async function main() {
    const RoboPunksNFT = await ethers.getContractFactory("RoboPunksNFT");
    const roboPunksNFT = await RoboPunksNFT.deploy();
    
    // The deployment method changed in newer Hardhat versions
    await roboPunksNFT.waitForDeployment();
    
    // And address is now accessed via getAddress()
    const address = await roboPunksNFT.getAddress();
    
    console.log("RoboPunksNFT deployed to:", address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });