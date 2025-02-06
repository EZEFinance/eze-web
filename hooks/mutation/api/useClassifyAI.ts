import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import apiAgent from "@/lib/api-agent";
import { ClassifyResponse } from "@/types/api/classify";

type Status = "idle" | "loading" | "success" | "error";

export const useClassifyAI = () => {
  const [steps, setSteps] = useState<
    Array<{
      step: number;
      status: Status;
      error?: string;
    }>
  >([{ step: 1, status: "idle" }]);

  const [result, setResult] = useState<ClassifyResponse | null>(null);

  const mutation = useMutation({
    mutationFn: async ({ data }: { data: string }) => {
      setSteps([{ step: 1, status: "loading" }]);
      const response = await apiAgent.post("url api bang", { data });
      return response.data as ClassifyResponse;
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