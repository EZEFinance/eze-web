import { querySwaps } from "@/graphql/query"
import { SwapsResponse } from "@/types/graphql/swaps"
import { useQuery } from "@tanstack/react-query"
import request from "graphql-request"

interface Swaps {
  swaps: SwapsResponse[]
}

export const useSwapsHistory = () => {
  const { data, isLoading, refetch } = useQuery<Swaps>({
    queryKey: ["swaps"],
    queryFn: async () => {
      return await request(process.env.NEXT_PUBLIC_API_GRAPHQL_URL || "", querySwaps);
    },
    refetchInterval: 30000,
  })

  const swaps = data?.swaps || []

  return {
    sData: swaps,
    sLoading: isLoading,
    sRefetch: refetch,
  }
}