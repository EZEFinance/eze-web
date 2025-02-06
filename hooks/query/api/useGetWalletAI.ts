import api from "@/lib/api-agent"
import { StakingList } from "@/types/staking"
import { useQuery } from "@tanstack/react-query"

export const useGetWalletAI = () => {
  const { data: sData, isLoading: sLoading } = useQuery<>({
    queryKey: ["staking"],
    queryFn: async () => {
      const response = api.get("action")
      if (!response.ok) {
        throw new Error("Failed to fetch staking data")
      }
      return response.json()
    }
  })

  return { sData, sLoading }
}