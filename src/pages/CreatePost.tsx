import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import Youtube from "@tiptap/extension-youtube";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";

import { PostAiMutation, PostMutation } from "../api/PostsService";
import FormInput from "../components/Form/FormInput";
import TagsInput, { TagsState } from "../components/Form/TagsInput";
import RichTextEditor from "../components/Form/RichTextEditor";
import { useAppSelector } from "../app/hooks";
import { getAiPost } from "../modules/posts/postsSlice";

// allow local image upload feature
const postSchema = z.object({
  title: z.string().nonempty("Title is required"),
  // content: z.string(),
  // tags: z.array(z.string()).max(3, "Maximum of 3 tags allowed").optional(),
});

export type PostInput = z.TypeOf<typeof postSchema>;

const CreatePost: React.FC = () => {
  const aiData = useAppSelector(getAiPost);
  const { mutate: fetchAi } = PostAiMutation();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Placeholder.configure({ placeholder: "Content" }),
      Underline,
      Youtube,
      Link,
      Image,
    ],
  });

  const [tagsState, setTagsState] = useState<TagsState>({
    inputError: "",
    activeTags: [],
    disableAdditionalTags: false,
  });
  const { mutate: createPost } = PostMutation();

  const methods = useForm<PostInput>({
    resolver: zodResolver(postSchema),
  });
  const { handleSubmit, watch } = methods;

  useEffect(() => {
    if (aiData) {
      editor?.commands.setContent(`<p>${aiData}</p>`);
    }
    // eslint-disable-next-line
  }, [aiData]);

  useEffect(() => {
    if (tagsState.activeTags.length >= 3) {
      setTagsState({ ...tagsState, disableAdditionalTags: true });
    } else {
      setTagsState({ ...tagsState, disableAdditionalTags: false });
    } // eslint-disable-next-line
  }, [tagsState.activeTags]);

  const onSubmitHandler: SubmitHandler<PostInput> = (values) => {
    const payload = {
      title: values.title,
      content: editor?.getHTML() as string,
      tags: tagsState.activeTags,
    };
    createPost(payload);
  };

  const handleTagsChange: (
    options: React.SyntheticEvent,
    value: string[]
  ) => void = (_, value) => {
    if (value.length > 3) {
      setTagsState({
        ...tagsState,
        inputError: "Too many tags. Please remove some before adding.",
      });
    } else {
      setTagsState({
        ...tagsState,
        inputError: "",
      });
    }
    setTagsState({ ...tagsState, activeTags: value });
    handleSubmit(onSubmitHandler);
  };

  return (
    <Box>
      <FormProvider {...methods}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmitHandler)}
          sx={{ display: "flex", flexDirection: "column", gap: 2, marginY: 2 }}
        >
          <FormInput name="title" required label="Title" autoFocus />
          <RichTextEditor
            editor={editor}
            title={watch("title")}
            mutate={fetchAi}
          />
          <TagsInput tagsState={tagsState} handleChange={handleTagsChange} />
          <Button
            variant="contained"
            type="submit"
            sx={{ minWidth: "200px", alignSelf: "center" }}
          >
            Submit
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default CreatePost;
