import { useQuery } from "@tanstack/react-query";

import { getMarks } from "@/actions/get-marks";

export const getUseMarksQueryKey = () => ["marks"] as const;

export const useMarks = () => {
  return useQuery({
    queryKey: getUseMarksQueryKey(),
    queryFn: () => getMarks(),
  });
};
