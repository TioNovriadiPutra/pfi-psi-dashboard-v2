export interface BuildingLevelInput {
  level_name: string;
  primary_usage?: string;
  description?: string;
}

export interface BuildingLevelDTO {
  level_name: string;
  primary_usage: string | null;
  description: string | null;
  building_id: number;
}
