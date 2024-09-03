import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import AuthWrapper from "@/sections/auth/AuthWrapper";
import AuthLogin from "@/sections/auth/auth-forms/AuthLogin";
import { useState } from "react";
import ilustrationSuccess from "../assets/ilustration/il-success.svg";
import ilustrationServerDown from "../assets/ilustration/il-server-down.svg";
import CloseButton from "@/sections/iso/CloseButton";

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [titleMessage, setTitleMessage] = useState("");
  const [message, setMessage] = useState("");

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h4" sx={{ textAlign: "center", flex: 1 }}>
              Login
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin
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
    </AuthWrapper>
  );
};

export default Login;
