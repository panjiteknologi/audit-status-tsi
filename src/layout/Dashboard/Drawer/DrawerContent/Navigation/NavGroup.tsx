import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { useLocation } from "react-router";

// material-ui
import { useTheme, styled } from "@mui/material/styles";
import {
  Box,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
  useMediaQuery,
} from "@mui/material";

// project import
import NavItem from "./NavItem";
import NavCollapse from "./NavCollapse";
import SimpleBar from "@/components/third-party/SimpleBar";
import Transitions from "@/components/@extended/Transitions";
import { MenuOrientation, ThemeMode } from "@/config";

import useConfig from "@/hooks/useConfig";
import { handlerHorizontalActiveItem, useGetMenuMaster } from "@/api/menu";

// types
import { MainMenu, MenuType, Submenu } from "@/menu-items";
import useAuth from "@/hooks/useAuth";

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const PopperStyled = styled(Popper)(({ theme }) => ({
  overflow: "visible",
  zIndex: 1202,
  minWidth: 180,
  "&:before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 5,
    left: 32,
    width: 12,
    height: 12,
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 120,
    borderWidth: "6px",
    borderStyle: "solid",
    borderColor: `${theme.palette.background.paper}  transparent transparent ${theme.palette.background.paper}`,
  },
}));

interface NavGroupProps {
  item: MenuType;
  lastItem: number | null;
  remItems: any;
  lastItemId: string;
  setSelectedItems: Dispatch<SetStateAction<string>>;
  selectedItems: string;
  setSelectedLevel: Dispatch<SetStateAction<number>>;
  selectedLevel: number;
}

