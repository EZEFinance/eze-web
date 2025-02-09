import { queryProof } from "@/graphql/query"
import { ProofResponse } from "@/types/graphql/proof"
import { useQuery } from "@tanstack/react-query"
import request from "graphql-request"

interface Proof {
  ezeTaskRespondeds: ProofResponse[]
}

export const useProofHistory = ({ address }: { address: HexAddress }) => {
  const { data, isLoading, refetch } = useQuery<Proof>({
    queryKey: ["ezeTaskRespondeds", address],
    queryFn: async () => {
      return await request(process.env.NEXT_PUBLIC_API_GRAPHQL_AVS_URL || "", queryProof((address.toString()).toLowerCase()));
    },
    refetchInterval: 30000,
  })

  const ezeTaskRespondeds = data?.ezeTaskRespondeds || []

  return {
    dProof: ezeTaskRespondeds,
    sLoading: isLoading,
    sRefetch: refetch,
  }
}