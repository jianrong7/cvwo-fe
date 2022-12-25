import * as React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography as TypographyMUI,
  Box,
  Stack,
  IconButton,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { UseMutateFunction } from "react-query";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { useEditor } from "@tiptap/react";
import Typography from "@tiptap/extension-typography";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import RichTextEditor from "../../Form/RichTextEditor";

interface EditInput {
  content: string;
}

interface Props {
  open: boolean;
  handleClose: () => void;
  handleEdit: UseMutateFunction<any, unknown, void, unknown>;
  isComment: boolean;
  originalContent: string;
}

const EditModal: React.FC<Props> = ({
  open,
  handleClose,
  handleEdit,
  isComment,
  originalContent,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Placeholder,
      Underline,
      Youtube,
      Link,
      Image,
    ],
    content: originalContent,
  });

  const handleEditClick = () => {
    handleEdit({ content: editor?.getHTML() } as any);
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl">
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <TypographyMUI
            sx={{
              fontWeight: 700,
            }}
          >
            Edit {isComment ? "comment" : "post"}
          </TypographyMUI>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <RichTextEditor editor={editor} />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="outlined" color="info" onClick={handleEditClick}>
          Save edits
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
