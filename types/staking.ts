import { z } from 'zod';

export const StakingSchema = z.object({
  id: z.string(),
  addressToken: z.string(),
  addressStaking: z.string(),
  nameToken: z.string(),
  nameProject: z.string(),
  chain: z.string(),
  apy: z.number(),
  tvl: z.number(),
  stablecoin: z.boolean(),
  categories: z.array(z.string()),
  logo: z.string().url(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export const StakingListSchema = z.array(StakingSchema);

export type Staking = z.infer<typeof StakingSchema>;
export type StakingList = z.infer<typeof StakingListSchema>;
