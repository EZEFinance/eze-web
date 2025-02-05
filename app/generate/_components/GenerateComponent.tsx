"use client"

import React, { useState } from 'react'
import { Timeline } from '@/components/ui/timeline'
import { Button } from "@heroui/button"
import { Form } from "@heroui/form"
import { Select, SelectItem } from "@heroui/select"
import { Image } from '@heroui/image'
import { Card } from '@heroui/card'
import { Chip } from '@heroui/chip'
import { ArrowDown, ChartArea, DollarSign } from 'lucide-react'
import { formatPercent, formatUSD, normalizeAPY } from '@/lib/helper'
import { useStaking } from '@/hooks/query/useStaking'
import { urlSepoliaBasescan } from '@/lib/utils'

interface FormData {
  profit: string;
  loss: string;
  amount: string;
}

export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];

const GenerateComponent = () => {
  const { sData } = useStaking();

  const [formData, setFormData] = useState<FormData>({
    profit: "",
    loss: "",
    amount: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const timelineData = [
    {
      title: "Create Wallet AI",
      content: (
        <div className='flex flex-col gap-4'>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal">
          You need to create a wallet AI first to automate the staking.
          </p>
          <Button
            type="submit"
            className="w-fit transition-colors"
            variant='solid'
            color='primary'
          >
            Create Wallet
          </Button>
        </div>
      ),
    },
    {
      title: "Fill Questionnaire",
      content: (
        <div className='flex flex-col gap-4'>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal">
            Fill the questionnaire to help us understand your needs.
          </p>
          <Form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5 w-full">
              <div className="form-group flex flex-col gap-1">
                <p className='text-sm'>Select the profit range for the current month</p>
                <Select
                  placeholder="Select the profit range"
                  variant="bordered"
                  classNames={{
                    trigger: "min-h-16",
                    listboxWrapper: "max-h-[400px]",
                  }}
                  onChange={(e) => setFormData(prev => ({ ...prev, profit: e.target.value }))}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animal.key} value={animal.key}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="form-group flex flex-col gap-1">
                <p className='text-sm'>Select the loss range for the current month</p>
                <Select
                  placeholder="Select the loss range"
                  variant="bordered"
                  classNames={{
                    trigger: "min-h-16",
                    listboxWrapper: "max-h-[400px]",
                  }}
                  onChange={(e) => setFormData(prev => ({ ...prev, loss: e.target.value }))}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animal.key} value={animal.key}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="form-group flex flex-col gap-1">
                <p className='text-sm'>Select the income range for the current month</p>
                <Select
                  placeholder="Select the income"
                  variant="bordered"
                  classNames={{
                    trigger: "min-h-16",
                    listboxWrapper: "max-h-[400px]",
                  }}
                  onChange={(e) => setFormData(prev => ({ ...prev, token: e.target.value }))}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animal.key} value={animal.key}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Generate
              </Button>
            </div>
          </Form>
        </div>
      ),
    },
    {
      title: "Generated Content",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal mb-4">
            Recommendation from ai to help you getting highest profit from staking.
          </p>
          <Card className="p-4 bg-background/50">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              <div className="flex items-center gap-4 min-w-44">
                <Image
                  src={sData && sData[1].logo}
                  alt={sData && sData[1].nameToken}
                  className="min-w-12 min-h-12 opacity-100 p-1 w-12 h-12 rounded-full ring-2 ring-offset-2 ring-slate-100"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {sData && sData[1].nameProject}
                  </h3>
                  <p className="text-sm text-slate-500">{sData && sData[1].nameToken}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {sData && sData[1].categories.map((category, idx) => (
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
                  <p className="text-lg font-bold">{formatPercent(normalizeAPY((sData && sData[1].apy) ?? 0))}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm font-medium text-slate-600">TVL</span>
                  </div>
                  <p className="text-lg font-bold">{formatUSD(normalizeAPY((sData && sData[1].tvl) ?? 0))}</p>
                </div>
              </div>

              <div className="flex gap-2 md:ml-auto">
                <Button
                  onPress={() => window.open(`${urlSepoliaBasescan(sData && sData[1].addressStaking)}`, '_blank')}
                  variant="bordered"
                  className="flex-1 md:flex-none flex items-center justify-center gap-2"
                >
                  <span>Stake</span>
                  <ArrowDown className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <Timeline data={timelineData} />
  )
}

export default GenerateComponent