import { EditorContent, Editor } from "@tiptap/react";
import { Box } from "@mui/material";

import MenuBar from "./MenuBar";
import "./index.css";
import { UseMutateFunction } from "react-query";

interface Props {
  editor: Editor | null;
  isComment?: boolean;
  handleSubmitComment?: () => void;
  title?: string;
  mutate?: UseMutateFunction<any, unknown, any, unknown>;
}

const Tiptap: React.FC<Props> = ({
  editor,
  isComment,
  handleSubmitComment,
  title,
  mutate,
}) => {
  return (
    <Box>
      <MenuBar
        editor={editor}
        isComment={isComment}
        handleSubmitComment={handleSubmitComment}
        title={title}
        mutate={mutate}
      />
      <EditorContent editor={editor} />
    </Box>
  );
};

export default Tiptap;
