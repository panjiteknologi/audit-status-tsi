import { FC } from "react";

export type Submenu = {
  id: string;
  title: string;
  type: "item" | "collapse";
  url?: string;
  icon: JSX.Element | FC;
  breadcrumbs?: boolean;
};

export type MainMenu = {
  id: string;
  title: string;
  caption?: string;
  type: "item" | "collapse";
  url?: string;
  icon: JSX.Element | FC;
  isDropdown?: boolean;
  children?: Submenu[] | [];
};

export type MenuType = {
  id: string;
  title: string;
  type: "group";
  icon?: JSX.Element | FC;
  children?: MainMenu[] | [];
};

// project import
import dashboard from "./dashboard";
// import settings from "./settings";

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard], //, settings],
};

export default menuItems;
