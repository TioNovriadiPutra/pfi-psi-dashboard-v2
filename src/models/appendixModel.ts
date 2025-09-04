export interface AppendixInput {
  name: string;
  description: string;
  image_appendix: string[];
}

export interface AppendixReqInput extends AppendixInput {
  building_id: number;
}

export interface AppendixDTO extends AppendixInput {
  id: number;
  created_at: string;
}
