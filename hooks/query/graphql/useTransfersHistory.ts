import { queryTransfers } from "@/graphql/query"
import { TransfersResponse } from "@/types/graphql/transfers"
import { useQuery } from "@tanstack/react-query"
import request from "graphql-request"

interface Transfers {
  transfers: TransfersResponse[]
}

export const useTransfersHistory = () => {
  const { data, isLoading, refetch } = useQuery<Transfers>({
    queryKey: ["transfers"],
    queryFn: async () => {
      return await request(process.env.NEXT_PUBLIC_API_GRAPHQL_URL || "", queryTransfers);
    },
    refetchInterval: 30000,
  })

  const transfers = data?.transfers || []

  return {
    tData: transfers,
    tLoading: isLoading,
    tRefetch: refetch,
  }
}