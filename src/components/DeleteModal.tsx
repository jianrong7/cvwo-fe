import * as React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Link,
  Box,
  Stack,
  IconButton,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { UseMutateFunction } from "react-query";

interface Props {
  open: boolean;
  handleClose: () => void;
  handleDelete: UseMutateFunction<any, unknown, void, unknown>;
  isComment: boolean;
}

const DeleteModal: React.FC<Props> = ({
  open,
  handleClose,
  handleDelete,
  isComment,
}) => {
  const handleDeleteClick = () => {
    handleDelete();
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            sx={{
              fontWeight: 700,
            }}
          >
            Delete {isComment ? "comment" : "post"}
          </Typography>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete your {isComment ? "comment" : "post"}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" autoFocus onClick={handleClose}>
          Keep
        </Button>
        <Button variant="outlined" color="error" onClick={handleDeleteClick}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
