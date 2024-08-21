// assets
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { DashboardOutlined, EditNote } from "@mui/icons-material";
import { MenuType } from ".";

const icons = {
  dashboard: DashboardOutlined,
  input: EditNote,
  scope: LiveHelpIcon,
};

const dashboard: MenuType = {
  id: "group-dashboard",
  title: "Menu",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: "Dashboard",
      url: "/",
      type: "item",
      icon: icons.dashboard,
    },
    {
      id: "input",
      title: "Input",
      url: "/input",
      type: "item",
      icon: icons.input,
    },
    {
      id: "scope library",
      title: "Scope Library",
      url: "/scope-library",
      type: "item",
      icon: icons.scope,
    },
  ],
};

export default dashboard;
