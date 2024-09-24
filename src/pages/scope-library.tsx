import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import useAuth from "@/hooks/useAuth";
import ScopeLibrarySections from "@/sections/scope-library";
import { ITEMS } from "@/constant/scope";

const ScopeLibrary = () => {
  const { isLoggedIn } = useAuth();

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        {isLoggedIn && (
          <Typography variant="h4">
            Audit Status System - Scope Library
          </Typography>
        )}
      </Box>

      <ScopeLibrarySections items={ITEMS} />
    </React.Fragment>
  );
};

export default ScopeLibrary;
