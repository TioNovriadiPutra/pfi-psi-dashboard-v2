export interface PlanInput {
  plan: string;
  plan_image?: string;
  plan_evelvation_image?: string;
  description?: string;
}

export interface PlanReqInput extends PlanInput {
  building_id: number;
  report_id?: number;
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
