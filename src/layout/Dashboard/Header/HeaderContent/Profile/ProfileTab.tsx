/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { LogoutOutlined, EditOutlined } from "@mui/icons-material";

const ProfileTab = ({
  handleLogout,
  changePassword,
}: {
  handleLogout: () => void;
  changePassword: (event: any) => void;
}) => {
  // const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // const handleListItemClick = (
  //   event: MouseEvent<HTMLDivElement>,
  //   index: number
  // ) => {
  //   setSelectedIndex(index);
  // };

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
      {/* <ListItemButton onClick={changePassword}>
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText primary="Change Password" />
      </ListItemButton> */}
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

export default ProfileTab;
