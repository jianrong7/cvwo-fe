import { Tooltip, IconButton, Stack, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Editor } from "@tiptap/react";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatStrikethrough,
  FormatClear,
  Code,
  DataObject,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  HorizontalRule,
  Undo,
  Redo,
  InsertPhoto,
  InsertLink,
  YouTube,
} from "@mui/icons-material";
import React from "react";
import { UseMutateFunction } from "react-query";
import { useAppSelector } from "../../../app/hooks";
import { getIsFetchingAiPost } from "../../../modules/posts/postsSlice";

interface Props {
  editor: Editor | null;
  isComment?: boolean;
  handleSubmitComment?: () => void;
  title?: string;
  mutate?: UseMutateFunction<any, unknown, any, unknown>;
}

const MenuBar: React.FC<Props> = ({
  editor,
  isComment = false,
  handleSubmitComment,
  title,
  mutate,
}) => {
  const isFetchingAiPost = useAppSelector(getIsFetchingAiPost);
  if (!editor) return null;
  return (
    <Stack
      sx={{
        padding: 1,
        border: "1px solid rgba(0,0,0,0.23)",
        borderBottom: 0,
        borderTopLeftRadius: "4px",
        borderTopRightRadius: "4px",
        flexDirection: { sx: "column", md: "row" },
        alignItems: { sx: "center", md: "unset" },
      }}
      justifyContent="space-between"
    >
      <Stack
        direction="row"
        alignContent="center"
        sx={{ flexWrap: "wrap", width: "100%" }}
      >
        <Tooltip title="Bold">
          <span>
            <IconButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              <FormatBold />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Italic">
          <span>
            <IconButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              <FormatItalic />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Underline">
          <span>
            <IconButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              disabled={!editor.can().chain().focus().toggleUnderline().run()}
              className={editor.isActive("underline") ? "is-active" : ""}
            >
              <FormatUnderlined />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Strikethrough">
          <span>
            <IconButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
            >
              <FormatStrikethrough />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Code">
          <span>
            <IconButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={!editor.can().chain().focus().toggleCode().run()}
              className={editor.isActive("code") ? "is-active" : ""}
            >
              <Code />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Clear">
          <IconButton
            onClick={() => {
              editor.chain().focus().unsetAllMarks().run();
              editor.chain().focus().clearNodes().run();
            }}
          >
            <FormatClear />
          </IconButton>
        </Tooltip>
        <Tooltip title="Bulleted list">
          <IconButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            <FormatListBulleted />
          </IconButton>
        </Tooltip>
        <Tooltip title="Numbered list">
          <IconButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            <FormatListNumbered />
          </IconButton>
        </Tooltip>
        <Tooltip title="Codeblock">
          <IconButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "is-active" : ""}
          >
            <DataObject />
          </IconButton>
        </Tooltip>
        <Tooltip title="Blockquote">
          <IconButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "is-active" : ""}
          >
            <FormatQuote />
          </IconButton>
        </Tooltip>
        <Tooltip title="Horizontal rule">
          <IconButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <HorizontalRule />
          </IconButton>
        </Tooltip>
        <Tooltip title="Undo">
          <span>
            <IconButton
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
            >
              <Undo />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Redo">
          <span>
            <IconButton
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
            >
              <Redo />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Insert image">
          <IconButton
            onClick={() => {
              const url = window.prompt("URL");
              editor
                .chain()
                .focus()
                .setImage({ src: url as string })
                .run();
            }}
          >
            <InsertPhoto />
          </IconButton>
        </Tooltip>
        <Tooltip title="Insert link">
          <IconButton
            onClick={() => {
              const previousUrl = editor.getAttributes("link").href;
              const url = window.prompt("URL", previousUrl);

              // cancelled
              if (url === null) {
                return;
              }

              // empty
              if (url === "") {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .unsetLink()
                  .run();

                return;
              }

              // update link
              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
            }}
          >
            <InsertLink />
          </IconButton>
        </Tooltip>
        <Tooltip title="Insert Youtube video">
          <IconButton
            onClick={() => {
              const url = prompt("Enter YouTube URL");

              if (url) {
                editor.commands.setYoutubeVideo({
                  src: url,
                  width: 640,
                  // Math.max(320, parseInt(widthRef.current.value, 10)) || 640,
                  height: 480,
                  // Math.max(180, parseInt(heightRef.current.value, 10)) || 480,
                });
              }
            }}
          >
            <YouTube />
          </IconButton>
        </Tooltip>
      </Stack>

      {isComment && (
        <Button
          variant="contained"
          disabled={editor?.isEmpty}
          onClick={handleSubmitComment}
        >
          Comment
        </Button>
      )}
      {!isComment && mutate && (
        <LoadingButton
          variant="contained"
          disabled={!title}
          loading={isFetchingAiPost}
          loadingIndicator="Fetching..."
          onClick={() => {
            mutate({
              maxTokens: 100,
              prompt: title,
            });
          }}
          sx={{ maxWidth: "300px" }}
        >
          Create content from title
        </LoadingButton>
      )}
    </Stack>
  );
};

export default MenuBar;
