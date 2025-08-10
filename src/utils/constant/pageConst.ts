import type { AppType, SidebarType } from "@interfaces/pageInterface";
import { BiBuildings, BiCabinet, BiSolidDashboard } from "react-icons/bi";
import { HiOutlineAnnotation } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";

export const sidebarData: SidebarType[][] = [
  [
    {
      icon: BiSolidDashboard,
      label: "Dashboard",
      dest: "/dashboard",
    },
    {
      icon: BiCabinet,
      label: "Project",
      dest: "/project",
    },
    {
      icon: BiBuildings,
      label: "Building",
      dest: "/building",
    },
  ],
  [
    {
      icon: HiOutlineAnnotation,
      label: "Annotation",
      dest: "/annotation",
    },
    {
      icon: TbReportAnalytics,
      label: "Report",
      dest: "/report",
    },
  ],
];

export const projectPageData: AppType = {
  header: {
    withSearch: true,
    addLabel: "Add Project",
    addDest: "/project/form",
  },
  content: {
    title: "Project",
    subTitle: "Project management table",
    tableHeader: [
      { flex: "flex-2", label: "Title" },
      { flex: "flex-2", label: "Description" },
      { flex: "flex-2", label: "Address" },
      { flex: "flex-1", label: "Status" },
    ],
  },
};

export const buildingPageData: AppType[] = [
  {
    header: {
      withSearch: true,
      addLabel: "Add Building",
      addDest: "/building/form",
    },
    content: {
      title: "Building",
      subTitle: "Building management table",
      tableHeader: [
        { flex: "flex-2", label: "Name" },
        { flex: "flex-2", label: "Address" },
        { flex: "flex-1", label: "Year Built" },
        { flex: "flex-1", label: "Area (m²)" },
        { flex: "flex-1", label: "Number of Levels" },
        { flex: "flex-1", label: "Number of Sides" },
        { flex: "flex-1", label: "Status Construction (%)" },
        { flex: "flex-1", label: "Start At" },
        { flex: "flex-1", label: "End At" },
      ],
    },
  },
  {
    header: {
      withSearch: true,
      addLabel: "Add Building Type",
      addDest: "/building/type-form",
    },
    content: {
      title: "Building Type",
      subTitle: "Building type management table",
      tableHeader: [
        { flex: "flex-2", label: "Name" },
        { flex: "flex-2", label: "Description" },
      ],
    },
  },
];

export const reportPageData: AppType = {
  header: {
    withSearch: true,
  },
  content: {
    title: "Report",
    subTitle: "Report management table",
    tableHeader: [
      { flex: "flex-1", label: "Report No" },
      { flex: "flex-1", label: "Report Date" },
      { flex: "flex-1", label: "Inspect. Date" },
      { flex: "flex-1", label: "Inspect. Time" },
      { flex: "flex-1", label: "Inspect. Duration" },
      { flex: "flex-1", label: "Inspect. Location" },
      { flex: "flex-1", label: "Inspect. Methodology" },
      { flex: "flex-1", label: "Provider" },
      { flex: "flex-1", label: "Inspect. Facade" },
      { flex: "flex-2", label: "Description" },
      { flex: "flex-1", label: "Highlight" },
    ],
  },
};

export const masterPageData: AppType[] = [
  {
    header: {
      withSearch: true,
      addLabel: "Add Defect Type",
      addDest: "/defect/type-form",
    },
    content: {
      title: "Defect Type",
      subTitle: "Defect type management table",
      tableHeader: [
        { flex: "flex-1", label: "Name" },
        { flex: "flex-1", label: "Created At" },
      ],
    },
  },
];
