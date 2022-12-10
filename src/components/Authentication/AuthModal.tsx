import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Link,
  Box,
} from "@mui/material";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { LoginMutation, SignupMutation } from "../../api/AuthService";
// POSSIBLE FEATURE: Auto login after signup
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
  // React.useEffect(() => {
  //   const keyDownHandler = (e: KeyboardEvent) => {
  //     if (e.key === "Enter") {
  //       e.preventDefault();
  //       handleFormSubmit();
  //     }
  //   };
  //   document.addEventListener("keydown", keyDownHandler);
  //   return () => {
  //     document.removeEventListener("keydown", keyDownHandler);
  //   };
  // }, []);

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
        <DialogTitle>{isLogin ? "Login" : "Sign up"}</DialogTitle>
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
        <Typography sx={{ padding: 3, marginTop: -4, fontSize: 14 }}>
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
        </Typography>
        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleFormSubmit}>
            {isLogin ? "Login" : "Sign up"}
          </Button>
        </DialogActions> */}
      </Dialog>
    </Box>
  );
};

export default AuthModal;
