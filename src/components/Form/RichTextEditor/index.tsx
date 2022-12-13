import { useEditor, EditorContent, Editor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import CodeBlock from "@tiptap/extension-code-block";
import Youtube from "@tiptap/extension-youtube";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";

import CodeBlockComponent from "./CodeBlockComponent";
import "./index.css";

interface Props {
  editor: Editor | null;
}

const Tiptap: React.FC<Props> = ({ editor }) => {
  console.log(editor?.getHTML());
  // if (!editor) return null;
  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
