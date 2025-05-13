// assets
import {
  DashboardOutlined,
  EditNote,
  Language,
  ForestRounded,
  TaskAltRounded,
  LoopRounded,
} from "@mui/icons-material";
import { MenuType } from ".";

const icons = {
  dashboard: DashboardOutlined,
  input: EditNote,
  iso: Language,
  ispo: ForestRounded,
  done: TaskAltRounded,
  progress: LoopRounded,
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
    // {
    //   id: "iso",
    //   title: "ISO",
    //   url: "/iso",
    //   type: "collapse",
    //   icon: icons.iso,
    //   children: [
    //     {
    //       id: "iso-progress",
    //       title: "On Progress",
    //       url: "/iso-progress",
    //       type: "item",
    //       icon: icons.progress,
    //     },
    //     {
    //       id: "iso-done",
    //       title: "Done",
    //       url: "/iso-done",
    //       type: "item",
    //       icon: icons.done,
    //     }
    //   ]
    // },
    // {
    //   id: "ispo",
    //   title: "ISPO",
    //   url: "/ispo",
    //   type: "item",
    //   icon: icons.ispo,
    // },
  ],
};

export default dashboard;
