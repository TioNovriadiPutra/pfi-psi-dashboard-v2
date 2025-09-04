import type { AuthContentType, FormType } from "@interfaces/formInterface";
import type { AnnotationInput } from "@models/annotationModel";
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
    [
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
        type: "text",
        name: "highlight",
        label: "Highlight",
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
    methodology_inspection: "",
    name_providers: "",
    facade_inspector: "",
    highlight: "",
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
            ],
          },
          {
            title: "Progress",
            inputs: [
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
                      message:
                        "Status construction must be a number or decimal!",
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
            ],
          },
          {
            title: "Elevations",
            inputs: [
              [
                {
                  type: "cart",
                  name: "elevations",
                  placeholder: "Elevation",
                  required: true,
                  cartData: {
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
                    ],
                    template: {
                      name: "",
                      orientation_degrees: "",
                      description: "",
                    },
                  },
                  rules: {
                    required: "Elevation must be filled!",
                    minLength: {
                      value: 1,
                      message: "Elevation must be filled!",
                    },
                  },
                },
              ],
            ],
          },
          {
            title: "Levels",
            inputs: [
              [
                {
                  type: "cart",
                  name: "levels",
                  placeholder: "Level",
                  required: true,
                  cartData: {
                    inputs: [
                      [
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
                    ],
                    template: {
                      level_name: "",
                      primary_usage: "",
                      description: "",
                    },
                  },
                  rules: {
                    required: "Levels must be filled!",
                    minLength: {
                      value: 1,
                      message: "Levels must be filled!",
                    },
                  },
                },
              ],
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
              [
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
                  type: "date",
                  name: "date_inspection",
                  label: "Flight Date",
                  placeholder: "DD-MM-YYYY",
                  required: true,
                  rules: {
                    required: "Inspection date must be filled!",
                  },
                },
                {
                  type: "time",
                  name: "time_inspection_start",
                  label: "Flight Time Start",
                  placeholder: "Input here...",
                  required: true,
                  rules: {
                    required: "Inspection time must be filled!",
                  },
                },
                {
                  type: "time",
                  name: "time_inspection_end",
                  label: "Flight Time End",
                  placeholder: "Input here...",
                  required: true,
                  rules: {
                    required: "Inspection time must be filled!",
                  },
                },
                
                // {
                //   type: "number",
                //   name: "duration_inspection",
                //   label: "Flight Duration (minutes)",
                //   placeholder: "0",
                //   required: true,
                //   rules: {
                //     required: "Inspection duration must be filled!",
                //   },
                // },
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
              ],
            ],
          },
          {
            title: "Plan",
            inputs: [
              [
                {
                  type: "cart",
                  name: "plans",
                  placeholder: "Plans",
                  required: true,
                  cartData: {
                    inputs: [
                      [
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
                        
                      ],
                      [
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
                              const sizeInBytes =
                                (base64.length * 3) / 4 - padding;

                              return (
                                sizeInBytes <= 5 * 1024 * 1024 ||
                                "Image to large (max 5mb)"
                              );
                            },
                          },
                        },
                        
                      ],
                    ],
                    template: {
                      plan: "",
                      plan_image: "",
                      plan_evelvation_image: "",
                      description: "",
                    },
                  },
                  rules: {
                    required: "Plans must be filled!",
                    minLength: {
                      value: 1,
                      message: "Plans must be filled!",
                    },
                  },
                },
              ],
            ],
          },
          {
            title: "Defect",
            inputs: [
              [
                {
                  type: "cart",
                  name: "defects",
                  placeholder: "",
                  required: true,
                  cartData: {
                    inputs: [
                      [
                        {
                          type: "dropdown",
                          name: "observation",
                          label: "Observation",
                          placeholder: "Pick here",
                          required: true,
                          items: [
                            { label: "No Defect", value: "no_defect" },
                            { label: "Have Defect", value: "have_defect" },
                          ],
                          rules: {
                            required: "Defect status must be selected!",
                          },
                        },
                        {
                          type: "dropdown",
                          name: "recommendation",
                          label: "Nature of defect",
                          placeholder: "Pick here",
                          required: true,
                          items: [
                            { label: "Safe", value: "safe" },
                            { label: "Have Defect", value: "have_defect" },
                          ],
                          rules: {
                            required: "Defect status must be selected!",
                          },
                        },
                      ],
                      [
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
                              const padding = (base64.match(/=+$/) || [""])[0]
                                .length;
                              const sizeInBytes =
                                (base64.length * 3) / 4 - padding;

                              return (
                                sizeInBytes <= 5 * 1024 * 1024 ||
                                "Image to large (max 5mb)"
                              );
                            },
                          },
                        },
                      ],
                      [
                        {
                          type: "cart",
                          name: "defect_levels",
                          placeholder: "Level",
                          required: true,
                          cartData: {
                            inputs: [
                              [
                                {
                                  type: "dropdown",
                                  name: "level_start",
                                  label: "Start",
                                  placeholder: "Pick here",
                                  required: true,
                                  items: Array.from({ length: 50 }).map(
                                    (_, i) => ({
                                      label: `Level ${i + 1}`,
                                      value: i + 1,
                                    })
                                  ),
                                  rules: {
                                    required: "Level start must be filled!",
                                  },
                                },
                                {
                                  type: "dropdown",
                                  name: "level_end",
                                  label: "End",
                                  placeholder: "Pick here",
                                  required: true,
                                  items: Array.from({ length: 50 }).map(
                                    (_, i) => ({
                                      label: `Level ${i + 1}`,
                                      value: i + 1,
                                    })
                                  ),
                                  rules: {
                                    required: "Level end must be filled!",
                                  },
                                },

                                {
                                  type: "dropdown",
                                  name: "observation",
                                  label: "Observation",
                                  placeholder: "Pick here",
                                  required: true,
                                  items: [
                                    { label: "No Defect", value: "No_Defect" },
                                    { label: "Crack", value: "Crack" },
                                    { label: "Chiff Of", value: "chiff_off" },
                                    {
                                      label: "Blistering paint",
                                      value: "Blistering_paint",
                                    },
                                    {
                                      label: "Paint cracks",
                                      value: "Paint_cracks",
                                    },
                                    {
                                      label: "Blistering",
                                      value: "blistering",
                                    },
                                    {
                                      label: "Cracks and Blistering",
                                      value: "Cracks_blistering",
                                    },
                                    {
                                      label: "Chip off and Blistering",
                                      value: "Chip_off_blistering",
                                    },
                                    {
                                      label: "Blistering and Paint Peel",
                                      value: "Blistering_Paint_Peel",
                                    },
                                    {
                                      label: "Hollowness",
                                      value: "hollowness",
                                    },
                                    {
                                      label: "Hollowness & Cracks",
                                      value: "hollowness_cracks",
                                    },
                                  ],
                                  rules: {
                                    required:
                                      "Defect Observation must be selected!",
                                  },
                                },
                                {
                                  type: "dropdown",
                                  name: "nature_of_defect",
                                  label: "Nature of Defect",
                                  placeholder: "Pick here",
                                  required: true,
                                  items: [
                                    { label: "Safe", value: "safe" },
                                    {
                                      label: "Require repair",
                                      value: "Require_repair",
                                    },
                                  ],
                                  rules: {
                                    required:
                                      "Nature of Defect must be selected!",
                                  },
                                },
                                {
                                  type: "dropdown",
                                  name: "recommendation",
                                  label: "Recommendation",
                                  placeholder: "Pick here",
                                  required: true,
                                  items: [
                                    { label: "N/A", value: "na" },
                                    {
                                      label: "Refer to section 5",
                                      value: "Refer_section5",
                                    },
                                  ],
                                  rules: {
                                    required:
                                      "Recommendation must be selected!",
                                  },
                                },
                              ],
                              [
                                {
                                  type: "textarea",
                                  name: "description",
                                  label: "Description of defect(s) ",
                                  placeholder: "Input here...",
                                  required: false,
                                },
                                {
                                  type: "image",
                                  name: "image_defect",
                                  label: "Defect Image",
                                  placeholder: "Upload image",
                                  required: true,
                                  rules: {
                                    required: "Defect image must be filled!",
                                    validate: (val) => {
                                      const base64 = val.split(",")[1] || val;
                                      const padding = (base64.match(/=+$/) || [
                                        "",
                                      ])[0].length;
                                      const sizeInBytes =
                                        (base64.length * 3) / 4 - padding;

                                      return (
                                        sizeInBytes <= 5 * 1024 * 1024 ||
                                        "Image to large (max 5mb)"
                                      );
                                    },
                                  },
                                },
                              ],
                            ],
                            isGrey: false,
                            template: {
                              level_start: undefined,
                              level_end: undefined,
                              image_defect: "",
                              observation: undefined,
                              nature_of_defect: undefined,
                              recommendation: undefined,
                              description: "",
                            },
                          },
                        },
                      ],
                    ],
                    withAdd: false,
                    template: {
                      observation: undefined,
                      recommendation: undefined,
                      image_elevation: "",
                      defect_levels: [],
                    },
                  },
                },
              ],
            ],
          },
          {
            title: "Appendix",
            inputs: [
              [
                {
                  type: "cart",
                  name: "appendixes",
                  placeholder: "Appendix",
                  required: true,
                  cartData: {
                    inputs: [
                      [
                        {
                          type: "text",
                          name: "name",
                          label: "Name",
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
                        {
                          type: "gallery",
                          name: "image_appendix",
                          label: "Images",
                          placeholder: "Image",
                          required: false,
                        },
                      ],
                    ],
                    template: {
                      name: "",
                      description: "",
                      image_appendix: [],
                    },
                  },
                },
              ],
            ],
          },
        ],
      },
    ],
  ],
  defaultValues: {
    report_no: "",
    report_date: "",
    time_inspection: "",
    date_inspection: "",
    duration_inspection: "",
    location_inspection: "",
    plans: [],
    defects: [],
    appendixes: [],
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

export const annotationForm: FormType<AnnotationInput> = {
  inputs: [
    [
      {
        type: "dropdown",
        name: "building_id",
        label: "Building",
        placeholder: "Pick here",
        required: true,
        items: [],
        rules: {
          required: "Building must be chosen!",
        },
      },
      {
        type: "text",
        name: "project_name",
        label: "Project Name",
        placeholder: "Input here...",
        required: true,
        rules: {
          required: "Project name must be filled!",
        },
      },
      {
        type: "text",
        name: "category",
        label: "Elevation",
        placeholder: "Input here...",
        required: true,
        rules: {
          required: "Project name must be filled!",
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
    [
      {
        type: "image",
        name: "image",
        label: "Upload Image",
        placeholder: "SVG, PNG, JPG or GIF (MAX. 5MB)",
        required: true,
        rules: {
          required: "Image must be filled!",
          validate: (val) => {
            const base64 = val.split(",")[1] || val;
            const padding = (base64.match(/=+$/) || [""])[0].length;
            const sizeInBytes = (base64.length * 3) / 4 - padding;

            return sizeInBytes <= 5 * 1024 * 1024 || "Image to large (max 5mb)";
          },
        },
      },
    ],
    [
      {
        type: "annotation",
        name: "annotations",
        label: "Annotation Canvas",
        placeholder: "",
        required: true,
        rules: {
          required: "Annotation must be filled!",
        },
      },
    ],
  ],
  defaultValues: {
    building_id: undefined,
    image: "",
    project_name: "",
    category: undefined,
    description: "",
    annotations: [],
  },
};
