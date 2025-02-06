import { Button } from "@heroui/button";
import { Image } from '@heroui/image'
import { Card } from '@heroui/card'
import { Chip } from '@heroui/chip'
import { ArrowDown, ChartArea, DollarSign } from 'lucide-react'
import { formatPercent, formatUSD, normalizeAPY } from '@/lib/helper'
import { useStaking } from "@/hooks/query/useStaking";

export default function GeneratedContent() {
  const { sData } = useStaking();
  
  return (
    <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal mb-4">
            Based on your risk profile, here&apos;s our recommended staking option:
          </p>
          {sData && sData[0] && (
            <Card className="p-4 bg-background/50">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                <div className="flex items-center gap-4 min-w-44">
                  <Image
                    src={sData && sData[0]?.logo}
                    alt={sData && sData[0]?.nameToken}
                    className="min-w-12 min-h-12 opacity-100 p-1 w-12 h-12 rounded-full ring-2 ring-offset-2 ring-slate-100"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {sData && sData[0]?.nameProject}
                    </h3>
                    <p className="text-sm text-slate-500">{sData && sData[0]?.nameToken}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {sData && sData[0]?.categories.map((category: string, idx: number) => (
                    <Chip key={idx} variant='bordered' color='primary' className='text-xs px-1'>
                      {category.replace('-', ' ')}
                    </Chip>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:flex md:items-center gap-4 md:gap-8">
                  <div>
                    <div className="flex items-center gap-2">
                      <ChartArea className="w-4 h-4" />
                      <span className="text-sm font-medium text-slate-600">APY</span>
                    </div>
                    <p className="text-lg font-bold">
                      {formatPercent(normalizeAPY(sData && sData[0]?.apy))}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm font-medium text-slate-600">TVL</span>
                    </div>
                    <p className="text-lg font-bold">
                      {formatUSD(normalizeAPY(sData && sData[0]?.tvl))}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 md:ml-auto">
                  <Button
                    variant="bordered"
                    className="flex-1 md:flex-none flex items-center justify-center gap-2"
                  >
                    <span>Stake</span>
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
  )
}
