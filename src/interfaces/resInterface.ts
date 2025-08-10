export type ResType<T = any> = {
  status: number;
  message: string;
  data: T;
};

export type PaginationType<T> = {
  total_count: number;
  has_more: boolean;
  page: number;
  items_per_page: number;
  data: T;
};
