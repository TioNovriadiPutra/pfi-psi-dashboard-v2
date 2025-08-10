import type { AuthContentType, FormType } from "@interfaces/formInterface";
import type { LoginInput, RegisterInput } from "@models/authModel";
import type { BuildingInput } from "@models/buildingModel";
import type { BuildingTypeInput } from "@models/buildingTypeModel";
import type { ProjectInput } from "@models/projectModel";

export const loginForm: AuthContentType<LoginInput> = {
  title: "Sign In",
  subTitle: "Enter the email and password that have been registered to log in.",
  form: {
    inputs: [
      {
        type: "text",
        name: "username",
        placeholder: "Username",
        required: false,
      },
      {
        type: "password",
        name: "password",
        placeholder: "Password",
        required: false,
      },
    ],
    defaultValues: {
      username: "",
      password: "",
    },
    buttonLabel: "Sign In",
  },
};

export const registerForm: AuthContentType<RegisterInput> = {
  title: "Sign Up",
  subTitle: "Please input your information",
  form: {
    inputs: [
      {
        type: "text",
        name: "name",
        placeholder: "Full Name",
        required: true,
        rules: {
          required: "Full name must be filled!",
          pattern: {
            value: /^[A-Za-z ]+$/,
            message: "Full name must contain alphabets only!",
          },
        },
      },
      {
        type: "text",
        name: "username",
        placeholder: "Username",
        required: true,
        rules: {
          required: "Username must be filled!",
          pattern: {
            value: /^[A-Za-z]+$/,
            message: "Username must contain alphabets only!",
          },
        },
      },
      {
        type: "text",
        name: "email",
        placeholder: "Email",
        required: true,
        rules: {
          required: "Email must be filled!",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Email format incorrect!",
          },
        },
      },
      {
        type: "password",
        name: "password",
        placeholder: "Password",
        required: true,
        rules: {
          required: "Password must be filled!",
          minLength: {
            value: 8,
            message: "Password at least 8 characters!",
          },
        },
      },
      {
        type: "confirm",
        name: "password_confirmation",
        placeholder: "Confirm Password",
        required: true,
        rules: {
          required: "Confirm password must be filled!",
        },
      },
    ],
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    buttonLabel: "Sign Up",
  },
};

export const projectForm: FormType<ProjectInput> = {
  inputs: [
    [
      {
        type: "text",
        name: "name",
        label: "Title",
        placeholder: "Input here...",
        required: true,
        rules: {
          required: "Title must be filled!",
        },
      },
      {
        type: "textarea",
        name: "description",
        label: "Description",
        placeholder: "Input here...",
        required: true,
        rules: {
          required: "Description must be filled!",
        },
      },
      {
        type: "dropdown",
        name: "status",
        label: "Status",
        placeholder: "Pick here",
        required: false,
        items: [
          { label: "Pending", value: 1 },
          { label: "Rejected", value: 2 },
          { label: "Accepted", value: 3 },
        ],
      },
      {
        type: "text",
        name: "address_detail",
        label: "Address",
        placeholder: "Input here...",
        required: false,
      },
    ],
  ],
  defaultValues: {
    name: "",
    description: "",
    address_detail: "",
    status: null,
  },
};

export const buildingTypeForm: FormType<BuildingTypeInput> = {
  inputs: [
    [
      {
        type: "text",
        name: "name",
        label: "Name",
        placeholder: "Input here...",
        required: true,
        rules: {
          required: "Name must be filled!",
        },
      },
      {
        type: "textarea",
        name: "description",
        label: "Description",
        placeholder: "Input here...",
        required: false,
      },
    ],
  ],
  defaultValues: {
    name: "",
    description: "",
  },
};

