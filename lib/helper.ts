export const normalizeAPY = (apy: number) => {
    return apy / 100;
}

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

export const formatPercent = (value: number) => `${(value).toFixed(2)}%`;

export const formatUSD = (value: number) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);