import { z } from 'zod';

export const InvestmentPoolSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  chainId: z.number(),
  fee: z.number().nullable(),
  apr: z.number(),
  aprWeek: z.number(),
  aprMonth: z.number(),
  borrowApr: z.number(),
  investmentUrl: z.string(),
  totalValueLocked: z.number(),
  tokens: z.object({
    borrows: z.array(z.unknown()).nullable().optional(),
    rewards: z.array(z.unknown()),
    deposits: z.array(
      z.object({
        apr: z.number(),
        ltv: z.null().or(z.number()),
        icon: z.string(),
        name: z.string(),
        symbol: z.string(),
        tokens: z.array(
          z.object({
            icon: z.string(),
            name: z.string(),
            symbol: z.string(),
            address: z.string(),
            displayName: z.string(),
          })
        ),
        address: z.string(),
        displayName: z.string(),
        utilizationRate: z.null().or(z.number()),
      })
    ),
    borrowRewards: z.array(z.unknown()),
  }),
  source: z.string(),
  sourceId: z.string(),
  categories: z.array(z.string()),
  isActive: z.boolean(),
  status: z.string(),
  code: z.string(),
  retrieved_at: z.string(),
  farm: z.object({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    name: z.string(),
    slug: z.string(),
    code: z.string(),
    description: z.string(),
    url: z.string(),
    logo: z.string(),
    isEnabled: z.boolean(),
    categories: z.array(z.string()),
  }),
  isNew: z.boolean(),
});

export const InvestmentPoolListSchema = z.array(InvestmentPoolSchema);

export type InvestmentPool = z.infer<typeof InvestmentPoolSchema>;
export type InvestmentPoolList = z.infer<typeof InvestmentPoolListSchema>;
