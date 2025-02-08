"use client";

import React, { useState, useMemo } from "react";
import { useSwapsHistory } from "@/hooks/query/graphql/useSwapsHistory";
import { useTransfersHistory } from "@/hooks/query/graphql/useTransfersHistory";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { useAccount } from "wagmi";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Pagination } from "@heroui/pagination";
import { Skeleton } from "@heroui/skeleton";
import { truncateAddress } from "@/lib/helper";
import { normalize } from "@/lib/bignumber";
import { DECIMALS_MOCK_TOKEN } from "@/lib/constants";
import { useStaking } from "@/hooks/query/useStaking";
import { Image } from "@heroui/image";

interface TransferData {
  from: string;
  to: string;
  value: string;
  transactionHash: string;
}

interface SwapData {
  user: string;
  amount: string;
  tokenIn: string;
  tokenOut: string;
  transactionHash: string;
}

type HistoryType = "transfers" | "swaps";

export default function HistoryCard() {
  const { address } = useAccount();
  const { sData } = useStaking();

  const [selectedType, setSelectedType] = useState<HistoryType>("transfers");
  const { dTransfers, tLoading, tRefetch } = useTransfersHistory({
    address: address?.toLowerCase() as `0x${string}`,
  });
  const { dSwaps, sLoading, sRefetch } = useSwapsHistory({
    address: address?.toLowerCase() as `0x${string}`,
  });

  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  const items = useMemo(() => {
    const data = selectedType === "transfers" ? dTransfers : dSwaps;
    const start = (page - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [page, selectedType, dTransfers, dSwaps]);

  const totalPages = Math.ceil(
    (selectedType === "transfers" ? dTransfers.length : dSwaps.length) / rowsPerPage
  );

  const handleRefetch = () => {
    if (selectedType === "transfers") tRefetch();
    if (selectedType === "swaps") sRefetch();
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value as HistoryType);
    setPage(1); // Reset page when changing type
  };

  const findLogoToken = (token: string) => {
    return sData && sData.find((t) => t.addressToken.toLowerCase() === token.toLowerCase())?.logo;
  }

  const renderTableCell = (item: TransferData | SwapData, key: string) => {
    if (selectedType === "transfers") {
      const transferItem = item as TransferData;
      switch (key) {
        case "from":
          return truncateAddress(transferItem.from);
        case "to":
          return truncateAddress(transferItem.to);
        case "value":
          return normalize(transferItem.value, DECIMALS_MOCK_TOKEN);
        case "transactionHash":
          return truncateAddress(transferItem.transactionHash);
        default:
          return "";
      }
    } else {
      const swapItem = item as SwapData;
      switch (key) {
        case "user":
          return truncateAddress(swapItem.user);
        case "amount":
          return normalize(swapItem.amount, DECIMALS_MOCK_TOKEN);
        case "tokenIn":
          return <Image src={findLogoToken(swapItem.tokenIn)} alt="Token In" className="h-6 w-6 bg-white rounded-full" />;
        case "tokenOut":
          return <Image src={findLogoToken(swapItem.tokenOut)} alt="Token Out" className="h-6 w-6 bg-white rounded-full" />;
        case "transactionHash":
          return truncateAddress(swapItem.transactionHash);
        default:
          return "";
      }
    }
  };

  const getColumns = () => {
    if (selectedType === "transfers") {
      return ["from", "to", "value", "transactionHash"];
    }
    return ["user", "amount", "tokenIn", "tokenOut", "transactionHash"];
  };

  const renderSkeletonRows = () => {
    return Array(rowsPerPage).fill(null).map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        {getColumns().map((column) => (
          <TableCell key={`${column}-${index}`}>
            <Skeleton className="w-24 h-6 rounded-lg" />
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <Card className="w-full max-w-xl bg-background/50">
      <CardHeader className="flex items-center justify-between pb-4">
        <span className="text-2xl font-bold">Transaction History</span>
        <div className="flex items-center gap-4">
          <Select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            variant="bordered"
            className="w-32"
          >
            <SelectItem key="transfers" value="transfers">Transfers</SelectItem>
            <SelectItem key="swaps" value="swaps">Swaps</SelectItem>
          </Select>
          <Button variant="bordered" onPress={handleRefetch} disabled={tLoading || sLoading}>
            {tLoading || sLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <Table
          aria-label="Transaction history table"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={totalPages}
                onChange={setPage}
              />
            </div>
          }
          classNames={{ wrapper: "min-h-[222px] bg-transparent" }}
        >
          <TableHeader>
            {getColumns().map((column) => (
              <TableColumn key={column}>{column}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {(tLoading || sLoading) ? (
              renderSkeletonRows()
            ) : (
              items.map((item) => (
                <TableRow key={item.transactionHash}>
                  {getColumns().map((column) => (
                    <TableCell key={column}>
                      {renderTableCell(item, column)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}