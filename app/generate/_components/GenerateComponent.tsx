"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import CreateWalletContent from "./CreateWalletContent";
import QuestionnaireContent from "./QuestionnaireContent";
import GeneratedContent from "./GeneratedContent";
import { useGenerateRiskAI } from "@/hooks/mutation/api/useGenerateRiskAI";
import { useGenerateStakingAI } from "@/hooks/mutation/api/useGenerateStakingAI";

const GenerateComponent = () => {
  const { mutation: mgRisk, result: rgRisk } = useGenerateRiskAI();
  const { mutation: mgStaking, result: rgStaking } = useGenerateStakingAI();

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
        <QuestionnaireContent mgRisk={mgRisk} mgStaking={mgStaking} rgRisk={rgRisk?.risk}/>
      ),
    },
    {
      title: "Generated Content",
      content: (
        <>
          {rgRisk && rgStaking ? (
            <GeneratedContent risk={rgRisk?.risk || ""} protocolId={rgStaking?.response[0].id_project} />
          ) : (
            <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal mb-4">
              You need to fill the questionnaire first.
            </p>
          )
          }
        </>
      )
    },
  ];

  return <Timeline data={timelineData} />;
};

export default GenerateComponent;
