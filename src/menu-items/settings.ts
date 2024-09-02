// assets
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { MenuType } from ".";

const icons = {
  scope: LiveHelpIcon,
  user: ManageAccountsIcon,
};

const settings: MenuType = {
  id: "group-settings",
  title: "Settings",
  type: "group",
  children: [
    {
      id: "scope_library",
      title: "Scope Library",
      url: "/scope-library",
      type: "item",
      icon: icons.scope,
    },
  ],
};

export default settings;
