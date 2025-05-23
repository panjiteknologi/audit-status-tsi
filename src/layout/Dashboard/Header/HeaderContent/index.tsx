// material-ui
import { Box, useMediaQuery, Theme } from "@mui/material";

// project import
import Profile from "./Profile";
import MobileSection from "./MobileSection";

import useConfig from "@/hooks/useConfig";
import DrawerHeader from "@/layout/Dashboard/Drawer/DrawerHeader";

import { MenuOrientation } from "@/config";
import Notification from "./Notification";

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const { menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && (
        <DrawerHeader open={true} />
      )}
      {/* {!downLG && <Search />} */}
      <Box sx={{ width: "100%", ml: 1 }} />

      {downLG && <Box sx={{ width: "100%", ml: 1 }} />}

      <Notification />
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
};

export default HeaderContent;
