import type { AuthContentType, FormType } from "@interfaces/formInterface";
import type { LoginInput, RegisterInput } from "@models/authModel";
import type { BuildingInput } from "@models/buildingModel";
import type { BuildingTypeInput } from "@models/buildingTypeModel";
import type { DefectInput } from "@models/defectModel";
import type { DefectTypeInput } from "@models/defectTypeModel";
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
        type: "tab",
        name: "building_tabs",
        placeholder: "",
        required: true,
        tabData: [
          {
            title: "Detail",
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
          },
          {
            title: "Progress",
            inputs: [
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
          },
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

export const defectForm: FormType<DefectInput> = {
  inputs: [
    [
      {
        type: "tab",
        name: "defect_tabs",
        placeholder: "",
        required: true,
        tabData: [
          {
            title: "Report",
            inputs: [
              {
                type: "text",
                name: "report_no",
                label: "Report No",
                placeholder: "Input here...",
                required: true,
                rules: {
                  required: "Report no must be filled!",
                },
              },
              {
                type: "date",
                name: "report_date",
                label: "Report Date",
                placeholder: "DD-MM-YYYY",
                required: true,
                rules: {
                  required: "Report date must be filled!",
                },
              },
              {
                type: "time",
                name: "time_inspection",
                label: "Inspection Time",
                placeholder: "Input here...",
                required: true,
                rules: {
                  required: "Inspection time must be filled!",
                },
              },
              {
                type: "date",
                name: "date_inspection",
                label: "Inspection Date",
                placeholder: "DD-MM-YYYY",
                required: true,
                rules: {
                  required: "Inspection date must be filled!",
                },
              },
              {
                type: "number",
                name: "duration_inspection",
                label: "Inspection Duration (minutes)",
                placeholder: "0",
                required: true,
                rules: {
                  required: "Inspection duration must be filled!",
                },
              },
              {
                type: "text",
                name: "location_inspection",
                label: "Inspection Location",
                placeholder: "Input here...",
                required: true,
                rules: {
                  required: "Inspection location must be filled!",
                },
              },
              {
                type: "text",
                name: "methodology_inspection",
                label: "Inspection Methodology",
                placeholder: "Input here...",
                required: true,
                rules: {
                  required: "Inspection methodology must be filled!",
                },
              },
              {
                type: "text",
                name: "name_providers",
                label: "Provider Name",
                placeholder: "Input here...",
                required: true,
                rules: {
                  required: "Provider name must be filled!",
                },
              },
              {
                type: "text",
                name: "facade_inspector",
                label: "Facade",
                placeholder: "Input here...",
                required: true,
                rules: {
                  required: "Facade must be filled!",
                },
              },
              {
                type: "textarea",
                name: "description",
                label: "Description",
                placeholder: "Input here...",
                required: false,
              },
              {
                type: "text",
                name: "highlight",
                label: "Highlight",
                placeholder: "Input here...",
                required: false,
              },
            ],
          },
          {
            title: "Plan",
            inputs: [
              {
                type: "cart",
                name: "plans",
                label: "Plan",
                placeholder: "",
                required: true,
                cartData: {
                  inputs: [
                    {
                      type: "text",
                      name: "plan",
                      label: "Name",
                      placeholder: "Input here...",
                      required: true,
                      rules: {
                        required: "Name must be filled!",
                      },
                    },
                    {
                      type: "image",
                      name: "plan_image",
                      label: "Plan Image",
                      placeholder: "Upload image",
                      required: false,
                      rules: {
                        validate: (val) => {
                          const base64 = val.split(",")[1] || val;
                          const padding = (base64.match(/=+$/) || [""])[0]
                            .length;
                          const sizeInBytes = (base64.length * 3) / 4 - padding;

                          return (
                            sizeInBytes <= 2 * 1024 * 1024 ||
                            "Image to large (max 2mb)"
                          );
                        },
                      },
                    },
                    {
                      type: "image",
                      name: "plan_evelvation_image",
                      label: "Elevation Image",
                      placeholder: "Upload Image",
                      required: false,
                      rules: {
                        validate: (val) => {
                          const base64 = val.split(",")[1] || val;
                          const padding = (base64.match(/=+$/) || [""])[0]
                            .length;
                          const sizeInBytes = (base64.length * 3) / 4 - padding;

                          return (
                            sizeInBytes <= 2 * 1024 * 1024 ||
                            "Image to large (max 2mb)"
                          );
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
                    plan: "",
                    plan_image: "",
                    plan_evelvation_image: "",
                    description: "",
                  },
                },
              },
            ],
          },
          {
            title: "Defect",
            inputs: [
              {
                type: "image",
                name: "image_elevation",
                label: "Elevation Image",
                placeholder: "Upload image",
                required: true,
                rules: {
                  required: "Elevation image must be filled!",
                  validate: (val) => {
                    const base64 = val.split(",")[1] || val;
                    const padding = (base64.match(/=+$/) || [""])[0].length;
                    const sizeInBytes = (base64.length * 3) / 4 - padding;

                    return (
                      sizeInBytes <= 2 * 1024 * 1024 ||
                      "Image to large (max 2mb)"
                    );
                  },
                },
              },
              {
                type: "image",
                name: "image_detail",
                label: "Detail Image",
                placeholder: "Upload image",
                required: true,
                rules: {
                  required: "Detail image must be filled!",
                  validate: (val) => {
                    const base64 = val.split(",")[1] || val;
                    const padding = (base64.match(/=+$/) || [""])[0].length;
                    const sizeInBytes = (base64.length * 3) / 4 - padding;

                    return (
                      sizeInBytes <= 2 * 1024 * 1024 ||
                      "Image to large (max 2mb)"
                    );
                  },
                },
              },
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
                type: "dropdown",
                name: "defect_type_id",
                label: "Defect Type",
                placeholder: "Pick here",
                required: true,
                items: [],
                rules: {
                  required: "Defect pick must be filled!",
                },
              },
              {
                type: "text",
                name: "observation",
                label: "Observation",
                placeholder: "Input here...",
                required: true,
                rules: {
                  required: "Observation must be filled!",
                },
              },
              {
                type: "text",
                name: "couse",
                label: "Couse",
                placeholder: "Input here...",
                required: true,
                rules: {
                  required: "Couse must be filled!",
                },
              },
              {
                type: "text",
                name: "recommendation",
                label: "Recommendation",
                placeholder: "Input here...",
                required: true,
                rules: {
                  required: "Recommendation must be filled!",
                },
              },
              {
                type: "text",
                name: "timeframe",
                label: "Timeframe",
                placeholder: "Input here...",
                required: true,
                rules: {
                  required: "Timeframe must be filled!",
                },
              },
              {
                type: "text",
                name: "remedial",
                label: "Remedial",
                placeholder: "Input here...",
                required: true,
                rules: {
                  required: "Remedial must be filled!",
                },
              },
              {
                type: "cart",
                name: "defect_levels",
                label: "Level",
                placeholder: "",
                required: true,
                cartData: {
                  inputs: [
                    {
                      type: "dropdown",
                      name: "level_id",
                      label: "Level",
                      placeholder: "Pick here",
                      required: true,
                      items: [],
                      rules: {
                        required: "Level must be filled!",
                      },
                    },
                    {
                      type: "image",
                      name: "photograph",
                      label: "Photograph",
                      placeholder: "Upload image",
                      required: true,
                      rules: {
                        required: "Photograph must be filled!",
                        validate: (val) => {
                          const base64 = val.split(",")[1] || val;
                          const padding = (base64.match(/=+$/) || [""])[0]
                            .length;
                          const sizeInBytes = (base64.length * 3) / 4 - padding;

                          return (
                            sizeInBytes <= 2 * 1024 * 1024 ||
                            "Image to large (max 2mb)"
                          );
                        },
                      },
                    },
                    {
                      type: "text",
                      name: "observation",
                      label: "Observation",
                      placeholder: "Input here...",
                      required: true,
                      rules: {
                        required: "Observation must be filled!",
                      },
                    },
                    {
                      type: "text",
                      name: "nature_of_defect",
                      label: "Nature of Defect",
                      placeholder: "Input here...",
                      required: true,
                      rules: {
                        required: "Nature of defect must be filled!",
                      },
                    },
                    {
                      type: "text",
                      name: "recommendation",
                      label: "Recommendation",
                      placeholder: "Input here...",
                      required: true,
                      rules: {
                        required: "Recommendation must be filled!",
                      },
                    },
                    {
                      type: "textarea",
                      name: "description",
                      label: "Description",
                      placeholder: "Input here...",
                      required: false,
                    },
                    {
                      type: "image",
                      name: "image_elevation",
                      label: "Elevation Image",
                      placeholder: "Upload image",
                      required: false,
                      rules: {
                        validate: (val) => {
                          const base64 = val.split(",")[1] || val;
                          const padding = (base64.match(/=+$/) || [""])[0]
                            .length;
                          const sizeInBytes = (base64.length * 3) / 4 - padding;

                          return (
                            sizeInBytes <= 2 * 1024 * 1024 ||
                            "Image to large (max 2mb)"
                          );
                        },
                      },
                    },
                    {
                      type: "image",
                      name: "image_defect",
                      label: "Defect Image",
                      placeholder: "Upload image",
                      required: false,
                      rules: {
                        validate: (val) => {
                          const base64 = val.split(",")[1] || val;
                          const padding = (base64.match(/=+$/) || [""])[0]
                            .length;
                          const sizeInBytes = (base64.length * 3) / 4 - padding;

                          return (
                            sizeInBytes <= 2 * 1024 * 1024 ||
                            "Image to large (max 2mb)"
                          );
                        },
                      },
                    },
                  ],
                  template: {
                    photograph: "",
                    observation: "",
                    nature_of_defect: "",
                    recommendation: "",
                    description: "",
                    image_elevation: "",
                    image_defect: "",
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
    report: {
      report_no: "",
      report_date: "",
      time_inspection: "",
      date_inspection: "",
      duration_inspection: "",
      location_inspection: "",
      methodology_inspection: "",
      name_providers: "",
      facade_inspector: "",
      description: "",
      highlight: "",
    },
    plans: [],
    defects: [],
  },
};

export const defectTypeForm: FormType<DefectTypeInput> = {
  inputs: [
    [
      {
        type: "text",
        name: "name",
        label: "Name",
        placeholder: "Input here...",
        required: true,
      },
    ],
  ],
  defaultValues: {
    name: "",
  },
};
