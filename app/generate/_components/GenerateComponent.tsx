"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import CreateWalletContent from "./CreateWalletContent";
import QuestionnaireContent from "./QuestionnaireContent";
import { useClassifyAI } from "@/hooks/mutation/api/useClassifyAI";
import GeneratedContent from "./GeneratedContent";
import { useGenerateStaking } from "@/hooks/mutation/api/useGenerateStakingAI";

const GenerateComponent = () => {
  const { mutation: mClassify, result: rClassify } = useClassifyAI();
  const { mutation: mGenerate, result: rGenerate } = useGenerateStaking();

  const timelineData = [
    {
      title: "Create Wallet AI",
      content: (
        <CreateWalletContent />
      ),
    },
    {
      title: "Fill Questionnaire",
      content: (
        <QuestionnaireContent mClassify={mClassify} mGenerate={mGenerate}/>
      ),
    },
    {
      title: "Generated Content",
      content: (
        <GeneratedContent />
      )
    },
  ];

  return <Timeline data={timelineData} />;
};

export default GenerateComponent;
