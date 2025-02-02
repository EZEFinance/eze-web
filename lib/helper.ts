import { normalize } from "./bignumber";

export const calculateMaxBorrowAmount = (
    priceOracle: number,
    ltv: number,
    decimal: number
): number => {
    const maxBorrowAmount = normalize(ltv * (priceOracle as number), decimal ?? 0)
    return Number(maxBorrowAmount);
}

export const calculateReserveSize = (
    totalSupplyAssets?: number,
    decimal: number = 1e6
): string => {
    return ((totalSupplyAssets ?? 0) / decimal).toFixed(2);
};

export const calculateAvailableLiquidity = (
    totalSupplyAssets?: number,
    totalBorrowAssets?: number,
    decimal: number = 1e6
): string => {
    return ((((totalSupplyAssets ?? 0) - (totalBorrowAssets ?? 0)) / decimal) || 0).toFixed(2);
};

export const calculateBorrowAPR = (
    borrowRate?: number
): string => {
    return (Number(borrowRate ?? 0) / Math.pow(10, 16)).toFixed(2);
};

export const calculateLendAPR = (
    borrowRate?: number,
    totalBorrowAssets?: number,
    totalSupplyAssets?: number
): number => {
    if (!borrowRate || !totalBorrowAssets || !totalSupplyAssets) return 0;
    return Number(
        (borrowRate * totalBorrowAssets / totalSupplyAssets) / Math.pow(10, 16)
    );
};

export const calculateUtilizationRate = (
    totalBorrowAssets?: number,
    totalSupplyAssets?: number
): string => {
    if (!totalBorrowAssets || !totalSupplyAssets) return "0.00";

    return ((totalBorrowAssets / totalSupplyAssets) * 100).toFixed(2);
};

export const truncateAddress = (address: string) => {
    if (!address) return "No Account";
    const match = address.match(
        /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
};

export const toHex = (num: number) => {
    const val = Number(num);
    return "0x" + val.toString(16);
};

export const formatPercent = (value: number) => `${(value * 100).toFixed(2)}%`;

export const formatUSD = (value: number) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);