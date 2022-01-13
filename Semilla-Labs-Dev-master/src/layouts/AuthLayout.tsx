import React from "react";
import { Grid, Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import HeroSvg from "../assets/images/hero.png";

const AuthLayout: React.FC = () => {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid item xs={12} sm={8} md={6}>
        <Outlet />
      </Grid>

      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        display={{ xs: "none", sm: "flex" }}
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundRepeat: "no-repeat",
          backgroundColor: "#fcfdbf",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box height="auto" width="500px" p={2}>
          <Box
            width="100%"
            height="auto"
            component="img"
            alt="Now they see it, now they don’t"
            src={HeroSvg}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
