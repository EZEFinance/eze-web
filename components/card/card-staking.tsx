import React from 'react';
import { Button } from '@heroui/button';
import { Card } from '@heroui/card';
import { ChartArea, DollarSign, ArrowDown, ArrowUp, ExternalLink, Clock, Calendar } from 'lucide-react';
import { Tooltip } from '@heroui/tooltip';
import { formatPercent, formatUSD, normalizeAPY } from '@/lib/helper';
import { urlSepoliaBasescan } from '@/lib/utils';
import { StakingPosition } from '@/types/staking';
import { Image } from '@heroui/image';
import { Chip } from '@heroui/chip';

const StatItem = ({ 
  icon: Icon, 
  label, 
  value, 
  subValue, 
  className = "" 
}: { 
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>, 
  label: string, 
  value: string | number, 
  subValue?: string,
  className?: string 
}) => (
  <div className={`rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 ${className}`}>
    <div className="flex items-center gap-2 mb-2">
      <div className="p-2 rounded-full bg-primary/10">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span>
    </div>
    <p className="text-lg font-bold">{value}</p>
    {subValue && (
      <p className="text-xs text-slate-500 mt-1">{subValue}</p>
    )}
  </div>
);

const CardStaking = ({ pool }: { pool: StakingPosition }) => {
  const now = new Date().getTime() / 1000;
  const durationStaked = now - pool.registrationTimestamp;
  const durationInHours = Math.floor(durationStaked / 3600);
  const durationInDays = Math.floor(durationStaked / 86400);

  return (
    <Card className="p-6 shadow-lg hover:shadow-xl transition-all bg-background/50 duration-300 border border-slate-200 dark:border-slate-700">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full animate-pulse" />
              <Image
                src={pool.pool.logo || "/placeholder.png"}
                alt={pool.pool.nameToken}
                className="w-12 h-12 rounded-full ring-4 ring-offset-4 ring-primary/20"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold">
                {pool.pool.nameProject}
              </h3>
              <p className="text-sm text-slate-500">{pool.pool.nameToken}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 md:ml-auto">
            {pool.pool.categories.map((category, idx) => (
              <Chip 
                key={idx} 
                variant="flat" 
                className="capitalize px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
              >
                {category.replace('-', ' ')}
              </Chip>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <StatItem
              icon={ChartArea}
              label="Current APY"
              value={formatPercent(normalizeAPY(pool.pool.apy))}
              subValue="Annual Percentage Yield"
            />
            <StatItem
              icon={DollarSign}
              label="Total Value Locked"
              value={formatUSD(normalizeAPY(pool.pool.tvl))}
              subValue="Platform Liquidity"
            />
            <StatItem
              icon={DollarSign}
              label="Your Stake"
              value={`${Number(pool.amountStaked).toFixed(2)} ${pool.pool.nameToken}`}
              subValue="Current Position"
            />
            <StatItem
              icon={Clock}
              label="Lock Duration"
              value={`${durationInDays < 1 ? durationInHours + " hours" : durationInDays + " days"}`}
              subValue="Total Period"
            />
            <StatItem
              icon={Calendar}
              label="Started On"
              value={new Date(pool.registrationTimestamp * 1000).toLocaleDateString()}
              subValue="Registration Date"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <Tooltip content="Stake additional tokens to increase your position">
            <Button
              className="min-h-12 flex-1"
              color='primary'
            >
              <span>Stake More</span>
              <ArrowDown className="w-4 h-4 ml-2" />
            </Button>
          </Tooltip>
          <Tooltip content="Withdraw your staked tokens">
            <Button
              variant="bordered"
              className="min-h-12 flex-1"
              color='warning'
            >
              <span>Withdraw</span>
              <ArrowUp className="w-4 h-4 ml-2" />
            </Button>
          </Tooltip>
          <Tooltip content="View contract on blockchain explorer">
            <Button
              variant="flat"
              className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
              onPress={() => window.open(urlSepoliaBasescan({ address: pool.pool.addressStaking, type: "address" }), '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};

export default CardStaking;