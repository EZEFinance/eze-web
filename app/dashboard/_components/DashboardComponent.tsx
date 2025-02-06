"use client";

import React, { useState } from 'react'
import CardStaking from '@/components/card/card-staking';
import ChartStaking from '@/components/chart/chart-staking';
import CardPortfolio from '@/components/card/card-portfolio';
import { useStaking } from '@/hooks/query/useStaking';

export default function DashboardComponent() {
  const { sData } = useStaking();
  const [isAIWallet, setIsAIWallet] = useState(false);

  return (
    <div className='flex flex-col gap-4 w-full max-w-7xl justify-center items-center'>
      <div className='flex flex-col lg:flex-row gap-4 w-full justify-center'>
        <CardPortfolio isAIWallet={isAIWallet} setIsAIWallet={setIsAIWallet}/>
        <ChartStaking />
      </div>
      {isAIWallet && (
        <div className="flex flex-col gap-4 w-full">
          {sData && sData.map((pool, idx) => (
            <CardStaking key={idx} pool={pool} />
          ))}
        </div>
      )}
    </div>
  )
}
