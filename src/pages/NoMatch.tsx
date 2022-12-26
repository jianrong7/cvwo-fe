import React from "react";
import Box from "@mui/material/Box";

const NoMatch: React.FC = () => {
  return (
    <Box sx={{ fontSize: 32, fontWeight: 700, marginTop: 8 }}>
      ERROR 404: Page not found.
    </Box>
  );
};

export default NoMatch;
