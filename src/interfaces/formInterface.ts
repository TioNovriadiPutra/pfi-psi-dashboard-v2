import type { RegisterOptions } from "react-hook-form";

export interface DropdownType {
  label: string;
  value: string | number;
}

export interface MapType {
  lat: number;
  lng: number;
  area: string;
  description: string;
}

export interface TabInputType {
  title: string;
  inputs: InputType[];
}

export interface CartInputType {
  inputs: InputType[];
  template: any;
}

export interface InputType {
  type:
    | "text"
    | "textarea"
    | "password"
    | "confirm"
    | "number"
    | "dropdown"
    | "date"
    | "map"
    | "tab"
    | "cart"
    | "image"
    | "time";
  name: string;
  label?: string;
  placeholder: string;
  required: boolean;
  items?: DropdownType[];
  tabData?: TabInputType[];
  cartData?: CartInputType;
  rules?: Omit<
    RegisterOptions<any, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

export interface FormType<T> {
  inputs: InputType[][];
  defaultValues: T;
  buttonLabel?: string;
}

export interface AuthContentType<T> {
  title: string;
  subTitle: string;
  form: Omit<FormType<T>, "inputs"> & { inputs: InputType[] };
}

export interface ButtonType {
  label: string;
  color: string;
  hover: string;
}
