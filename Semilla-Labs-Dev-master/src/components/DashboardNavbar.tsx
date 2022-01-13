import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
// import DarkModeIcon from "@mui/icons-material/DarkMode";
// import LightModeIcon from "@mui/icons-material/LightMode";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Typography, Button, Menu, MenuItem, Box } from "@mui/material";

import Logo from "../assets/images/logo.png";

const DashboardNavbar: React.FC = () => {
  const [userContextMenuEl, setUserContextMenuEl] =
    useState<null | HTMLElement>(null);

  const isUserContextMenuOpen = Boolean(userContextMenuEl);

  const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserContextMenuEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserContextMenuEl(null);
  };

  const [accountsContextMenuEl, setAccountsContextMenuEl] =
    useState<null | HTMLElement>(null);

  const isAccountContextMenuOpen = Boolean(accountsContextMenuEl);

  const handleAccountMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAccountsContextMenuEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountsContextMenuEl(null);
  };

  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      gap={2}
      alignItems="center"
      py={2}
      mb={{ xs: 2, md: 12 }}
    >
      <Box flex="1" order={1}>
        <Box
          component="img"
          src={Logo}
          alt="Conceal Protocol"
          width={{ xs: "150px", lg: "180px" }}
          height="auto"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
        />
      </Box>

      <Box
        display="flex"
        flex="1"
        justifyContent="center"
        gap={2}
        order={{ xs: 3, md: 2 }}
      >
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Typography
            color="text.primary"
            sx={[
              {
                "&:hover": { color: "primary.main" },
              },
            ]}
          >
            Portfolio
          </Typography>
        </Link>

        <Link to="/home/send" style={{ textDecoration: "none" }}>
          <Typography
            color="text.primary"
            sx={[
              {
                "&:hover": { color: "primary.main" },
              },
            ]}
          >
            Send & Request
          </Typography>
        </Link>

        {/* <Link to="/home" style={{ textDecoration: "none" }}>
          <Typography
            color="text.primary"
            sx={[
              {
                "&:hover": { color: "primary.main" },
              },
            ]}
          >
            Docs
          </Typography>
        </Link> */}
      </Box>

      <Box
        display="flex"
        flex="1"
        justifyContent="flex-end"
        gap={2}
        order={{ xs: 2, md: 3 }}
      >
        {/* <Box>
          <Button
            color="primary"
            sx={{ background: "rgba(255, 255, 64, 0.08)" }}
            onClick={() => {
              dispatch({ type: "toggleDarkMode" });
            }}
          >
            {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
          </Button>
        </Box> */}

        <Box>
          <Button
            color="primary"
            sx={{ background: "rgba(255, 255, 64, 0.08)" }}
            onClick={handleAccountMenuClick}
          >
            <LanguageIcon />
            <Box component="span" ml={1}>
              Celo
            </Box>
          </Button>

          <Menu
            anchorEl={accountsContextMenuEl}
            open={isAccountContextMenuOpen}
            onClose={handleAccountMenuClose}
          >
            <MenuItem onClick={handleAccountMenuClose}>Celo</MenuItem>
            <MenuItem onClick={handleAccountMenuClose}>Fantom</MenuItem>
            {/* <MenuItem onClick={handleAccountMenuClose}>Avalanche</MenuItem> */}
            {/* <MenuItem onClick={handleAccountMenuClose}>Polygon</MenuItem> */}
            <MenuItem onClick={handleAccountMenuClose}>Ethereum</MenuItem>
          </Menu>
        </Box>

        <Box>
          <Button
            color="primary"
            sx={{ background: "rgba(255, 255, 64, 0.08)" }}
            onClick={handleUserMenuClick}
          >
            <PersonOutlineIcon />
            <Box component="span" ml={1}>
              0xc64b..8b4c7
            </Box>
          </Button>

          <Menu
            anchorEl={userContextMenuEl}
            open={isUserContextMenuOpen}
            onClose={handleUserMenuClose}
          >
            <MenuItem onClick={handleUserMenuClose}>
              <PersonOutlineIcon />
              <Box component="span" ml={1}>
                0xc64bd05b4146..bf1607af8b4c7
              </Box>
            </MenuItem>
            <MenuItem onClick={handleUserMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardNavbar;
