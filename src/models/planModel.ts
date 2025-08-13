import useHelper from "@hooks/useHelper";
import { addPlan } from "@services/planService";
import { useDefectSlider } from "@stores/pageStore";
import { useMutation } from "@tanstack/react-query";

export interface PlanInput {
  plan: string;
  plan_image?: string;
  plan_evelvation_image?: string;
  description?: string;
}

export interface PlanReqInput extends PlanInput {
  building_id: number;
  report_id: number;
}

export interface PlanDTO {
  id: number;
  building_id: number;
  report_id: number;
  plan: string;
  plan_image: string | null;
  plan_evelvation_image: string | null;
  description: string | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  is_deleted: boolean;
}

const usePlanModel = () => {
  const changeDefectSlider = useDefectSlider((state) => state.changePage);

  const { onMutate, onSettled, onError, onSuccess } = useHelper();

  const useAddPlan = () =>
    useMutation({
      mutationKey: ["addPlan"],
      mutationFn: (body: PlanReqInput) => addPlan(body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        changeDefectSlider(2);
        onSuccess(res.message);
      },
    });

  return {
    useAddPlan,
  };
};

export default usePlanModel;
