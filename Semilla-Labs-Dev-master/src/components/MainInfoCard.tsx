import React from "react";
import { Button, Typography, Box } from "@mui/material";

const MainInfoCard: React.FC<{
  title: string;
  image: string;
}> = ({ title, image, children }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <img
        src={image}
        alt={title}
        width="200"
        height="200"
        style={{ objectFit: "cover" }}
      />

      <Button
        variant="outlined"
        color="primary"
        disableElevation
        component="div"
        fullWidth
        sx={{
          display: "block",
          px: 2,
          py: 3,
          textTransform: "capitalize",
        }}
      >
        <Typography
          variant="h6"
          color="primary"
          mb={1}
          sx={{ textTransform: "uppercase" }}
        >
          {title}
        </Typography>

        {children}
      </Button>
    </Box>
  );
};

export default MainInfoCard;
