import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import apiAgent from "@/lib/api-agent";
import { GenerateStakingResponse } from "@/types/api/generate-staking";

type Status = "idle" | "loading" | "success" | "error";

export const useGenerateStakingAI = () => {
  const [steps, setSteps] = useState<
    Array<{
      step: number;
      status: Status;
      error?: string;
    }>
  >([{ step: 1, status: "idle" }]);

  const [result, setResult] = useState<GenerateStakingResponse | null>(null);

  const mutation = useMutation({
    mutationFn: async ({ data }: { data: string }) => {
      setSteps([{ step: 1, status: "loading" }]);
      const response = await apiAgent.post("query", { query: data });
      return response as GenerateStakingResponse;
    },
    onSuccess: (data) => {
      setResult(data);
      setSteps([{ step: 1, status: "success" }]);
    },
    onError: (e: unknown) => {
      console.error("Error", e);
      setResult(null);
      setSteps([{ step: 1, status: "error", error: (e as Error).message }]);
    },
  });

  return {
    steps,
    mutation,
    result,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess
  };
};