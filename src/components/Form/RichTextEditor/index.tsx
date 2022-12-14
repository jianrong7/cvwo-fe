import { EditorContent, Editor } from "@tiptap/react";
import { Box } from "@mui/material";

import MenuBar from "./MenuBar";
import "./index.css";

interface Props {
  editor: Editor | null;
  isComment?: boolean;
  handleSubmitComment?: () => void;
}

const Tiptap: React.FC<Props> = ({
  editor,
  isComment,
  handleSubmitComment,
}) => {
  return (
    <Box>
      <MenuBar
        editor={editor}
        isComment={isComment}
        handleSubmitComment={handleSubmitComment}
      />
      <EditorContent editor={editor} />
    </Box>
  );
};

export default Tiptap;
