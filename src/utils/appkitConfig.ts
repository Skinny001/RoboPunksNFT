// import { createAppKit, useAppKit, useDisconnect } from '@reown/appkit/react'
// import { EthersAdapter } from '@reown/appkit-adapter-ethers'
// import { sepolia } from '@reown/appkit/networks'
// import { useState, useEffect } from 'react'

// // Define our own Network interface
// interface Network {
//   id: string | number;
//   name?: string;
//   nativeCurrency?: {
//     symbol: string;
//     decimals: number;
//   };
// }

// // 1. Get projectId
// const projectId = '359ad909995c5c60ec40cb5251237844';

// // 2. Set the networks - using sepolia testnet
// const networks = [sepolia as unknown as Network];

// // 3. Create a metadata object
// const metadata = {
//   name: '0xSkinny',
//   description: 'NFT Minting Platform',
//   url: window.location.origin,
//   icons: ['https://your-website.com/favicon.ico']
// }

// // 4. Create an AppKit instance
// export const appKit = createAppKit({
//   adapters: [new EthersAdapter()],
//   networks,
//   metadata,
//   projectId,
//   features: {
//     analytics: true
//   }
// })

// export { useAppKit, useDisconnect } from '@reown/appkit/react'

// // Custom account hook
// export function useAccount() {
//   const kit = useAppKit();
//   const [accountData, setAccountData] = useState<{
//     address: string | null;
//     isConnected: boolean;
//   }>({
//     address: null,
//     isConnected: false
//   });
  
//   useEffect(() => {
//     // We need to find a way to get the account from the kit
//     // Since getAccount() doesn't exist, we may need to use another method
//     // or access a property directly
    
//     // This is a placeholder - replace with actual API calls
//     const checkAccount = async () => {
//       try {
//         // Attempt to get account information
//         // This is a guess - you'll need to check the actual API
//         const account = await appKit.getState?.()?.account;
        
//         setAccountData({
//           address: account?.address || null,
//           isConnected: !!account?.address
//         });
//       } catch (error) {
//         console.error("Error getting account:", error);
//       }
//     };
    
//     checkAccount();
    
//     // Event listener setup (placeholder)
//     const eventListener = (event: any) => {
//       if (event.type === 'accountsChanged') {
//         checkAccount();
//       }
//     };
    
//     // Add event listener if the API supports it
//     appKit.on?.('accountsChanged', eventListener);
    
//     return () => {
//       // Remove event listener if the API supports it
//       appKit.off?.('accountsChanged', eventListener);
//     };
//   }, [kit]);
  
//   return accountData;
// }

// // Custom connect hook
// export function useConnect() {
//   const kit = useAppKit();
  
//   return {
//     connect: async (): Promise<boolean> => {
//       try {
//         // Use the open method instead of connect
//         await kit?.open();
//         return true;
//       } catch (e) {
//         console.error("Connection failed:", e);
//         return false;
//       }
//     }
//   };
// }

// interface BalanceData {
//   formatted: string;
//   symbol: string;
// }

// // Custom balance hook
// export function useBalance() {
//   const { address } = useAccount();
//   const [balanceData, setBalanceData] = useState<BalanceData>({ formatted: '0', symbol: 'ETH' });
//   const [isLoading, setIsLoading] = useState(false);
  
//   const fetchBalance = async (): Promise<BalanceData> => {
//     if (!address) {
//       return { formatted: '0', symbol: 'ETH' };
//     }
    
//     setIsLoading(true);
//     try {
//       // Since getBalance doesn't exist, we need an alternative approach
//       // This is a placeholder - replace with actual API calls
      
//       // Example using a hypothetical balance provider
//       // const provider = await appKit.getProvider();
//       // const balanceWei = await provider.getBalance(address);
//       // const formattedBalance = ethers.utils.formatEther(balanceWei);
      
//       // Since we don't know the actual API, we'll return placeholder data
//       setIsLoading(false);
//       return { formatted: '0', symbol: 'ETH' };
//     } catch (error) {
//       console.error("Error fetching balance:", error);
//       setIsLoading(false);
//       return { formatted: '0', symbol: 'ETH' };
//     }
//   };
  
//   useEffect(() => {
//     if (address) {
//       fetchBalance();
//     }
//   }, [address]);
  
//   return {
//     data: balanceData,
//     isLoading,
//     refetch: fetchBalance
//   };
// }