export const buildingForm: FormType<BuildingInput> = {
  inputs: [
    [
      {
        type: "text",
        name: "name",
        label: "Name",
        placeholder: "Input here...",
        required: true,
        rules: {
          required: "Name must be filled!",
        },
      },
      {
        type: "text",
        name: "address",
        label: "Address",
        placeholder: "Input here...",
        required: true,
        rules: {
          required: "Address must be filled!",
        },
      },
      {
        type: "number",
        name: "year_built",
        label: "Year Built",
        placeholder: "0",
        required: true,
        rules: {
          required: "Year built must be filled!",
          pattern: {
            value: /^[0-9]+$/,
            message: "Year built must be a number!",
          },
        },
      },
      {
        type: "dropdown",
        name: "building_type",
        label: "Building Type",
        placeholder: "Pick here",
        required: true,
        items: [],
        rules: {
          required: "Building type must be chosen!",
        },
      },
      {
        type: "number",
        name: "area_sq_meters",
        label: "Area (sq meter)",
        placeholder: "0",
        required: true,
        rules: {
          required: "Area must be filled!",
          pattern: {
            value: /^-?\d+(\.\d+)?$/,
            message: "Area must be a number or decimal!",
          },
        },
      },
      {
        type: "dropdown",
        name: "project_id",
        label: "Project",
        placeholder: "Pick here",
        required: false,
        items: [],
      },
    ],
    [
      {
        type: "number",
        name: "status_construction",
        label: "Status Construction (%)",
        placeholder: "0",
        required: false,
        rules: {
          pattern: {
            value: /^-?\d+(\.\d+)?$/,
            message: "Status construction must be a number or decimal!",
          },
        },
      },
      {
        type: "date",
        name: "construction_start_date",
        label: "Start Date",
        placeholder: "DD-MM-YYYY",
        required: false,
      },
      {
        type: "date",
        name: "construction_end_date",
        label: "End Date",
        placeholder: "DD-MM-YYYY",
        required: false,
      },
    ],
    [
      {
        type: "map",
        name: "location",
        label: "Location",
        placeholder: "-",
        required: true,
        rules: {
          required: "Location must be chosen!",
        },
      },
    ],
    [
      {
        type: "tab",
        name: "building_tabs",
        placeholder: "",
        required: false,
        tabData: [
          {
            title: "Elevations",
            inputs: [
              {
                type: "cart",
                label: "Elevation",
                name: "elevations",
                placeholder: "",
                required: true,
                cartData: {
                  inputs: [
                    {
                      type: "text",
                      name: "name",
                      label: "Name",
                      placeholder: "Input here...",
                      required: true,
                      rules: {
                        required: "Name must be filled!",
                      },
                    },
                    {
                      type: "text",
                      name: "orientation_degrees",
                      label: "Orientation (°)",
                      placeholder: "0",
                      required: true,
                      rules: {
                        required: "Orientation must be filled!",
                        pattern: {
                          value: /^-?\d+(\.\d+)?$/,
                          message: "Orientation must be a number or decimal!",
                        },
                      },
                    },
                    {
                      type: "textarea",
                      name: "description",
                      label: "Description",
                      placeholder: "Input here...",
                      required: false,
                    },
                  ],
                  template: {
                    name: "",
                    orientation_degrees: "",
                    description: "",
                  },
                },
              },
            ],
          },
          {
            title: "Levels",
            inputs: [
              {
                type: "cart",
                name: "levels",
                label: "Level",
                placeholder: "",
                required: true,
                cartData: {
                  inputs: [
                    {
                      type: "text",
                      name: "level_name",
                      label: "Name",
                      placeholder: "Input here...",
                      required: true,
                      rules: {
                        required: "Name must be filled!",
                      },
                    },
                    {
                      type: "text",
                      name: "primary_usage",
                      label: "Primary Usage",
                      placeholder: "Input here...",
                      required: false,
                    },
                    {
                      type: "textarea",
                      name: "description",
                      label: "Description",
                      placeholder: "Input here...",
                      required: false,
                    },
                  ],
                  template: {
                    level_name: "",
                    primary_usage: "",
                    description: "",
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  ],
  defaultValues: {
    name: "",
    address: "",
    year_built: "",
    building_type: null,
    area_sq_meters: "",
    project_id: null,
    location: null,
    status_construction: "",
    construction_start_date: "",
    construction_end_date: "",
    elevations: [],
    levels: [],
  },
};
