import { normalize } from '@/lib/bignumber'
import { useAccount, useBalance } from 'wagmi'

export const useAccountBalance = ({ token= null, decimal = 18 }: { token: string | null, decimal: number }) => {
  const { address } = useAccount()

  const { data: result, isLoading: bLoading, error: bError } = useBalance({
    address: address,
    token: token as HexAddress,
  })

  const bNormal = result?.value
  const bNormalized = result?.value ? normalize(result.value.toString(), decimal).slice(0, 8) : undefined

  return {
    bNormal,
    bNormalized,
    bLoading,
    bError
  }
}