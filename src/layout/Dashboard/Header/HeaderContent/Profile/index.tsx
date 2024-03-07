/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";

// project import
import ProfileTab from "./ProfileTab";
import Avatar from "@/components/@extended/Avatar";
import MainCard from "@/components/MainCard";
import Transitions from "@/components/@extended/Transitions";

import useAuth from "@/hooks/useAuth";
import { ThemeMode } from "@/config";

// assets
import { AccountCircleOutlined } from "@mui/icons-material";

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate(`/`, {
        state: {
          from: "",
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const anchorRef = useRef<null | HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen =
    theme.palette.mode === ThemeMode.DARK ? "background.default" : "grey.100";

  const dataUser = user?.data;

  const username = window.localStorage.getItem("username");

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : "transparent",
          borderRadius: 1,
          "&:hover": {
            bgcolor:
              theme.palette.mode === ThemeMode.DARK
                ? "secondary.light"
                : "secondary.lighter",
          },
          "&:focus-visible": {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2,
          },
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack
          direction="row"
          spacing={1.25}
          alignItems="center"
          sx={{ p: 0.5 }}
        >
          <Avatar alt="profile user" size="sm">
            <AccountCircleOutlined />
          </Avatar>
          {/* <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
            {dataUser?.nama || "-"}
          </Typography> */}
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions
            type="grow"
            position="top-right"
            in={open}
            {...TransitionProps}
          >
            <Paper
              sx={{
                boxShadow: theme.customShadows?.z1,
                width: 290,
                minWidth: 240,
                maxWidth: 290,
                [theme.breakpoints.down("md")]: {
                  maxWidth: 250,
                },
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  elevation={0}
                  border={false}
                  content={false}
                  showButton={false}
                >
                  <CardContent sx={{ px: 2.5, pt: 3 }}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Stack
                          direction="row"
                          spacing={1.25}
                          alignItems="center"
                        >
                          <Avatar
                            alt="profile user"
                            sx={{ width: 32, height: 32 }}
                          >
                            <AccountCircleOutlined />
                          </Avatar>
                          <Stack>
                            <Typography variant="h6">
                              {username || "-"}
                            </Typography>
                            {/* <Typography variant="body2" color="textSecondary">
                              {dataUser?.jabatan || "-"}
                            </Typography> */}
                          </Stack>
                        </Stack>
                      </Grid>
                      {/* <Grid item>
                        <Tooltip title="Logout">
                          <IconButton
                            size="large"
                            sx={{ color: "text.primary" }}
                            onClick={handleLogout}
                          >
                            <LogoutOutlined />
                          </IconButton>
                        </Tooltip>
                      </Grid> */}
                    </Grid>
                  </CardContent>
                  <ProfileTab handleLogout={handleLogout} />
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
