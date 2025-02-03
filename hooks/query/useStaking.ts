import { StakingList } from "@/types/staking"
import { useQuery } from "@tanstack/react-query"

export const useStaking = () => {
  const { data: sData, isLoading: sLoading } = useQuery<StakingList>({
    queryKey: ["staking"],
    queryFn: async () => {
      const response = await fetch(`/staking`)
      if (!response.ok) {
        throw new Error("Failed to fetch staking data")
      }
      return response.json()
    }
  })

  return { sData, sLoading }
}