"use client";

import React from 'react'
import CardStaking from '@/components/card/card-staking';
import ChartStaking from '@/components/chart/chart-staking';
import CardPortfolio from '@/components/card/card-portfolio';
import { dataStaking } from '@/data/dataStaking';

export default function DashboardComponent() {
  return (
    <div className='flex flex-col gap-4 w-full max-w-7xl justify-center items-center'>
      <div className='flex flex-col lg:flex-row gap-4 w-full justify-center'>
        <CardPortfolio />
        <ChartStaking />
      </div>
      <div className="flex flex-col gap-4 w-full">
        {dataStaking.map((pool, idx) => (
          <CardStaking key={idx} pool={pool} />
        ))}
      </div>
    </div>
  )
}
