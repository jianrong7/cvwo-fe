import { Edit } from "@mui/icons-material";
import { Tooltip, IconButton } from "@mui/material";
import React, { useState } from "react";
import { CommentEditMutation } from "../api/CommentService";
import { PostEditMutation } from "../api/PostsService";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

interface Props {
  originalContent: string;
  isComment?: boolean;
  id: number;
  postId?: number;
}

const EditButton: React.FC<Props> = ({
  originalContent,
  isComment = false,
  id,
  postId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { mutate: editPost } = PostEditMutation(id);
  const { mutate: editComment } = CommentEditMutation(id, postId ? postId : 0);

  return (
    <>
      <Tooltip title="Edit">
        <IconButton
          size="small"
          color="primary"
          sx={{ width: "fit-content" }}
          onClick={openModal}
        >
          <Edit />
        </IconButton>
      </Tooltip>
      <EditModal
        open={isModalOpen}
        handleClose={closeModal}
        isComment={isComment}
        originalContent={originalContent}
        handleEdit={isComment ? editComment : editPost}
      />
    </>
  );
};

export default EditButton;
