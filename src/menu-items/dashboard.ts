// assets
import { DashboardOutlined, EditNote, Language, ForestRounded } from "@mui/icons-material";
import { MenuType } from ".";

const icons = {
  dashboard: DashboardOutlined,
  input: EditNote,
  iso: Language,
  ispo: ForestRounded
};

const dashboard: MenuType = {
  id: "group-dashboard",
  title: "Menu",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: "Dashboard",
      url: "/dashboard",
      type: "item",
      icon: icons.dashboard,
    },
    {
      id: "iso",
      title: "ISO",
      url: "/iso",
      type: "item",
      icon: icons.iso,
    },
    {
      id: "ispo",
      title: "ISPO",
      url: "/ispo",
      type: "item",
      icon: icons.ispo,
    },
  ],
};

export default dashboard;
