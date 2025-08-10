import type { IconType } from "react-icons/lib";

export interface SidebarType {
  icon: IconType;
  label: string;
  dest: string;
}

export interface AppHeaderType {
  withSearch: boolean;
  addLabel?: string;
  addDest?: string;
}

export interface AppRowType {
  type?: "text" | "pending" | "accepted" | "rejected";
  flex: "flex-1" | "flex-2";
  label: string;
}

export interface AppRowFuncType {
  type: "edit" | "detail" | "delete" | "custom";
  icon?: IconType;
  label?: string;
  onClick: () => void;
}

export interface AppContentType {
  title: string;
  subTitle: string;
  tableHeader: AppRowType[];
}

export interface AppType {
  header: AppHeaderType;
  content: AppContentType;
}

export type FetchFinalDataType = {
  id: number;
  row: AppRowType[];
  functions: AppRowFuncType[];
};

export type FetchPaginationType = {
  from: number;
  to: number;
  total: number;
};

export type FetchDataType = {
  pagination: FetchPaginationType;
  finalData: FetchFinalDataType[];
};
