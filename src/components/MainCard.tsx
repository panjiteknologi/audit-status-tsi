/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, forwardRef, Ref } from "react";

// material-ui
import { SxProps, useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";

// project import
import { ThemeMode } from "@/config";

// header style
const headerSX = {
  p: 1,
  paddingX: 2,
  "& .MuiCardHeader-action": { m: "0px auto", alignSelf: "center" },
};

// ==============================|| CUSTOM - MAIN CARD ||============================== //

interface MainCardProps {
  border?: boolean;
  boxShadow?: boolean;
  children?: ReactNode;
  subheader?: ReactNode | string;
  content?: boolean;
  darkTitle?: boolean;
  divider?: boolean;
  elevation?: number;
  secondary?: any;
  shadow?: string;
  sx?: SxProps;
  title?: string | number;
  modal?: boolean;
  showButton?: ReactNode;
  iconRight?: ReactNode;
  btnHeader?: ReactNode;
  titleBtnHeader?: string | number | undefined;
  bgHeaderColor?: string;
  isLogin?: boolean;
}

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      subheader,
      content = true,
      darkTitle,
      divider = true,
      elevation,
      secondary,
      shadow,
      sx = {},
      title,
      modal = false,
      showButton,
      iconRight,
      btnHeader,
      titleBtnHeader,
      bgHeaderColor,
      isLogin,
      ...others
    }: MainCardProps,
    ref: Ref<any>
  ) => {
    const theme = useTheme();
    boxShadow =
      theme.palette.mode === ThemeMode.DARK ? boxShadow || true : boxShadow;

    return (
      <Card
        elevation={elevation || 0}
        ref={ref}
        {...others}
        sx={{
          position: "relative",
          border: border ? "1px solid" : "none",
          borderRadius: 4,
          borderColor:
            theme.palette.mode === ThemeMode.DARK
              ? theme.palette.divider
              : theme.palette.grey.A800,
          boxShadow:
            boxShadow && (!border || theme.palette.mode === ThemeMode.DARK)
              ? shadow || theme.customShadows?.z1
              : "inherit",
          ":hover": {
            boxShadow: boxShadow
              ? shadow || theme.customShadows?.z1
              : "inherit",
          },
          ...(modal && {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: `calc( 100% - 50px)`, sm: "auto" },
            "& .MuiCardContent-root": {
              overflowY: "auto",
              minHeight: "auto",
              maxHeight: `calc(100vh - 200px)`,
            },
          }),
          ...sx,
        }}
      >
        {isLogin && (
          <React.Fragment>
            {btnHeader && (
              <React.Fragment>
                <Box
                  sx={
                    showButton
                      ? {
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          backgroundColor: bgHeaderColor,
                          justifyContent: "space-between",
                        }
                      : {
                          backgroundColor: bgHeaderColor,
                        }
                  }
                >
                  <CardHeader
                    sx={{
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 1,
                      paddingX: 2,
                      "& .MuiCardHeader-action": {
                        m: "0px auto",
                        alignSelf: "center",
                      },
                    }}
                    titleTypographyProps={{ variant: "subtitle1" }}
                    title={
                      <Box
                        sx={{
                          flexDirection: "row",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            textAlign: "center",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          {titleBtnHeader}
                        </Typography>
                        <Box sx={{ paddingLeft: 0.5 }}>{iconRight}</Box>
                      </Box>
                    }
                    action={secondary}
                    subheader={subheader}
                  />

                  {showButton}
                </Box>
                <Divider />
              </React.Fragment>
            )}
          </React.Fragment>
        )}

        {/* card header and action */}
        {!darkTitle && title && (
          <Box
            sx={
              showButton
                ? {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }
                : null
            }
          >
            <CardHeader
              sx={headerSX}
              titleTypographyProps={{ variant: "subtitle1" }}
              title={<Typography variant="h4">{title}</Typography>}
              action={secondary}
              subheader={subheader}
            />
            {showButton}
          </Box>
        )}

        {darkTitle && title && (
          <CardHeader
            sx={headerSX}
            title={<Typography variant="h4">{title}</Typography>}
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && divider && <Divider />}

        {/* card content */}
        {content && (
          <CardContent
            sx={{
              paddingY: 2,
              paddingX: 2,
              "& .MuiCardHeader-action": { m: "0px auto", alignSelf: "center" },
            }}
          >
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

export default MainCard;
