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
} from "@mui/material";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import CloseIcon from "@mui/icons-material/Close";

export interface LoginFormState {
  username: string;
  password: string;
  showPassword?: boolean;
}

interface Props {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  changeAuthType: (isLogin: boolean) => void;
  isLogin?: boolean;
}

const AuthModal: React.FC<Props> = ({
  open,
  handleOpen,
  handleClose,
  changeAuthType,
  isLogin = false,
}) => {
  return (
    <Box>
      <Button
        variant="outlined"
        onClick={handleOpen}
        sx={{
          fontWeight: 700,
          color: "inherit",
        }}
      >
        {isLogin ? "Login" : "Sign up"}
      </Button>
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
              {isLogin ? "Login" : "Sign up"}
            </Typography>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isLogin ? "Login" : "Sign up"} here to participate in the forum.
          </DialogContentText>
          {isLogin ? (
            <LoginForm handleModalClose={handleClose} />
          ) : (
            <RegisterForm handleModalClose={handleClose} />
          )}
        </DialogContent>
        <Typography sx={{ padding: 3, marginTop: -4, fontSize: 12 }}>
          {isLogin
            ? "No account? Create an account "
            : "Already have an account? Login "}
          <Link
            onClick={() => changeAuthType(isLogin)}
            sx={{ cursor: "pointer" }}
          >
            here
          </Link>
          !
          <br />
          {!isLogin &&
            "You will be automatically logged in and remembered after registering."}
        </Typography>
      </Dialog>
    </Box>
  );
};

export default AuthModal;
