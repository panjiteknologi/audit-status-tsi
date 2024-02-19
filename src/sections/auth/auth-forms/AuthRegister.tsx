import { MouseEvent, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import IconButton from '@/components/@extended/IconButton';
import AnimateButton from '@/components/@extended/AnimateButton';

import useAuth from '@/hooks/useAuth';
import useScriptRef from '@/hooks/useScriptRef';
import { openSnackbar } from '@/api/snackbar';
import { strengthColor, strengthIndicator } from '@/utils/password-strength';

// assets
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';

// ============================|| JWT - REGISTER ||============================ //

const AuthRegister = () => {
  const { register } = useAuth();
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();

  const [level, setLevel] = useState<{ label: string, color: string }>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);
  // country_id, email, group_category_id, mobile_number, password, password_confirmation
  return (
    <>
      <Formik
        initialValues={{
          country_id: '+62',
          email: '',
          group_category_id: '',
          mobile_number: '',
          password: '',
          password_confirmation: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          country_id: Yup.string().max(3),
          email: Yup.string().email('Harus Email yang benar').max(255).required('Email diwajibkan'),
          group_category_id: Yup.string().max(50),
          mobile_number: Yup.string().max(100).required('Nomor HP diwajibkan'),
          password: Yup.string().max(100).required('Password diwajibkan'),
          password_confirmation: Yup.string().max(100).required('Konfirmasi Password diwajibkan').oneOf([Yup.ref('password')], 'Konfirmasi Passwords harus sama')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await register(values.country_id, values.email, values.group_category_id, values.mobile_number, values.password, values.password_confirmation);
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
              openSnackbar({
                open: true,
                message: 'Your registration has been successfully completed.',
                variant: 'alert',
                alert: {
                  color: 'success',
                }
              });

              setTimeout(() => {
                navigate('/login', { replace: true });
              }, 1500);
            }
          } catch (err: any) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Alamat Email"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-signup">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lastname-signup">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="helper-text-password-signup">
                    {errors.password}
                  </FormHelperText>
                )}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password_confirmation-signup">Konfirmasi Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="password_confirmation-signup"
                    value={values.password_confirmation}
                    name="password_confirmation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.password_confirmation && errors.password_confirmation)}
                  />
                </Stack>
                {touched.password_confirmation && errors.password_confirmation && (
                  <FormHelperText error id="helper-text-password_confirmation-signup">
                    {errors.password_confirmation}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="mobile_number-signup">Nomor Hp</InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="mobile_number-login"
                    type="text"
                    value={values.mobile_number}
                    name="mobile_number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="0812..."
                    error={Boolean(touched.mobile_number && errors.mobile_number)}
                  />
                </Stack>
                {touched.mobile_number && errors.mobile_number && (
                  <FormHelperText error id="helper-text-mobile_number-signup">
                    {errors.mobile_number}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Buat Akun
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

export default AuthRegister;
