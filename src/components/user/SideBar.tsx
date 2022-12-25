import { Card, Avatar, Typography, CircularProgress } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { getCurrentUser, getUserData } from "../../modules/users/userSlice";
import ImageUploadModal from "./ImageUploadModal";

const SideBar: React.FC = () => {
  const userData = useAppSelector(getUserData);
  const curUser = useAppSelector(getCurrentUser);

  if (!userData) return <CircularProgress />;

  const { username, CreatedAt } = userData;
  return (
    <Card
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
      }}
    >
      <Avatar
        alt={username}
        src={
          curUser?.profilePicture
            ? `https://cvwo-user-profiles.s3.ap-southeast-1.amazonaws.com/${curUser?.profilePicture}`
            : "/static/images/avatar/2.jpg"
        }
        sx={{ height: 52, width: 52 }}
      />
      <Typography sx={{ fontSize: 18, fontWeight: 600 }}>{username}</Typography>
      {curUser?.username === username && <ImageUploadModal />}
      <Typography>
        Cake day: {format(new Date(CreatedAt), "dd MMM, yyyy")}
      </Typography>
    </Card>
  );
};

export default SideBar;
