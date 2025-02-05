import { http, createPublicClient } from 'viem';

import { baseSepolia } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL_BASE_SEPOLIA),
});