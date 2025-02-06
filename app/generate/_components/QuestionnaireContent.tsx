import React, { useState } from "react";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Select, SelectItem } from "@heroui/select";
import { dataForm } from "@/data/dataForm";
import { UseMutationResult } from "@tanstack/react-query";
import { dataClassify } from "@/data/dataClassify";

interface FormData {
  [key: number]: number | null;
}

export default function QuestionnaireContent({
  mgRisk,
  mgStaking,
  rgRisk
}: {
  mgRisk: UseMutationResult<{ risk: string }, unknown, { data: string }, unknown>;
  mgStaking: UseMutationResult<
    { response: { id_project: string }[]; thread_id: string; processing_time: number },
    unknown,
    { data: string },
    unknown
  >;
  rgRisk?: string;
}) {
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const hasEmptyAnswers = Object.values(formData).some(
        (value) => value === null || value === undefined
      );

      if (Object.keys(formData).length !== dataForm.questions.length || hasEmptyAnswers) {
        alert("Please answer all questions");
        return;
      }

      const formattedSubmission = Object.entries(formData)
        .map(([questionIndex, answerIndex]) => {
          const qIndex = parseInt(questionIndex);
          return `${dataForm.questions[qIndex].question} = ${dataForm.questions[qIndex].options[answerIndex as number]
            }`;
        })
        .join(". ");

      await mgRisk.mutateAsync({
        data: formattedSubmission,
      });

      const matchingClassification = dataClassify.find(
        (item) => item.risk === rgRisk
      );

      if (matchingClassification?.prompt) {
        await mgStaking.mutateAsync({
          data: matchingClassification.prompt,
        });
      }
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleChange = (index: number, value: string | null) => {
    setFormData((prev) => ({
      ...prev,
      [index]: value === null ? null : parseInt(value),
    }));
  };

  return (
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
              onChange={(e) => handleChange(index, e?.target?.value || null)}
              required
              value={formData[index]?.toString() || ""}
            >
              {q.options.map((option, optIndex) => (
                <SelectItem key={optIndex} value={optIndex.toString()} aria-required>
                  {option}
                </SelectItem>
              ))}
            </Select>
          </div>
        ))}

        <Button
          type="submit"
          className="w-full py-2 px-4 rounded-md"
          color="primary"
          disabled={isSubmitting || mgRisk.isPending || mgStaking.isPending}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}