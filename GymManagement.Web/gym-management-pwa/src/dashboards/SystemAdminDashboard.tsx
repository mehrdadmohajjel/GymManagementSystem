import MainLayout from "../layouts/MainLayout";
import { Outlet } from "react-router-dom";
import SystemAdminMenu from "../menues/SystemAdminMenu";

export default function SystemAdminDashboard() {
  return (
    <MainLayout menu={<SystemAdminMenu />}>
      <Outlet />
    </MainLayout>
  );
}
