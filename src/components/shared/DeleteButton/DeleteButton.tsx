import { Delete } from "@mui/icons-material";
import { Tooltip, IconButton } from "@mui/material";
import React, { useState } from "react";
import { CommentDeleteMutation } from "../../../api/CommentService";
import { PostDeleteMutation } from "../../../api/PostsService";
import DeleteModal from "./DeleteModal";

interface Props {
  id: number;
  isComment?: boolean;
  postId?: number;
}
const DeleteButton: React.FC<Props> = ({ id, isComment = false, postId }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { mutate: deletePost } = PostDeleteMutation(id);
  const { mutate: deleteComment } = CommentDeleteMutation(
    id,
    postId ? postId : 0
  );

  return (
    <>
      <Tooltip title="Delete">
        <IconButton
          size="small"
          sx={{ width: "fit-content" }}
          color="primary"
          onClick={openModal}
        >
          <Delete />
        </IconButton>
      </Tooltip>
      <DeleteModal
        open={isModalOpen}
        handleClose={closeModal}
        handleDelete={isComment ? deleteComment : deletePost}
        isComment={isComment}
      />
    </>
  );
};

export default DeleteButton;
