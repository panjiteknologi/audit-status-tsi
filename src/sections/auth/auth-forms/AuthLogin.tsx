/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, MouseEvent, SetStateAction } from "react";

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project import
import useAuth from "@/hooks/useAuth";
import IconButton from "@/components/@extended/IconButton";
import AnimateButton from "@/components/@extended/AnimateButton";

// assets
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router";

// ============================|| JWT - LOGIN ||============================ //

interface AuthLoginProps {
  setError: Dispatch<SetStateAction<boolean>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setTitleMessage: Dispatch<SetStateAction<string>>;
  setMessage: Dispatch<SetStateAction<string>>;
}

const AuthLogin = ({
  setError,
  setShowModal,
  setTitleMessage,
  setMessage,
}: AuthLoginProps) => {
  const navigate = useNavigate();

  const { postLogin } = useAuth();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          login: "",
          password: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          login: Yup.string().max(50).required("Username is required"),
          password: Yup.string().min(5).required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          const login = values.login.trim();
          const password = values.password.trim();
          const db = "Odoo_Tsi_Production";

          try {
            const response = await postLogin(login, password, db);
            if (response?.result === "success") {
              navigate("/dashboard");
              setError(false);
              setStatus({ success: true });
              setSubmitting(false);
              window.localStorage.setItem("userData", JSON.stringify(response));
              window.localStorage.setItem(
                "serviceToken",
                response?.access_token
              );
              window.localStorage.setItem("userName", response?.user_name);
            } else {
              setShowModal(true);
              setError(true);
              setStatus({ success: false });
              setErrors({ submit: response?.error_message });
              setSubmitting(false);
              setTitleMessage("Sorry, you haven't successfully logged in.");
              setMessage(
                response?.error_message || "Please try again in a few moments!"
              );
              window.localStorage.removeItem("userData");
              window.localStorage.removeItem("serviceToken");
            }
          } catch (err: any) {
            setShowModal(true);
            setError(true);
            setStatus({ success: false });
            setSubmitting(false);
            setTitleMessage("Sorry, you haven't successfully logged in.");
            setMessage("Please try again in a few moments!");
            window.localStorage.removeItem("userData");
            window.localStorage.removeItem("serviceToken");
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="username-login">Username</InputLabel>
                  <OutlinedInput
                    id="username-login"
                    type="text"
                    value={values.login.trim()}
                    name="login"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter Username"
                    fullWidth
                    error={Boolean(touched.login && errors.login)}
                  />
                </Stack>
                {touched.login && errors.login && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-login-login"
                  >
                    {errors.login}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? "text" : "password"}
                    value={values.password.trim()}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? (
                            <VisibilityOutlined />
                          ) : (
                            <VisibilityOffOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-password-login"
                  >
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>

              {/* <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="h6">Keep me sign in</Typography>
                    }
                  />
                  <Link
                    variant="h6"
                    component={RouterLink}
                    to="/forgot-password"
                    color="text.primary"
                  >
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid> */}
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
