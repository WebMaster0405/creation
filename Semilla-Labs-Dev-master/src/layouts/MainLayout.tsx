import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MainLayout: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Navbar />

      <Outlet />

      <Footer />
    </Container>
  );
};

export default MainLayout;
