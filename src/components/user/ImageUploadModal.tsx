import React, { useState } from "react";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { FileUpload } from "@mui/icons-material";
import { useAppSelector } from "../../app/hooks";
import { getUserData } from "../../modules/users/userSlice";
import { UserUploadPicture } from "../../api/UserService";

const ImageUploadModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [images, setImages] = useState<ImageListType[]>([]);
  const userData = useAppSelector(getUserData);

  const ID = userData?.ID || 0;

  const { mutate: uploadToS3 } = UserUploadPicture(ID.toString());

  const handleClose = () => {
    setImages([]);
    setOpen(false);
  };

  const onChange = (imageList: ImageListType) => {
    setImages(imageList as never[]);
  };

  const handleUpload = () => {
    const form = new FormData();
    const { file } = images[0] as ImageType;
    form.append("image", file as File);
    uploadToS3(form);
    handleClose();
  };

  return (
    <Box>
      <Button onClick={() => setOpen(true)}>Change profile picture</Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Upload your profile picture here</DialogTitle>
        <DialogContent>
          <ImageUploading
            value={images}
            onChange={onChange}
            acceptType={["jpg", "png"]}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              isDragging,
              dragProps,
            }) => (
              <>
                {images.length === 1 ? (
                  <>
                    {imageList.map((image, index) => (
                      <Box key={index}>
                        <img src={image["dataURL"]} alt="" width="100" />
                      </Box>
                    ))}
                  </>
                ) : (
                  <Box
                    sx={{
                      minHeight: "200px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "4px dashed #808080",
                      borderRadius: 2,
                      marginY: 2,
                    }}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    {isDragging ? <FileUpload /> : "Click or drop here"}
                  </Box>
                )}
                <Button onClick={handleClose}>Cancel</Button>
                {images.length === 1 && (
                  <>
                    <Button onClick={onImageRemoveAll}>Remove image</Button>
                    <Button onClick={handleUpload}>Upload image</Button>
                  </>
                )}
              </>
            )}
          </ImageUploading>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ImageUploadModal;
