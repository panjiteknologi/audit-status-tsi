import { useLayoutEffect, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Typography, useMediaQuery } from "@mui/material";

// project import
// import NavItem from './NavItem';
import NavGroup from "./NavGroup";
import menuItem, { MenuType } from "@/menu-items";

import useConfig from "@/hooks/useConfig";
import { HORIZONTAL_MAX_ITEM } from "@/config";
import { useGetMenuMaster } from "@/api/menu";
import { MenuOrientation } from "@/config";
import useAuth from "@/hooks/useAuth";

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const theme = useTheme();
  const auth = useAuth();
  const { menuOrientation } = useConfig();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;
  const downLG = useMediaQuery(theme.breakpoints.down("lg"));

  const [selectedItems, setSelectedItems] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [menuItems, setMenuItems] = useState<{ items: MenuType[] }>({
    items: [],
  });

  // ======== Formating Nav Item By Role ========
  let menus: MenuType[] | [] = [];
  let role = auth.user?.role;
  /** ======== | ROLE
  1 : super_admin
  2 : customer
  3 : operator_iso
  4 : operator_ispo
  5 : operator_ict
  6 : crm
  7 : finance
  8 : sales
  9 : product_development
  10 : auditor
  11 : director
  12 :  monitor
  ======== | ROLE **/

  if (menuItems.items) {
    if (role === "2") {
      // for customer
      menus = menuItems.items.filter((item) => item.id === "group-dashboard");
    } else {
      menus = menuItems.items;
    }
  }

  useLayoutEffect(() => {
    setMenuItems(menuItem);
    // eslint-disable-next-line
  }, [menuItem]);

  const isHorizontal =
    menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null;
  let lastItemIndex = menuItems.items.length - 1;
  let remItems: MenuType[] = [];
  let lastItemId: string;

  //  first it checks menu item is more than giving HORIZONTAL_MAX_ITEM after that get lastItemid by giving horizontal max
  // item and it sets horizontal menu by giving horizontal max item lastly slice menuItem from array and set into remItems

  if (lastItem && lastItem < menuItems.items.length) {
    lastItemId = menuItems.items[lastItem - 1].id;
    lastItemIndex = lastItem - 1;
    remItems = menuItems.items
      .slice(lastItem - 1, menuItems.items.length)
      .map((item) => ({
        ...item,
        title: item.title,
        children: item.children,
      }));
  }

  const navGroups = menus.slice(0, lastItemIndex + 1).map((item) => {
    switch (item.type) {
      case "group":
        // if (item.id !== lastItemId) {
        //   return (
        //     <List key={item.id} {...(isHorizontal && { sx: { mt: 0.5 } })}>
        //       {!isHorizontal && index !== 0 && <Divider sx={{ my: 0.5 }} />}
        //       <NavItem item={item} level={1} isParents />
        //     </List>
        //   );
        // }

        return (
          <NavGroup
            key={item.id}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            lastItem={lastItem}
            remItems={remItems}
            lastItemId={lastItemId}
            item={item}
          />
        );
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  console.log("Nav Groups : ", navGroups);
  console.log("menuItems : ", menuItems.items);

  return (
    <Box
      sx={{
        pt: drawerOpen ? (isHorizontal ? 0 : 2) : 0,
        ...(!isHorizontal && {
          "& > ul:first-of-type": { mt: 0 },
        }),
        display: isHorizontal ? { xs: "block", lg: "flex" } : "block",
      }}
    >
      {navGroups}
    </Box>
  );
};

export default Navigation;
