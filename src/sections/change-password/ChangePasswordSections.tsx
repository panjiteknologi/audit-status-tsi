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
import IconButton from "@/components/@extended/IconButton";
import AnimateButton from "@/components/@extended/AnimateButton";

// assets
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import axios from "axios";
import { BASE_URL, CHANGE_PASSWORD } from "@/contexts/JWTContext";

// ============================|| JWT - LOGIN ||============================ //

interface ChangePasswordSectionsProps {
  setError: Dispatch<SetStateAction<boolean>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setTitleMessage: Dispatch<SetStateAction<string>>;
  setMessage: Dispatch<SetStateAction<string>>;
}

const ChangePasswordSections = ({
  setError,
  setShowModal,
  setTitleMessage,
  setMessage,
}: ChangePasswordSectionsProps) => {
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
          password: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string()
            .matches(
              /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/,
              "Password must contain at least one number and one special character"
            )
            .min(8)
            .required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          const token = window.localStorage.getItem("serviceToken");
          const id = window.localStorage.getItem("idEmployee");

          const params = {
            master_employee_id: id,
            new_password: values.password,
          };

          try {
            const response = await axios.post(
              BASE_URL + CHANGE_PASSWORD,
              params,
              {
                headers: {
                  Authorization: token,
                },
              }
            );

            if (response) {
              setShowModal(true);
              setError(false);
              setStatus({ success: true });
              setSubmitting(false);
              setTitleMessage(
                "Congratulations! You have successfully changed your password."
              );
              setMessage("Your password has been successfully changed.");
            }
          } catch (err: any) {
            setShowModal(true);
            setError(true);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
            setTitleMessage(
              "Sorry, you haven't successfully changed your password.."
            );
            setMessage(
              err?.data?.message || "Please try again in a few moments!"
            );
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
                    Change Password
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

export default ChangePasswordSections;
