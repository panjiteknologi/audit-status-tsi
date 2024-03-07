/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, ReactNode } from "react";

// material-ui
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";

// project import
import useConfig from "@/hooks/useConfig";
import Palette from "./palette";
import Typography from "./typography";
import CustomShadows from "./shadows";
import componentsOverride from "./overrides";

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

export default function ThemeCustomization({
  children,
}: {
  children: ReactNode;
}) {
  const theming = useTheme();
  const { themeDirection, fontFamily } = useConfig();
  const themeMode: "light" | "dark" = "light"; // Or assign it the appropriate value based on your configuration
  const theme = useMemo(() => Palette(themeMode), [themeMode]);

  const themeTypography = useMemo(
    () => Typography(fontFamily),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fontFamily]
  );
  const themeCustomShadows = useMemo(
    () => CustomShadows(themeMode, theming),
    [themeMode, theming]
  );

  const themeOptions: any = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1440,
        },
      },
      direction: themeDirection,
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography,
    }),
    [themeDirection, theme, themeTypography, themeCustomShadows]
  );

  const themes = createTheme(themeOptions);
  themes.components = componentsOverride(themes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
