import { z } from "zod";

export const SetHomeLocationInput = z.object({
  id: z.string(),
});
