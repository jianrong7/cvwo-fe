import * as React from "react";
import { Snackbar, Alert } from "@mui/material";
import {
  SnackbarState,
  getSnackbar,
  closeSnackbar,
} from "../../modules/snackbar/snackbarSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const SnackbarRoot: React.FC = () => {
  const snackbar = useAppSelector(getSnackbar);
  const dispatch = useAppDispatch();

  const { snackbarContent, alertSeverity, isSnackbarOpen, autoHideDuration } =
    snackbar as SnackbarState;

  const handleToastClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackbar());
  };
  return (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={autoHideDuration}
      onClose={handleToastClose}
    >
      <Alert
        onClose={handleToastClose}
        severity={alertSeverity}
        sx={{ width: "100%" }}
      >
        {snackbarContent}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarRoot;
