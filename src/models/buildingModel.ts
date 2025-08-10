import { useMutation, useQueries } from "@tanstack/react-query";
import type { ProjectDTO } from "./projectModel";
import {
  addBuilding,
  getBuildingDetail,
  getBuildings,
} from "@services/buildingService";
import { getBuildingTypes } from "@services/buildingTypeService";
import type { DropdownType, MapType } from "@interfaces/formInterface";
import { getProjects } from "@services/projectService";
import type {
  BuildingElevationDTO,
  BuildingElevationInput,
} from "./buildingElevationModel";
import useHelper from "@hooks/useHelper";
import { queryClient } from "@utils/config/client";
import type {
  BuildingLevelDTO,
  BuildingLevelInput,
} from "./buildingLevelModel";
import { useDetailModal } from "@stores/modalStore";
import moment from "moment";

export interface BuildingInput {
  name: string;
  address: string;
  year_built: string;
  building_type: DropdownType | null;
  area_sq_meters: string;
  project_id: DropdownType | null;
  location: MapType | null;
  status_construction?: string;
  construction_start_date: string;
  construction_end_date: string;
  elevations: BuildingElevationInput[];
  levels: BuildingLevelInput[];
}

export interface BuildingAddDTO {
  id: number;
  name: string;
  address: string;
  year_built: number;
  building_type: number;
  area_sq_meters: number;
  levels_count: number;
  sides_count: number;
  owner_id: number;
  project_id: number;
  latitude: number;
  longitude: number;
  status_construction: number | null;
  construction_start_date: string | null;
  construction_end_date: string | null;
  created_at: string;
  updated_at: string | null;
  is_deleted: boolean;
  deleted_at: string | null;
  project: ProjectDTO | null;
}

export interface BuildingDTO extends BuildingAddDTO {
  elevations: BuildingElevationDTO[];
  levels: BuildingLevelDTO[];
}

const useBuildingModel = () => {
  const showDetailModal = useDetailModal((state) => state.showModal);

  const { nav, onMutate, onSettled, onError, onSuccess } = useHelper();

  const useGetBuildings = () =>
    useQueries({
      queries: [
        { queryKey: ["getBuildings"], queryFn: () => getBuildings() },
        { queryKey: ["getBuildingTypes"], queryFn: () => getBuildingTypes() },
      ],
    });

  const useGetBuildingFormDropdown = () =>
    useQueries({
      queries: [
        {
          queryKey: ["getBuilding1Dropdown"],
          queryFn: () => getBuildingTypes(),
        },
        { queryKey: ["getBuilding2Dropdown"], queryFn: () => getProjects() },
      ],
    });

  const useGetBuildingDetail = () =>
    useMutation({
      mutationKey: ["getBuildingDetail"],
      mutationFn: (id: number) => getBuildingDetail(id),
      onMutate: () => onMutate("modal"),
      onSettled: () => onSettled("modal"),
      onError,
      onSuccess: (res) =>
        showDetailModal({
          title: res.data.name,
          data: [
            { type: "text", label: "Name", value: res.data.name },
            { type: "text", label: "Address", value: res.data.address },
            {
              type: "text",
              label: "Year Built",
              value: res.data.year_built.toString(),
            },
            {
              type: "text",
              label: "Area (m²)",
              value: res.data.area_sq_meters.toString(),
            },
            {
              type: "text",
              label: "Elevations Count",
              value: res.data.sides_count.toString(),
            },
            {
              type: "text",
              label: "Levels Count",
              value: res.data.levels_count.toString(),
            },
            {
              type: "map",
              label: "Location",
              value: {
                lat: res.data.latitude,
                lng: res.data.longitude,
                area: "-",
                description: "-",
              },
            },
            {
              type: "text",
              label: "Status Construction (%)",
              value: res.data.status_construction?.toString() || "-",
            },
            {
              type: "text",
              label: "Start Date",
              value: res.data.construction_start_date
                ? moment(
                    res.data.construction_start_date.replace("Z", "")
                  ).format("ddd, DD MMM YYYY")
                : "-",
            },
            {
              type: "text",
              label: "End Date",
              value: res.data.construction_end_date
                ? moment(
                    res.data.construction_end_date.replace("Z", "")
                  ).format("ddd, DD MMM YYYY")
                : "-",
            },
            {
              type: "accordion",
              label: "Project",
              value: [
                {
                  title: res.data.project?.name ?? "-",
                  data: [
                    { label: "Name", value: res.data.project?.name ?? "-" },
                    { label: "Address", value: res.data.project?.name ?? "-" },
                    {
                      label: "Description",
                      value: res.data.project?.description ?? "-",
                    },
                    {
                      label: "Status",
                      value: res.data.project?.status.toString() ?? "-",
                    },
                  ],
                },
              ],
            },
            {
              type: "accordion",
              label: "Elevations",
              value: res.data.elevations.map((elevation) => ({
                title: elevation.name,
                data: [
                  { label: "Name", value: elevation.name },
                  {
                    label: "Orientation Degrees (°)",
                    value: elevation.orientation_degrees.toString(),
                  },
                  {
                    label: "Description",
                    value: elevation.description || "-",
                  },
                ],
              })),
            },
          ],
        }),
    });

  const useAddBuilding = () =>
    useMutation({
      mutationKey: ["addBuilding"],
      mutationFn: (body: BuildingInput) => addBuilding(body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        nav("/building");
        queryClient.invalidateQueries({ queryKey: ["getBuildings"] });
        onSuccess(res.message);
      },
    });

  return {
    useGetBuildings,
    useGetBuildingFormDropdown,
    useGetBuildingDetail,
    useAddBuilding,
  };
};

export default useBuildingModel;
