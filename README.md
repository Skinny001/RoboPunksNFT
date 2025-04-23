# RoboPunks NFT

## Overview

RoboPunks is an ERC-721 NFT collection deployed on Ethereum. The collection features 1,000 unique robot-themed collectibles with a minting price of 0.02 ETH each. Users can mint up to 3 NFTs per wallet when public minting is enabled.

## Live Demo

[View Live Demo](https://robo-punks-nft-blue.vercel.app/)

## Technology Stack

- **Blockchain**: Ethereum
- **Smart Contract**: Solidity ^0.8.24
- **Frontend**: React.js & tailwindCss
- **Contract Libraries**: OpenZeppelin
- **Web3 Integration**: ethers.js/web3.js

## Features

- Mint up to 3 unique RoboPunk NFTs per wallet
- Fixed supply of 1,000 NFTs
- Mint price: 0.02 ETH per NFT
- Owner-controlled public minting switch
- Secure withdrawal mechanism to designated wallet

## Smart Contract Details

The RoboPunksNFT contract is a standard ERC-721 implementation with additional functionality:

- **Minting Control**: Owner can enable/disable public minting
- **Supply Management**: Hard cap of 1,000 NFTs
- **Per-wallet Limits**: Maximum 3 NFTs per wallet address
- **Metadata Management**: Updateable base URI for token metadata
- **Fund Security**: Withdrawals only possible to a designated wallet

## Getting Started

### Prerequisites

- Node.js and npm installed
- MetaMask or another Web3 wallet
- Some ETH for minting and gas fees

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/RoboPunksNFT.git
   cd RoboPunksNFT
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Connect your wallet using the "Connect Wallet" button
2. If public minting is enabled, the mint button will be active
3. Select the quantity you wish to mint (up to 3)
4. Confirm the transaction in your wallet
5. Once confirmed, your NFTs will appear in your Mint Page 

## For Contract Owners

To deploy and manage the contract:

1. Deploy the contract to your chosen Ethereum network
2. Call `setIsPublicMintEnabled(true)` to enable minting
3. Set the base token URI with `setBaseTokenUri("https://your-metadata-server.com/tokens/")`
4. Optionally set a different withdrawal wallet with `setWithdrawWallet(address)`
5. Use `withdraw()` to transfer collected ETH to the designated wallet

## Local Development

```bash
# Install Hardhat for local blockchain development
npm install --save-dev hardhat

# Start local blockchain
npx hardhat node

# Deploy contract to local blockchain
npx hardhat run scripts/deploy.js --network localhost

# Run tests
npx hardhat test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the UNLICENSED License - see the LICENSE file for details.

## Acknowledgments

- Built with OpenZeppelin contracts
- Inspired by the NFT community

## Contact

For questions or support, please open an issue on this repository.
