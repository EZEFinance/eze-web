import { dataClassify } from "@/data/dataClassify";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import apiAgent from "@/lib/api-agent";
import React from "react";
import { useAccount } from "wagmi";

type Status = "idle" | "loading" | "success" | "error";

export const useGenerateAI = () => {
  const [risk, setRisk] = React.useState<string | null>(null);
  const [protocolId, setProtocolId] = React.useState<string | null>(null);
  const { address } = useAccount();

  React.useEffect(() => {
    const storedRisk = localStorage.getItem("risk");
    if (risk && !storedRisk) {
      localStorage.setItem("risk", JSON.stringify(risk));
    }

    const storedProtocolId = localStorage.getItem("protocolId");
    if (protocolId && !storedProtocolId) {
      localStorage.setItem("protocolId", JSON.stringify(protocolId));
    }
  }, [risk, protocolId]);

  const [steps, setSteps] = useState<
    Array<{
      step: number;
      status: Status;
      error?: string;
    }>
  >([
    {
      step: 1,
      status: "idle",
    },
    {
      step: 2,
      status: "idle",
    },
  ]);

  const mutation = useMutation({
    mutationFn: async ({
      formattedSubmission
    }: {
      formattedSubmission: string;
    }) => {
      try {
        setSteps([{ step: 1, status: "idle" }]);

        setSteps((prev) =>
          prev.map((item) => {
            if (item.step === 1) {
              return { ...item, status: "loading" };
            }
            return item;
          })
        );

        const response = await apiAgent.post("generate-risk-profile", { data: formattedSubmission });
        setRisk(response.risk);

        setSteps((prev) =>
          prev.map((item) => {
            if (item.step === 1) {
              return { ...item, status: "success" };
            }
            return item;
          })
        );

        setSteps([{ step: 2, status: "idle" }]);

        const matchingClassification = dataClassify.find(
          (item) => item.risk === risk);

        setSteps((prev) =>
          prev.map((item) => {
            if (item.step === 2) {
              return { ...item, status: "loading" };
            }
            return item;
          })
        );

        if (matchingClassification) {
          const response = await apiAgent.post("query", { query: matchingClassification.prompt });
          setProtocolId(response.response[0]?.id_project);
        }

        setSteps((prev) =>
          prev.map((item) => {
            if (item.step === 2) {
              return { ...item, status: "success" };
            }
            return item;
          })
        );

        localStorage.setItem("address", address?.toString() || "");
      } catch (e) {
        console.error("Bid Error", e);

        setSteps((prev) =>
          prev.map((step) => {
            if (step.status === "loading") {
              return { ...step, status: "error", error: (e as Error).message };
            }
            return step;
          })
        );

        throw e;
      }
    },
  });

  return { steps, mutation, risk, protocolId };
};