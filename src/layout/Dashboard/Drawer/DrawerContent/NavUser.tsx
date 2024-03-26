/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Theme,
} from "@mui/material";

// project import
import Avatar from "@/components/@extended/Avatar";
import useAuth from "@/hooks/useAuth";
import { useGetMenuMaster } from "@/api/menu";

// assets
import { KeyboardArrowRight, SettingsOutlined } from "@mui/icons-material";

interface ExpandMoreProps {
  theme: Theme;
  expand: boolean;
  drawerOpen?: boolean;
}

const ExpandMore = styled(IconButton, {
  shouldForwardProp: (prop) =>
    prop !== "theme" && prop !== "expand" && prop !== "drawerOpen",
})(({ theme, expand, drawerOpen }: ExpandMoreProps) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(-90deg)",
  marginLeft: "auto",
  color: theme.palette.secondary.dark,
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  ...(!drawerOpen && {
    opacity: 0,
    width: 50,
    height: 50,
  }),
}));

// ==============================|| DRAWER - USER ||============================== //

const NavUser = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;

  const { user } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dataUser = user?.data;

  return (
    <Box
      sx={{
        p: 1.25,
        px: !drawerOpen ? 1.25 : 3,
        borderTop: `2px solid ${theme.palette.divider}`,
      }}
    >
      <List disablePadding>
        <ListItem
          disablePadding
          secondaryAction={
            <ExpandMore
              size="small"
              theme={theme}
              expand={open}
              drawerOpen={Boolean(drawerOpen)}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              aria-label="show more"
            >
              <KeyboardArrowRight style={{ fontSize: "0.625rem" }} />
            </ExpandMore>
          }
          sx={{
            "& .MuiListItemSecondaryAction-root": {
              right: !drawerOpen ? -20 : -16,
            },
          }}
        >
          <ListItemAvatar>
            <Avatar
              alt="Avatar"
              sx={{ ...(drawerOpen && { width: 36, height: 36 }) }}
            >
              <SettingsOutlined />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Settings" secondary={dataUser?.jabatan} />
        </ListItem>
      </List>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("change-password");
          }}
        >
          Change Password
        </MenuItem>
        {/* <MenuItem component={Link} to="#" onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem component={Link} to="#" onClick={handleClose}>
          My account
        </MenuItem> */}
      </Menu>
    </Box>
  );
};

export default NavUser;
