import { z } from "zod";

export const ClassifyResponseSchema = z.object({
  response: z.array(
    z.object({
      id_project: z.string(),
    })
  ),
  thread_id: z.string(),
  processing_time: z.number(),
});

export type ClassifyResponse = z.infer<typeof ClassifyResponseSchema>;