import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Typography,
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSnackbar } from "notistack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { userAccountLoaded, userCryptoLoaded } from "../../store/actions";
const Web3 = require("web3");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
let account = web3.eth.accounts.create(web3.utils.randomHex(32));

const AccountCreatePage: React.FC = () => {
  const dispatch = useDispatch();

  console.log("here", account.privateKey);
  const [privateKeyBackedUp, setPrivateKeyBackedUp] = useState(false);
  const [password, setPassword] = useState("");
  const [privateKey] = useState(account.privateKey.slice(2));
  const [openPasswordDialog, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const encryptPrivateKey = () => {
    const keystoreJsonV3 = web3.eth.accounts.encrypt(privateKey, password);
    localStorage.setItem("userCrypto", JSON.stringify(keystoreJsonV3));
    localStorage.setItem("userPrivateKey", privateKey);
    dispatch(userAccountLoaded(account.address));
    navigate("/home");
  };

  const { enqueueSnackbar } = useSnackbar();

  const onCopyPrivateKey = () => {
    navigator.clipboard.writeText(privateKey);

    enqueueSnackbar("Copied to clipboard", {
      variant: "success",
      anchorOrigin: { horizontal: "center", vertical: "top" },
    });
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        px={{ xs: 2, sm: 4, md: 6, lg: 12 }}
        height="100%"
      >
        <Typography component="h1" variant="h5" mb={2}>
          Secure your conceal protocol private key
        </Typography>

        <Typography component="p" variant="body2" color="text-secondary">
          Copy this key down in a safe location. This key hides your balance and
          authorized transactions. You cannot recover your wallet if this key is
          lost.
        </Typography>

        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            value={privateKey}
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={onCopyPrivateKey}
                    aria-label="copy private key"
                    edge="end"
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={<Checkbox checked={privateKeyBackedUp} color="primary" />}
            label="I backed up my private key"
            onChange={() => setPrivateKeyBackedUp((i) => !i)}
          />

          <Box display="flex" justifyContent="center" gap={1}>
            <Link to="/account" style={{ textDecoration: "none" }}>
              <Button component="div" variant="outlined" sx={{ mt: 3, mb: 2 }}>
                Back
              </Button>
            </Link>
            <Button
              disabled={!privateKeyBackedUp}
              onClick={handleClickOpen}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Continue
            </Button>
          </Box>
        </Box>
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
            onChange={(v: any) => {
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
    </>
  );
};

// export default connect(mapStateToProps)(AccountCreatePage);
export default AccountCreatePage;
