import {
  AddBuilding,
  AddBuildingType,
  AddProject,
  Building,
  Dashboard,
  Project,
} from "@views/app";
import { Navigate, Route, Routes } from "react-router";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/project/*" element={<ProjectRoute />} />
      <Route path="/building/*" element={<BuildingRoute />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

const ProjectRoute = () => {
  return (
    <Routes>
      <Route index element={<Project />} />
      <Route path="/form" element={<AddProject />} />
      <Route path="*" element={<Navigate to="/project" />} />
    </Routes>
  );
};

const BuildingRoute = () => {
  return (
    <Routes>
      <Route index element={<Building />} />
      <Route path="/form" element={<AddBuilding />} />
      <Route path="/type-form" element={<AddBuildingType />} />
      <Route path="*" element={<Navigate to="/building" />} />
    </Routes>
  );
};

export default AppRoute;
