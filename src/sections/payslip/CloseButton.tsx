import { Box } from "@mui/material";
import IconClose from "../../assets/icons/ic-close.svg";

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "red",
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 25,
        height: 25,
        borderRadius: 25,
        cursor: "pointer",
        outline: "none",
        ":hover": {
          backgroundColor: "pink",
        },
        position: "absolute",
        top: 12,
        right: 12,
      }}
    >
      <img
        src={IconClose}
        style={{ width: 15, height: 15 }}
        onClick={onClick}
      />
    </Box>
  );
};

export default CloseButton;
