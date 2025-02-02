import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/card';
import { useAccountBalance } from '@/hooks/query/useAccountBalance';
import { useCurAccount } from '@/hooks/query/useCurAccount';
import { Image } from '@heroui/image';
import { Skeleton } from '@heroui/skeleton';
import { Button } from '@heroui/button';
import { CheckCircle, Copy, ExternalLink, Wallet } from 'lucide-react';
import { Chip } from '@heroui/chip';

interface CardPortfolioProps {
  onConnect?: () => void;
}

export default function CardPortfolio({ onConnect }: CardPortfolioProps) {
  const [copied, setCopied] = useState(false);
  const {
    curAddress,
    curAvatar,
    curName,
    isDisconnected,
    isLoading: isAccountLoading
  } = useCurAccount();

  const {
    bNormalized,
    bLoading: isBalanceLoading,
    bError: balanceError
  } = useAccountBalance({ token: "", decimal: 18 });

  console.log('bNormalized', bNormalized);

  const handleCopyAddress = () => {
    if (curAddress) {
      navigator.clipboard.writeText(curAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getAddressDisplay = () => {
    if (!curAddress) return '';
    return `${curAddress.slice(0, 6)}...${curAddress.slice(-4)}`;
  };

  if (isAccountLoading) {
    return (
      <Card className="w-full bg-background/50 p-10 gap-10">
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300" />
        </Skeleton>
        <div className="space-y-2 flex-1">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`w-full overflow-hidden bg-background/50`}>
      <CardBody className="relative p-6 items-center flex justify-center">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />

        <div className="flex flex-col gap-6 items-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-75 blur group-hover:opacity-100 transition duration-300" />
              <Image
                src={curAvatar}
                alt={curName}
                className="relative w-24 h-24 rounded-full border-2 border-gray-700 object-cover"
              />
            </div>
            
            <div className="text-center">
              <CardHeader className="p-0">
                <h3 className="text-2xl font-bold text-white">{curName}</h3>
              </CardHeader>
              <span className={`inline-flex items-center px-3 py-1 mt-2 rounded-full text-sm font-medium ${
                isDisconnected 
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                {isDisconnected ? 'Disconnected' : 'Connected'}
              </span>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            {isDisconnected ? (
              <Button
                className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                onClick={onConnect}
              >
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-transparent border-1 border-gray-700">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                    <span className="text-sm text-gray-400">Wallet Address</span>
                    <div className="flex items-center gap-2">
                      <Chip variant="flat" color="primary" size="sm">
                        {getAddressDisplay()}
                      </Chip>
                      <Button
                        variant="bordered"
                        size="sm"
                        onPress={handleCopyAddress}
                        className="text-gray-400 hover:text-white rounded-full min-w-10 min-h-10"
                      >
                        {copied ? (
                          <CheckCircle className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="bordered"
                        size="sm"
                        onPress={() => window.open(`https://basescan.org/address/${curAddress}`, '_blank')}
                        className="text-gray-400 hover:text-white rounded-full min-w-10 min-h-10"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-transparent border-1 border-gray-700">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                    <span className="text-sm text-gray-400">Balance</span>
                    <div className="flex items-center">
                      {isBalanceLoading ? (
                        <div className="h-5 w-24 bg-gray-700 rounded animate-pulse" />
                      ) : balanceError ? (
                        <span className="text-sm text-red-400">Error loading balance</span>
                      ) : (
                        <span className="text-lg font-medium text-white">
                          {bNormalized} ETH
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}