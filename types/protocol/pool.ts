import { z } from 'zod';

export const InvestmentPoolSchema = z.object({
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

export const InvestmentPoolListSchema = z.array(InvestmentPoolSchema);

export type InvestmentPool = z.infer<typeof InvestmentPoolSchema>;
export type InvestmentPoolList = z.infer<typeof InvestmentPoolListSchema>;