const NavGroup = ({
  item,
  lastItem,
  remItems,
  lastItemId,
  setSelectedItems,
  selectedItems,
  setSelectedLevel,
  selectedLevel,
}: NavGroupProps) => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const auth = useAuth();

  const { menuOrientation } = useConfig();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;
  const selectedID = menuMaster?.openedHorizontalItem;

  const downLG = useMediaQuery(theme.breakpoints.down("lg"));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentItem, setCurrentItem] = useState<MenuType>(item);

  const openMini = Boolean(anchorEl);

  // ======== Formating Nav Item By Role ========
  let navs: MainMenu[] | [] = [];
  // let role = auth.user?.role;
  let role = "12";

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

  if (item.children) {
    if (
      role === "2" ||
      role === "6" ||
      role === "7" ||
      role === "8" ||
      role === "10" ||
      role === "12"
    ) {
      // for customer/sales/crm/finance/auditor/monitor
      navs = item.children?.filter((item) => item.id === "dashboard");
    } else if (role === "3") {
      // for operator_iso
      navs = item.children?.filter(
        (item) => item.id === "iso" || item.id === "scope_library"
      );
    } else if (role === "4") {
      // for operator_ispo
      navs = item.children?.filter(
        (item) => item.id === "ispo" || item.id === "scope_library"
      );
    } else {
      navs = item.children;
    }
  }

  useEffect(() => {
    if (lastItem) {
      if (item.id === lastItemId) {
        const localItem = { ...item };
        const elements = remItems.map((ele: MenuType) => ele?.children);
        localItem.children = elements.flat(1);
        setCurrentItem(localItem);
      } else {
        setCurrentItem(item);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, lastItem, downLG]);

  const checkOpenForParent = (child: Submenu[], id: string) => {
    child.forEach((ele) => {
      if (ele.url === pathname) {
        handlerHorizontalActiveItem(id);
      }
    });
  };

  const checkSelectedOnload = (data: MenuType) => {
    const childrens = data.children ? data.children : [];
    childrens.forEach((itemCheck) => {
      if (itemCheck?.children?.length) {
        checkOpenForParent(itemCheck.children, currentItem.id);
      }
      if (itemCheck?.url === pathname) {
        handlerHorizontalActiveItem(currentItem.id);
      }
    });
  };

  useEffect(() => {
    checkSelectedOnload(currentItem);
    if (openMini) setAnchorEl(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, currentItem]);

  const handleClick = (event: any) => {
    if (!openMini) {
      setAnchorEl(event?.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Icon = currentItem?.icon as any;
  const itemIcon = currentItem?.icon ? (
    <Icon
      style={{
        fontSize: 20,
        stroke: "1.5",
        color:
          selectedID === currentItem.id
            ? theme.palette.primary.main
            : theme.palette.secondary.dark,
      }}
    />
  ) : null;

  const navCollapse = navs?.map((menuItem: MainMenu) => {
    switch (menuItem.type) {
      case "collapse":
        return (
          <NavCollapse
            key={menuItem.id}
            menu={menuItem}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            level={1}
            parentId={currentItem.id}
          />
        );
      case "item":
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography
            key={menuItem.id}
            variant="h6"
            color="error"
            align="center"
          >
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  const moreItems = remItems.map((itemRem: MenuType, i: number) => (
    <Fragment key={i}>
      {itemRem.title && (
        <Typography variant="caption" sx={{ pl: 2 }}>
          {itemRem.title}
        </Typography>
      )}

      {itemRem?.children?.map((menu) => {
        switch (menu?.type) {
          case "collapse":
            return (
              <NavCollapse
                key={menu.id}
                menu={menu}
                level={1}
                parentId={currentItem.id}
                setSelectedItems={setSelectedItems}
                setSelectedLevel={setSelectedLevel}
                selectedLevel={selectedLevel}
                selectedItems={selectedItems}
              />
            );
          case "item":
            return <NavItem key={menu.id} item={menu} level={1} />;
          default:
            return (
              <Typography
                key={menu.id}
                variant="h6"
                color="error"
                align="center"
              >
                Menu Items Error
              </Typography>
            );
        }
      })}
    </Fragment>
  ));

  // menu list collapse & items
  const items = currentItem.children?.map((menu) => {
    switch (menu?.type) {
      case "collapse":
        return (
          <NavCollapse
            key={menu.id}
            menu={menu}
            level={1}
            parentId={currentItem.id}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
          />
        );
      case "item":
        return <NavItem key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu?.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const popperId = openMini ? `group-pop-${item.id}` : undefined;

  return (
    <>
      {menuOrientation === MenuOrientation.VERTICAL || downLG ? (
        <List
          subheader={
            <>
              {item.title ? (
                drawerOpen && (
                  <Box sx={{ pl: 3, mb: 1.5 }}>
                    <Typography
                      variant="subtitle2"
                      color={
                        theme.palette.mode === ThemeMode.DARK
                          ? "textSecondary"
                          : "text.secondary"
                      }
                    >
                      {item.title}
                    </Typography>
                    {/* {item.caption && (
                      <Typography variant="caption" color="secondary">
                        {item.caption}
                      </Typography>
                    )} */}
                  </Box>
                )
              ) : (
                <Divider sx={{ my: 0.5 }} />
              )}
            </>
          }
          sx={{ mt: drawerOpen && item.title ? 1.5 : 0, py: 0, zIndex: 0 }}
        >
          {navCollapse}
        </List>
      ) : (
        <List>
          <ListItemButton
            selected={selectedID === currentItem.id}
            sx={{
              p: 1,
              my: 0.5,
              mr: 1,
              display: "flex",
              alignItems: "center",
              backgroundColor: "inherit",
              "&.Mui-selected": {
                bgcolor: "transparent",
              },
            }}
            onMouseEnter={handleClick}
            onClick={handleClick}
            onMouseLeave={handleClose}
            aria-describedby={popperId}
          >
            {itemIcon && (
              <ListItemIcon sx={{ minWidth: 28 }}>
                {currentItem.id === lastItemId && itemIcon}
              </ListItemIcon>
            )}
            <ListItemText
              sx={{ mr: 1 }}
              primary={
                <Typography
                  variant="body1"
                  color={
                    selectedID === currentItem.id
                      ? theme.palette.primary.main
                      : theme.palette.secondary.dark
                  }
                >
                  {currentItem.id === lastItemId && currentItem.title}
                </Typography>
              }
            />
            {anchorEl && (
              <PopperStyled
                id={popperId}
                open={openMini}
                anchorEl={anchorEl}
                placement="bottom-start"
                style={{
                  zIndex: 2001,
                }}
              >
                {({ TransitionProps }) => (
                  <Transitions in={openMini} {...TransitionProps}>
                    <Paper
                      sx={{
                        mt: 0.5,
                        py: 1.25,
                        boxShadow: theme.shadows[8],
                        backgroundImage: "none",
                      }}
                    >
                      <ClickAwayListener onClickAway={handleClose}>
                        <>
                          <SimpleBar
                            sx={{
                              minWidth: 200,
                              overflowX: "hidden",
                              overflowY: "auto",
                              maxHeight: "calc(100vh - 170px)",
                            }}
                          >
                            {currentItem.id !== lastItemId ? items : moreItems}
                          </SimpleBar>
                        </>
                      </ClickAwayListener>
                    </Paper>
                  </Transitions>
                )}
              </PopperStyled>
            )}
          </ListItemButton>
        </List>
      )}
    </>
  );
};
export default NavGroup;
