import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import AuthForm from "./AuthForm";
import { LoginMutation } from "../../api/AuthService";
import { getCookie, setCookie } from "typescript-cookie";
import type { AxiosResponse } from "axios";

import { useAppDispatch } from "../../app/hooks";
import { updateCurrentUser } from "../../modules/users/userSlice";

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
  const [values, setValues] = React.useState<LoginFormState>({
    username: "",
    password: "",
    showPassword: false,
  });
  const dispatch = useAppDispatch();

  const handleLoginSuccess = (data: AxiosResponse<any, any>) => {
    const { data: res } = data;
    // set cookie
    setCookie("token", res.token, { expires: res.claims.exp });
    // set redux store
    dispatch(updateCurrentUser(res));
  };

  const { data, mutate } = LoginMutation(handleLoginSuccess);

  const handleChange =
    (prop: keyof LoginFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleFormSubmit = () => {
    handleClose();
    mutate({
      username: values.username,
      password: values.password,
    });
  };

  return (
    <div>
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
          <AuthForm
            values={values}
            handleChange={handleChange}
            handleClickShowPassword={handleClickShowPassword}
          />
        </DialogContent>
        <Typography sx={{ paddingX: 3, fontSize: 12 }}>
          {isLogin
            ? "No account? Create an account "
            : "Already have an account? Login "}
          <Link onClick={() => changeAuthType(isLogin)}>here</Link>!
        </Typography>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleFormSubmit}>
            {isLogin ? "Login" : "Sign up"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AuthModal;
