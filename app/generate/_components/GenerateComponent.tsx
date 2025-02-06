"use client";

import React, { useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Select, SelectItem } from "@heroui/select";
import { dataForm } from "@/data/dataForm";
import { Image } from '@heroui/image'
import { Card } from '@heroui/card'
import { Chip } from '@heroui/chip'
import { ArrowDown, ChartArea, DollarSign } from 'lucide-react'
import { formatPercent, formatUSD, normalizeAPY } from '@/lib/helper'
import { useStaking } from "@/hooks/query/useStaking";

interface FormData {
  [key: number]: number;
}

const GenerateComponent = () => {
  const { sData } = useStaking();

  const [formData, setFormData] = useState<FormData>({});
  const [walletCreated, setWalletCreated] = useState<boolean>(false);

  const handleCreateWallet = () => {
    setWalletCreated(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.keys(formData).length !== dataForm.questions.length) {
      alert("Please answer all questions");
      return;
    }

    const formattedSubmission = Object.entries(formData)
      .map(([questionIndex, answerIndex]) => {
        const qIndex = parseInt(questionIndex);
        return `${dataForm.questions[qIndex].question} = ${dataForm.questions[qIndex].options[answerIndex]}`;
      })
      .join(". ");

    console.log(formattedSubmission);    
  };

  const timelineData = [
    {
      title: "Create Wallet AI",
      content: (
        <div className="flex flex-col gap-4">
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal">
            You need to create a wallet AI first to automate the staking.
          </p>
          <Button
            type="button"
            className="w-fit transition-colors"
            variant="solid"
            color="primary"
            disabled={walletCreated}
            onClick={handleCreateWallet}
          >
            {walletCreated ? "Wallet Created" : "Create Wallet"}
          </Button>
        </div>
      ),
    },
    {
      title: "Fill Questionnaire",
      content: (
        <div className="flex flex-col gap-4">
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal">
            Fill the questionnaire to help us understand your needs.
          </p>
          <Form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full bg-background/30 p-5 rounded-2xl">
            {dataForm.questions.map((q, index) => (
              <div key={index} className="form-group flex flex-col gap-1 w-full">
                <p className="text-sm">{q.question}</p>
                <Select
                  placeholder="Select an option"
                  variant="bordered"
                  className="w-full"
                  classNames={{
                    trigger: "min-h-16",
                    listboxWrapper: "max-h-[400px]",
                  }}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [index]: parseInt(e.target.value),
                    }))
                  }
                  value={formData[index] !== undefined ? formData[index].toString() : ""}
                >
                  {q.options.map((option, optIndex) => (
                    <SelectItem key={optIndex} value={optIndex.toString()}>
                      {option}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            ))}

            <Button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              Submit
            </Button>
          </Form>
        </div>
      ),
    },
    {
      title: "Generated Content",
      content:
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
        </div>,
    },
  ];

  return <Timeline data={timelineData} />;
};

export default GenerateComponent;
