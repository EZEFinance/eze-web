import { gql } from "graphql-request";

export const querySwaps = gql`{
  swaps(orderDirection: desc, orderBy: blockTimestamp) {
    user
    amount
    tokenIn
    tokenOut
    transactionHash
  }
}`

export const queryTransfers = gql`{
  transfers(orderBy: blockTimestamp, orderDirection: desc) {
    from
    to
    value
    transactionHash
  }
}`