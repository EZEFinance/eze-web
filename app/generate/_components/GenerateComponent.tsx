"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import CreateWalletContent from "./CreateWalletContent";
import QuestionnaireContent from "./QuestionnaireContent";
import GeneratedContent from "./GeneratedContent";
import { useAccount } from "wagmi";
import { useAddressAI } from "@/hooks/query/useAddressAI";
import Loading from "@/components/loader/loading";

const GenerateComponent: React.FC = () => {
  const risk = localStorage.getItem("risk");
  const protocolId = localStorage.getItem("protocolId");

  const { isConnected } = useAccount();
  const { addressAI, laAI } = useAddressAI();

  if (laAI) {
    return <Loading className="z-[90]"/>;
  }

  const timelineData = [
    {
      title: "Create Wallet AI",
      content: <CreateWalletContent addressAI={addressAI} />,
    },
    {
      title: "Fill Questionnaire",
      content: !isConnected ? (
        <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal mb-4">
          Connect your wallet to see the generated content.
        </p>
      ) : addressAI ? (
        <QuestionnaireContent />
      ) : (
        <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal mb-4">
          You need to create a wallet AI first to automate the staking.
        </p>
      ),
    },
    {
      title: "Generated Content",
      content: !isConnected ? (
        <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-lg font-normal mb-4">
          Connect your wallet to see the generated content.
        </p>
      ) : risk && protocolId ? (
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