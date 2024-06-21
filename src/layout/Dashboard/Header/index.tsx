import { useMemo } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  AppBarProps,
  Box,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";

// project import
import AppBarStyled from "./AppBarStyled";
import HeaderContent from "./HeaderContent";
import IconButton from "@/components/@extended/IconButton";

import {
  DRAWER_WIDTH,
  MINI_DRAWER_WIDTH,
  MenuOrientation,
  ThemeMode,
} from "@/config";
import useConfig from "@/hooks/useConfig";
import { handlerDrawerOpen, useGetMenuMaster } from "@/api/menu";

// assets
import { Menu, MenuOpen } from "@mui/icons-material";
import useAuth from "@/hooks/useAuth";

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = () => {
  const { isLoggedIn } = useAuth();

  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down("lg"));
  const { menuOrientation } = useConfig();

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;

  const isHorizontal =
    menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  // header content
  const headerContent = useMemo(() => <HeaderContent />, []);

  const iconBackColor =
    theme.palette.mode === ThemeMode.DARK ? "background.default" : "grey.100";

  // common header
  const mainHeader = (
    <Toolbar>
      {isLoggedIn ? (
        <>
          {!isHorizontal ? (
            <IconButton
              aria-label="open drawer"
              onClick={() => handlerDrawerOpen(!drawerOpen)}
              edge="start"
              color="secondary"
              variant="light"
              sx={{
                color: "text.primary",
                bgcolor: drawerOpen ? "transparent" : iconBackColor,
                ml: { xs: 0, lg: -2 },
              }}
            >
              {!drawerOpen ? <Menu /> : <MenuOpen />}
            </IconButton>
          ) : null}
        </>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Typography variant="h5">Audit Status System</Typography>
        </Box>
      )}
      {headerContent}
    </Toolbar>
  );

  // app-bar params
  const appBar: AppBarProps = {
    position: "fixed",
    color: "inherit",
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      zIndex: 1200,
      width: isLoggedIn
        ? isHorizontal
          ? "100%"
          : {
              xs: "100%",
              lg: drawerOpen
                ? `calc(100% - ${DRAWER_WIDTH}px)`
                : `calc(100% - ${MINI_DRAWER_WIDTH}px)`,
            }
        : "100%",
    },
  };

  return (
    <>
      {!downLG ? (
        <AppBarStyled open={Boolean(drawerOpen)} theme={theme} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
};

export default Header;
