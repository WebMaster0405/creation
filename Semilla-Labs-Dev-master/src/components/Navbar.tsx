import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

import Logo from "../assets/images/logo.png";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar elevation={0} position="static" sx={{ py: 2, mb: 8 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        disableGutters
      >
        <Box
          component="img"
          src={Logo}
          alt="Conceal Protocol"
          width={{ xs: "100px", md: "150px", lg: "180px" }}
          height="auto"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />

        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Link to="/lorem1" style={{ textDecoration: "none" }}>
            <Button>conceal protocol</Button>
          </Link>
          <Button sx={{ display: { xs: "none", sm: "block" } }} href="https://twitter.com/concealprotocol" target="blank">twitter </Button>
          {/* <Link to="/lorem2" style={{ textDecoration: "none" }}> */}
            <Button href="https://t.me/Monero0xMR" target="blank">Telegram </Button>
          {/* </Link> */}
          <Link to="/account" style={{ textDecoration: "none" }}>
            <Button color="primary" variant="contained" disableElevation>
              <Typography fontWeight="bold">Launch App</Typography>
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
