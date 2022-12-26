import React, { useEffect } from "react";
import { Box, Button, FormControlLabel, Checkbox } from "@mui/material";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../Form/FormInput";
import { LoginMutation } from "../../api/AuthService";
import { useAppDispatch } from "../../app/hooks";
import { updateRememberMe } from "../../modules/users/userSlice";

const loginSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .max(
      32,
      "Username is too long. Username should be lesser than 32 characters."
    ),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

type LoginInput = z.TypeOf<typeof loginSchema>;

interface Props {
  handleModalClose: () => void;
}

const LoginForm: React.FC<Props> = ({ handleModalClose }) => {
  const dispatch = useAppDispatch();
  const { mutate: loginMutate } = LoginMutation("Logged in successfully!");

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    handleModalClose();
    loginMutate(values);
  };

  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(updateRememberMe(event.target.checked));
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
          <FormInput
            name="username"
            required
            label="Username"
            variant="standard"
            autoFocus
          />
          <FormInput
            name="password"
            required
            label="Password"
            type="password"
            variant="standard"
          />
          <FormControlLabel
            control={
              <Checkbox defaultChecked onChange={handleRememberMeChange} />
            }
            label="Remember me"
          />
          <Button variant="text" type="submit">
            Login
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default LoginForm;
