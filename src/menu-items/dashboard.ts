// assets
import { WalletOutlined } from "@mui/icons-material";
import { MenuType } from ".";

const icons = {
  dashboard: WalletOutlined,
};

const dashboard: MenuType = {
  id: "group-dashboard",
  title: "Dashboard",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: "dashboard",
      url: "/",
      type: "item",
      icon: icons.dashboard,
    },
  ],
};

export default dashboard;
