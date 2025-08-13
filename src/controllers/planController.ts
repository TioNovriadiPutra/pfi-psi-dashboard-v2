import usePlanModel from "@models/planModel";

const usePlanController = () => {
  const { useAddPlan } = usePlanModel();

  const addPlanMutation = useAddPlan();

  return {
    addPlanService: (body: any) => addPlanMutation.mutate(body),
  };
};

export default usePlanController;
