import { useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Badge,
  Box,
  ClickAwayListener,
  List,
  ListItem,
  Paper,
  Popper,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MainCard from "@/components/MainCard";
import IconButton from "@/components/@extended/IconButton";
import Transitions from "@/components/@extended/Transitions";
import { ThemeMode } from "@/config";
import { NotificationsNoneOutlined, CheckOutlined } from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BASE_URL,
  GET_NOTIFICATION,
  UPDATE_READ_NOTIFICATION,
} from "@/contexts/JWTContext";
import axios from "axios";
import { AllNotification } from "@/types/Project";
import { useNavigate } from "react-router";

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

const Notification = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));
  const queryClient = useQueryClient();

  const anchorRef = useRef<null | HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

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

  const { data: allNotification = [] } = useQuery({
    queryKey: ["allNotifications"],
    queryFn: async () => {
      const token = window.localStorage.getItem("serviceToken");
      const idUser = window.localStorage.getItem("idUser");
      const data = { id_user: idUser };

      try {
        const response = await axios.post(BASE_URL + GET_NOTIFICATION, data, {
          headers: { Authorization: token },
        });
        return response?.data?.data;
      } catch (error) {
        console.log("errr", error);
        return [];
      } finally {
      }
    },
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: true,
    refetchInterval: 500,
  });

  const mutation = useMutation({
    mutationFn: async (values: AllNotification) => {
      const idUser = Number(window.localStorage.getItem("idUser"));
      const token = window.localStorage.getItem("serviceToken");

      const data = {
        id_user: idUser,
        id_notifikasi: values?.id_notifikasi,
        status_notifikasi: 1,
      };

      return axios.post(BASE_URL + UPDATE_READ_NOTIFICATION, data, {
        headers: { Authorization: token },
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["allNotifications"] });
    },
    onError: (error) => {
      console.error("Error updating notification:", error);
    },
  });

  const onSubmit = async (values: AllNotification) => {
    mutation.mutate(values);
    setClickedIndex(values?.status_notif);
    if (values?.id_project) {
      setOpen(false);
      navigate(`/detail-project/${values?.id_project}`);
    }
  };

  const unreadCount = allNotification.filter(
    (item: AllNotification) =>
      item.status_notif === null || item.status_notif !== 1
  ).length;

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
        <Badge badgeContent={unreadCount} color="primary">
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
              options: { offset: [matchesXs ? -5 : 0, 9] },
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
                [theme.breakpoints.down("md")]: { maxWidth: 285 },
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title="Notification"
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    unreadCount > 0 && (
                      <Tooltip title="Mark as all read">
                        <IconButton
                          color="success"
                          size="small"
                          onClick={() => setClickedIndex(null)}
                        >
                          <CheckOutlined style={{ fontSize: "1.15rem" }} />
                        </IconButton>
                      </Tooltip>
                    )
                  }
                >
                  <List
                    component="nav"
                    sx={{
                      maxHeight: "400px",
                      overflowY: "auto",
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
                    {allNotification?.map(
                      (item: AllNotification, index: number) => {
                        return (
                          <ListItem
                            key={index}
                            onClick={() => onSubmit(item)}
                            sx={{
                              backgroundColor:
                                item?.status_notif === 1 ||
                                clickedIndex === index
                                  ? "white"
                                  : "#e5f5fc",
                              borderBottom: 1,
                              borderColor: "#d8f0fa",
                              padding: 2,
                              cursor: "pointer",
                              outline: "none",
                              ":hover": { backgroundColor: "#d8f0fa" },
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 16,
                                color: "#EF5A6F",
                                fontWeight: "bold",
                              }}
                            >
                              {item?.create_date}
                            </Typography>
                            <Typography sx={{ fontSize: 16, color: "#000" }}>
                              {item?.message_notif ? item?.message_notif : "-"}
                            </Typography>
                          </ListItem>
                        );
                      }
                    )}
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
