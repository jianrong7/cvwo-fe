import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import type { LoginFormState } from "./AuthModal";

type Props = {
  values: LoginFormState;
  handleChange: (
    prop: keyof LoginFormState
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickShowPassword: () => void;
};

const AuthForm: React.FC<Props> = ({
  values,
  handleChange,
  handleClickShowPassword,
}) => {
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { marginY: 2 },
      }}
      noValidate
      autoComplete="off"
    >
      <Stack spacing={2}>
        <TextField
          required
          id="username"
          label="Username"
          variant="standard"
          onChange={handleChange("username")}
          value={values.username}
        />
        <FormControl variant="standard">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            required
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Stack>
    </Box>
  );
};

export default AuthForm;
