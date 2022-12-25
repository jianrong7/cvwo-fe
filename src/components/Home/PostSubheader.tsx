import { Typography, Link, Avatar } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserModel } from "../../modules/users/types";
import { getBiggestTimeInterval } from "../../utils/utils";

interface Props {
  user: UserModel;
  postCreatedAt: Date;
  postUpdatedAt: Date;
}
const PostSubheader: React.FC<Props> = ({
  user,
  postCreatedAt,
  postUpdatedAt,
}) => {
  const { ID, username, profilePicture } = user;
  return (
    <Typography
      component="p"
      sx={{
        fontSize: 12,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      Posted by{" "}
      <Link
        component={RouterLink}
        to={`/user/${ID}`}
        sx={{ display: "flex", gap: 0.5, alignItems: "center" }}
      >
        <Avatar
          alt={username}
          src={
            profilePicture
              ? `https://cvwo-user-profiles.s3.ap-southeast-1.amazonaws.com/${profilePicture}`
              : "/static/images/avatar/2.jpg"
          }
          sx={{ height: 24, width: 24 }}
        />
        {username}
      </Link>
      {" · "}
      {getBiggestTimeInterval(postCreatedAt)} ago
      {postCreatedAt !== postUpdatedAt &&
        ` · Edited ${getBiggestTimeInterval(postUpdatedAt)} ago`}
    </Typography>
  );
};

export default PostSubheader;
