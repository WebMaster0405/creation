import { Tabs, Tab, Box } from "@mui/material";
import { useLocation, useNavigate, Outlet } from "react-router";
import React, { SyntheticEvent, useEffect, useState } from "react";

const SendReciveLayout: React.FC = () => {
  const [value, setValue] = useState(0);

  const location = useLocation();

  const navigate = useNavigate();

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: 0 | 1
  ) => {
    setValue(newValue);

    if (newValue === 0) {
      navigate("/home/send");
    }

    if (newValue === 1) {
      navigate("/home/request");
    }
  };

  useEffect(() => {
    if (location.pathname === "/home/send") {
      setValue(0);
    }
    if (location.pathname === "/home/request") {
      setValue(1);
    }
  }, [location]);

  return (
    <>
      <Box display="flex" justifyContent="center" mb={4}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          sx={[
            { background: "rgba(255, 255, 64, 0.08)", borderRadius: 10 },
            {
              ".MuiTabs-indicator": {
                display: "none",
              },
            },
          ]}
        >
          <Tab
            label="Send"
            sx={[
              {
                "&.Mui-selected": {
                  borderRadius: 10,
                  background: (t) => t.palette.primary.main,
                },
              },
            ]}
          />
          <Tab
            label="Request"
            sx={[
              {
                "&.Mui-selected": {
                  borderRadius: 10,
                  background: (t) => t.palette.primary.main,
                },
              },
            ]}
          />
        </Tabs>
      </Box>
      <Outlet />
    </>
  );
};

export default SendReciveLayout;
