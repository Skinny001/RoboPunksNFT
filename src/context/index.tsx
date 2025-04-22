import React, { ReactNode } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';

// This is your main provider component
export default function AppKitContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Just use the AppKit provider as is - it already has the wagmi provider set up internally
  return children;
}

// This is a hook to use in your components
export const useAppKitWallet = () => {
  const { isConnected, address } = useAccount();
  const { connect: wagmiConnect, isPending: isConnecting } = useConnect();
  const { disconnect, isPending: isDisconnecting } = useDisconnect();
  const { open } = useAppKit();

  const connect = async () => {
    try {
      console.log('Attempting to open AppKit modal...');
      // Open the AppKit modal
      await open();
      console.log('Wallet connected successfully.');
    } catch (err) {
      if (err.code === 4001) {
        console.error('User rejected the connection request.');
      } else {
        console.error('Connection error:', err);
      }
    }
  };

  return {
    isConnected,
    connect,
    disconnect,
    address,
    isConnecting,
    isDisconnecting
  };
};



// AppKitContext.tsx
// import React, { ReactNode, createContext, useContext } from 'react';
// import { useAccount, useConnect, useDisconnect } from 'wagmi';
// import { useAppKit } from '@reown/appkit/react';
// import { configureChains, createConfig, WagmiConfig } from 'wagmi';
// import { sepolia } from 'wagmi/chains';
// import { alchemyProvider } from 'wagmi/providers/alchemy';
// import { publicProvider } from 'wagmi/providers/public';
// import { InjectedConnector } from 'wagmi/connectors/injected';

// // Configure the chains and providers
// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [sepolia],
//   [
//     alchemyProvider({ apiKey: 'YOUR_ALCHEMY_API_KEY' }), // Replace with your Alchemy API key
//     publicProvider(),
//   ]
// );

// // Create wagmi config
// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors: [
//     new InjectedConnector({ 
//       chains,
//       options: {
//         name: 'Injected',
//         shimDisconnect: true,
//       },
//     }),
//   ],
//   publicClient,
//   webSocketPublicClient,
// });

// // Create a context to hold wallet-related state and functions
// const AppKitWalletContext = createContext(null);

// // This is your main provider component
// export function AppKitContextProvider({ children }: { children: ReactNode }) {
//   // Wrap children with WagmiConfig and AppKit providers
//   return (
//     <WagmiConfig config={wagmiConfig}>
//       {children}
//     </WagmiConfig>
//   );
// }

// // This is a hook to use in your components
// export const useAppKitWallet = () => {
//   const { isConnected, address } = useAccount();
//   const { connect: wagmiConnect, isPending: isConnecting } = useConnect({
//     connector: new InjectedConnector({ chains }),
//   });
//   const { disconnect, isPending: isDisconnecting } = useDisconnect();
//   const { open } = useAppKit();

//   const connect = async () => {
//     try {
//       console.log('Attempting to open AppKit modal...');
//       // Open the AppKit modal
//       await open();
//       // Additionally, trigger Wagmi connect
//       await wagmiConnect();
//       console.log('Wallet connected successfully.');
//     } catch (err) {
//       if (err.code === 4001) {
//         console.error('User rejected the connection request.');
//       } else {
//         console.error('Connection error:', err);
//       }
//     }
//   };

//   return {
//     isConnected,
//     connect,
//     disconnect,
//     address,
//     isConnecting,
//     isDisconnecting
//   };
// };