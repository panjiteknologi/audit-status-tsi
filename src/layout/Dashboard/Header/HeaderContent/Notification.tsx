import { useRef, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Badge,
  Box,
  ClickAwayListener,
  List,
  Paper,
  Popper,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";

// project import
import MainCard from "@/components/MainCard";
import IconButton from "@/components/@extended/IconButton";
import Transitions from "@/components/@extended/Transitions";
import { ThemeMode } from "@/config";

// assets
import { NotificationsNoneOutlined, CheckOutlined } from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BASE_URL,
  GET_NOTIFICATION,
  UPDATE_READ_NOTIFICATION,
} from "@/contexts/JWTContext";
import axios from "axios";
import { AllNotification, AllProject } from "@/types/Project";

// sx styles
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: "1rem",
};

const actionSX = {
  mt: "6px",
  ml: 1,
  top: "auto",
  right: "auto",
  alignSelf: "flex-start",
  transform: "none",
};

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const anchorRef = useRef<null | HTMLButtonElement>(null);
  const [read, setRead] = useState(0);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current?.contains(event?.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen =
    theme.palette.mode === ThemeMode.DARK ? "background.default" : "grey.100";

  const { data: allNotification = [] } = useQuery({
    queryKey: ["allNotifications"],
    queryFn: async () => {
      const token = window.localStorage.getItem("serviceToken");
      const idUser = window.localStorage.getItem("idUser");

      try {
        const response = await axios({
          method: "get",
          url: BASE_URL + GET_NOTIFICATION,
          data: {
            id_user: idUser as string,
          },
          headers: {
            Authorization: token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        setLoading(false);
        setRead(response?.length);
        return response;
      } catch (error) {
        console.log("errr", error);
        setLoading(false);
        return [];
      } finally {
        setLoading(false);
      }
    },
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: true,
    refetchInterval: 500,
  });

  const mutation = useMutation({
    mutationFn: async (values: AllProject) => {
      const idUser = window.localStorage.getItem("idUser");
      const token = window.localStorage.getItem("serviceToken");
      const data = {
        id_user: idUser,
        id_notifikasi: "1",
        status_notifikasi: "1",
      };

      return axios.post(BASE_URL + UPDATE_READ_NOTIFICATION, data, {
        headers: { Authorization: token },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allProjects"] });
    },
    onError: () => {},
  });

  const onSubmit = async (values: AllNotification) => {
    mutation.mutate(values);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        color="secondary"
        variant="light"
        sx={{
          color: "text.primary",
          bgcolor: open ? iconBackColorOpen : "transparent",
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={read} color="primary">
          <NotificationsNoneOutlined />
        </Badge>
      </IconButton>
      <Popper
        placement={matchesXs ? "bottom" : "bottom-end"}
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
                offset: [matchesXs ? -5 : 0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions
            type="grow"
            position={matchesXs ? "top" : "top-right"}
            in={open}
            {...TransitionProps}
          >
            <Paper
              sx={{
                boxShadow: theme.customShadows?.z1,
                width: "100%",
                minWidth: 285,
                maxWidth: 420,
                [theme.breakpoints.down("md")]: {
                  maxWidth: 285,
                },
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title="Notification"
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    <>
                      {read > 0 && (
                        <Tooltip title="Mark as all read">
                          <IconButton
                            color="success"
                            size="small"
                            onClick={() => setRead(0)}
                          >
                            <CheckOutlined style={{ fontSize: "1.15rem" }} />
                          </IconButton>
                        </Tooltip>
                      )}
                    </>
                  }
                >
                  <List
                    component="nav"
                    sx={{
                      "& .MuiListItemButton-root": {
                        py: 0.5,
                        "&.Mui-selected": {
                          bgcolor: "grey.50",
                          color: "text.primary",
                        },
                        "& .MuiAvatar-root": avatarSX,
                        "& .MuiListItemSecondaryAction-root": {
                          ...actionSX,
                          position: "relative",
                        },
                      },
                    }}
                  >
                    <Box
                      onClick={() => onSubmit()}
                      sx={{
                        backgroundColor: "#e5f5fc",
                        borderBottom: 1,
                        borderColor: "#000",
                        padding: 2,
                        cursor: "pointer",
                        outline: "none",
                        ":hover": {
                          backgroundColor: "#d8f0fa",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 16,
                          color: "#EF5A6F",
                          fontWeight: "bold",
                        }}
                      >
                        Update tgl_kontrak
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 16,
                          color: "#000",
                          marginLeft: 2,
                        }}
                      >
                        Tanggal kontrak PT Sanggar Jaya Abadi dengnan nomor
                        customer ID telah di input, Mohon untuk di cek kembali
                        !!
                      </Typography>
                    </Box>
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Notification;
