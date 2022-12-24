import { Box, Avatar, Typography } from "@mui/material";
import React from "react";

interface Props {
  username: string;
}

const SideBar: React.FC<Props> = ({ username }) => {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 20,
        height: "fit-content",
        flex: 1,
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
        paddingY: 2,
        border: "1px solid",
        borderColor: "#0288d1",
        borderRadius: 2,
      }}
    >
      <Avatar
        alt={username}
        src="/static/images/avatar/2.jpg"
        sx={{ height: 52, width: 52 }}
      />
      <Typography sx={{ fontSize: 18, fontWeight: 600 }}>{username}</Typography>
    </Box>
  );
};

export default SideBar;
