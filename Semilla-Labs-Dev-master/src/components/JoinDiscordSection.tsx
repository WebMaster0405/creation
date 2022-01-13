import React from "react";
import { Typography, Button, Box } from "@mui/material";

const JoinDiscordSection: React.FC = () => {
  return (
    <Box
      py={{ xs: 4, md: 8 }}
      px={{ xs: 6, md: 16 }}
      mb={16}
      display="flex"
      justifyContent="space-between"
      flexDirection={{ xs: "column", sm: "row" }}
      gap={{ xs: 2, md: 0 }}
      sx={{
        backgroundColor: "#ffffe6",
        borderRadius: "8px",
      }}
    >
      <Box sx={{ flexBasis: "350px" }} flex={{ xs: 1 }}>
        <Typography variant="h4" mb={4} component="div" color="secondary">
          Lorem, ipsum dolor.
        </Typography>
        <Typography variant="body2" mb={4} component="div" color="secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
          accusantium facere doloribus illum odio voluptas natus dolores labore
          ipsam tempore.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          sx={{ borderRadius: 25 }}
        >
          Join Discord
        </Button>
      </Box>
      <Box
        display="flex"
        justifyContent={{ xs: "center", sm: "flex-end" }}
        alignItems="center"
        flex={{ xs: 1 }}
      >
        <Box height="250px" width="250px">
          <img
            width="100%"
            height="auto"
            src="https://via.placeholder.com/250"
            alt="lorem"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default JoinDiscordSection;
