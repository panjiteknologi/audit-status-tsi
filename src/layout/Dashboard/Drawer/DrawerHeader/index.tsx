// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";

// project import
import DrawerHeaderStyled from "./DrawerHeaderStyled";
import useConfig from "@/hooks/useConfig";
import Avatar from "@/components/@extended/Avatar";

import { MenuOrientation } from "@/config";

// assets
import Person4OutlinedIcon from "@mui/icons-material/Person4Outlined";

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }: { open: boolean }) => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down("lg"));

  const { menuOrientation } = useConfig();
  const isHorizontal =
    menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  const userName = window.localStorage.getItem("userName");

  return (
    <DrawerHeaderStyled
      theme={theme}
      open={open}
      sx={{
        minHeight: isHorizontal ? "unset" : "60px",
        width: isHorizontal ? { xs: "100%", lg: "424px" } : "inherit",
        paddingTop: isHorizontal ? { xs: "10px", lg: "0" } : "8px",
        paddingBottom: isHorizontal ? { xs: "18px", lg: "0" } : "8px",
        paddingLeft: isHorizontal ? { xs: "24px", lg: "0" } : open ? "24px" : 0,
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ p: 0.5 }}
        marginTop={2}
      >
        <Avatar alt="profile user" size="xs">
          <Person4OutlinedIcon />
        </Avatar>
        {open && (
          <Box>
            <Typography variant="subtitle1">{userName || "-"}</Typography>{" "}
            <Typography variant="body2" color="textSecondary">
              {/* {dataUser?.jabatan || "-"} */}
            </Typography>
          </Box>
        )}
      </Stack>
    </DrawerHeaderStyled>
  );
};

export default DrawerHeader;
