/* eslint-disable @typescript-eslint/no-unused-vars */
import { MouseEvent, useState } from "react";

// material-ui
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// assets
import { LogoutOutlined } from "@mui/icons-material";

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout }: { handleLogout: () => void }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleListItemClick = (
    event: MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <List
      component="nav"
      sx={{ p: 0, "& .MuiListItemIcon-root": { minWidth: 32 } }}
    >
      {/* <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItemButton> */}
      <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

export default ProfileTab;
