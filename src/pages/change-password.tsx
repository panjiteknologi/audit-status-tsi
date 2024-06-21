// material-ui
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";

// project import
import CloseButton from "@/sections/dashboard/CloseButton";
import { useState } from "react";
import ilustrationSuccess from "../assets/ilustration/il-success.svg";
import ilustrationServerDown from "../assets/ilustration/il-server-down.svg";
import ChangePasswordSections from "@/sections/change-password/ChangePasswordSections";
import MainCard from "@/components/MainCard";

// ================================|| ChangePassword ||================================ //

const ChangePassword = () => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [titleMessage, setTitleMessage] = useState("");
  const [message, setMessage] = useState("");

  return (
    <MainCard
      title="Change Password"
      boxShadow
      showButton={false}
      sx={{ minHeight: 250 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ChangePasswordSections
            setError={setError}
            setShowModal={setShowModal}
            setTitleMessage={setTitleMessage}
            setMessage={setMessage}
          />
        </Grid>
      </Grid>

      <Dialog
        open={showModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ textAlign: "center" }}
        fullWidth
      >
        <CloseButton onClick={() => setShowModal(false)} />
        <DialogTitle
          id="alert-dialog-title"
          fontWeight={"bold"}
          color={"steelblue"}
          marginTop={5}
        >
          {titleMessage}
        </DialogTitle>
        <DialogContent>
          <Box marginTop={-4}>
            {!error ? (
              <img
                src={ilustrationSuccess}
                style={{ width: 250, height: 250 }}
              />
            ) : (
              <img
                src={ilustrationServerDown}
                style={{ width: 250, height: 250 }}
              />
            )}
          </Box>
          <DialogContentText
            id="alert-dialog-description"
            style={{
              color: "gray",
              fontWeight: "semibold",
              marginBottom: 20,
            }}
          >
            {message}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </MainCard>
  );
};

export default ChangePassword;
