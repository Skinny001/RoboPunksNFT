import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { sepolia, AppKitNetwork } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import React, { ReactNode } from 'react'
import { InfuraProvider } from 'ethers'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from environment variable and ensure it's a string
const envProjectId = process.env.VITE_PROJECT_ID || process.env.VITE_PROJECT_ID;

if (!envProjectId) {
  console.warn("Warning: Project ID is not defined. Make sure to set VITE_PROJECT_ID in your environment variables.");
}

// Ensure projectId is always a string - use empty string as fallback if undefined
export const projectId = envProjectId || "";

// 2. Create a metadata object
const metadata = {
  name: 'NFT-wallet',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit',
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// 3. Set the networks - TypeScript expects at least one network
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [ sepolia];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true // Set to false for React (not Next.js)
});

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks, // You can also use this if you want to specify networks here
  projectId,
  metadata,
  features: {
    analytics: false,
  }
})

console.log("Project ID:", projectId);
console.log("Networks:", networks);
console.log("Wagmi Config:", wagmiAdapter.wagmiConfig);

// Export the wagmi config for use elsewhere if needed
export const config = wagmiAdapter.wagmiConfig;

// Create the provider component
export function AppKitProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}