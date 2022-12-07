import * as React from "react";
import Stack from "@mui/material/Stack";

import AuthModal from "./AuthModal";

const Authentication = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] =
    React.useState<boolean>(false);
  const [isSignupModalOpen, setIsSignupModalOpen] =
    React.useState<boolean>(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const changeAuthType = (isLogin: boolean) => {
    if (isLogin) {
      closeLoginModal();
      openSignupModal();
    } else {
      closeSignupModal();
      openLoginModal();
    }
  };

  return (
    <Stack direction="row">
      <AuthModal
        open={isLoginModalOpen}
        handleOpen={openLoginModal}
        handleClose={closeLoginModal}
        changeAuthType={changeAuthType}
        isLogin
      />
      <AuthModal
        open={isSignupModalOpen}
        handleOpen={openSignupModal}
        handleClose={closeSignupModal}
        changeAuthType={changeAuthType}
      />
    </Stack>
  );
};

export default Authentication;
