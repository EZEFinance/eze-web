import { gql } from "graphql-request";

export const querySwaps = (address: string) => {
  return gql`{
    swaps(orderBy: blockTimestamp, orderDirection: desc, where: {user: "${address}"}) {
      user
      amount
      tokenIn
      tokenOut
      transactionHash
    }
  }`
}

export const queryTransfers = (address: string) => {
  return gql`{
    transfers(orderBy: blockTimestamp, orderDirection: desc, where: {from: "${address}"}) {
      from
      to
      value
      transactionHash
    }
  }`
}
