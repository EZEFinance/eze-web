"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import CreateWalletContent from "./CreateWalletContent";
import QuestionnaireContent from "./QuestionnaireContent";
import GeneratedContent from "./GeneratedContent";

const GenerateComponent: React.FC = () => {
  const risk = localStorage.getItem("risk");
  const protocolId = localStorage.getItem("protocolId");

  const timelineData = [
    {
      title: "Create Wallet AI",
      content: <CreateWalletContent />,
    },
    {
      title: "Fill Questionnaire",
      content: (
        <QuestionnaireContent />
      ),
    },
    {
      title: "Generated Content",
      content: risk && protocolId ? (
        <GeneratedContent risk={risk} protocolId={protocolId} />
      ) : (
        <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal mb-4">
          You need to fill the questionnaire first.
        </p>
      ),
    },
  ];

  return <Timeline data={timelineData} />;
};

export default GenerateComponent;