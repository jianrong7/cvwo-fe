import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import AuthForm from "./AuthForm";
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
  const [values, setValues] = React.useState<LoginFormState>({
    username: "",
    password: "",
    showPassword: false,
  });

  const { mutate: loginMutate } = LoginMutation();
  const { mutate: signupMutate } = SignupMutation();

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
    const payload = {
      username: values.username,
      password: values.password,
    };
    if (isLogin) {
      loginMutate(payload);
    } else {
      signupMutate(payload);
    }
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
