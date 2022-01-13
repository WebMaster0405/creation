import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import {
  Typography,
  TextField,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { userAccountLoaded, userCryptoLoaded } from "../../store/actions";

const Web3 = require("web3");

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [privateKey, setPrivateKey] = useState("");
  const [password, setPassword] = useState("");
  const [openPasswordDialog, setOpen] = useState(false);

  const dispatch = useDispatch();

  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:8545")
  );

  const serialisedUserCrypto = localStorage.getItem("userCrypto");
  let userCrypto: any;

  const [loginWithPassword, setLoginWithPassword] = useState(
    serialisedUserCrypto != null ? true : false
  );

  if (serialisedUserCrypto != null) {
    userCrypto = JSON.parse(serialisedUserCrypto);
  }

  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const encryptPrivateKey = () => {
    const keystoreJsonV3 = web3.eth.accounts.encrypt(privateKey, password);
    localStorage.setItem("userCrypto", JSON.stringify(keystoreJsonV3));
    navigate("/home");
  };

  const onLoginHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loginWithPassword) {
      try {
        const account = web3.eth.accounts.decrypt(userCrypto, password);
        localStorage.setItem("userPrivateKey", account.privateKey);
        dispatch(userAccountLoaded(account.address));
        navigate("/home");
      } catch (e) {
        enqueueSnackbar("Incorrect password, please try again", {
          variant: "error",
          anchorOrigin: { horizontal: "center", vertical: "top" },
        });
      }
    } else {
      try {
        const account = web3.eth.accounts.privateKeyToAccount(
          "0x" + privateKey
        );
        localStorage.setItem("userPrivateKey", privateKey);
        dispatch(userAccountLoaded(account.address));
        handleClickOpen();
      } catch (e) {
        enqueueSnackbar("Please enter a valid private key!", {
          variant: "error",
          anchorOrigin: { horizontal: "center", vertical: "top" },
        });
      }
    }
  };

  const onLogoutHandler = () => {
    setLoginWithPassword(false);
    localStorage.removeItem("userCrypto");
    localStorage.removeItem("userPrivateKey");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      px={{ xs: 2, sm: 4, md: 6, lg: 12 }}
      height="100%"
    >
      <Typography component="h1" variant="h5">
        Log In
      </Typography>

      <Typography component="p" variant="body2" color="text-secondary">
        {!loginWithPassword
          ? "Enter your Conceal Protocol account"
          : "Enter your password to unlock your Conceal Protocol wallet"}
      </Typography>

      <Box component="form" onSubmit={onLoginHandler} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          type={loginWithPassword ? "password" : ""}
          label={loginWithPassword ? "Password" : "Private Key"}
          value={loginWithPassword ? password : privateKey}
          onChange={(v) => {
            loginWithPassword
              ? setPassword(v.target.value)
              : setPrivateKey(v.target.value);
          }}
          placeholder={
            loginWithPassword ? "Enter password" : "Enter your private key"
          }
          InputLabelProps={{
            style: { color: "#fff" },
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Log In
        </Button>
        {loginWithPassword ? (
          <Button
            fullWidth
            onClick={() => {
              onLogoutHandler();
            }}
            variant="outlined"
            sx={{ mt: 1, mb: 1 }}
          >
            Log Out
          </Button>
        ) : (
          <div></div>
        )}

        <Box
          my={3}
          textAlign="center"
          sx={{
            position: "relative",
            height: 10,
            borderBottom: ".1px solid #ccc",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              backgroundColor: "background.paper",
              top: -8,
              py: 0.5,
              px: 1,
              display: "inline-block",
              color: "white",
            }}
          >
            Or
          </Box>
        </Box>

        <Link to="/account/create" style={{ textDecoration: "none" }}>
          <Button
            component="div"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >
            Create A Wallet
          </Button>
        </Link>
        {loginWithPassword ? (
          <div></div>
        ) : (
          <Typography component="p" variant="body2" color="text-secondary">
            *Your key never leaves the browser and stays encrypted. If this is
            your first time here, you are encouraged to create a new Conceal
            Protocol wallet rather than use a private key from an existing
            wallet.
          </Typography>
        )}
      </Box>
      <Dialog open={openPasswordDialog} onClose={handleClose}>
        <DialogTitle>Enter account password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a password to encrypt and save your private key to local
            storage.
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            label="Password"
            type="password"
            onChange={(v) => {
              setPassword(v.target.value);
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={encryptPrivateKey} variant="contained">
            Enter
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountPage;
