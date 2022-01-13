import {
  Grid,
  Box,
  Card,
  Paper,
  CardContent,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Dialog,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import SendReceiveSvg from "../../assets/images/hero.png";
import { CURRENCY_MAP, networkChainIds } from "../../constants";

const ReceivePage: React.FC = () => {
  const [isGenerateLinkModalOpen, setIsGenerateLinkModalOpen] = useState(false);

  const handleGenerateLinkModalClose = () => {
    setIsGenerateLinkModalOpen(false);
  };

  const onCopyGeneratedLink = () => {
    // navigator.clipboard.writeText("https://semilla-labs-dev.web.app/complete-request?amount="+amount+"&networkIndex="+networkChainIds.indexOf(userNetwork.chainId)+"&currencyIndex="+selectedCurrencyIndex+"&receiverAddress="+userAddress);
    navigator.clipboard.writeText(
      "https://conceal-protocol.netlify.app/complete-request?amount=" +
        amount +
        "&networkIndex=" +
        networkChainIds.indexOf(userNetwork.chainId) +
        "&currencyIndex=" +
        selectedCurrencyIndex +
        "&receiverAddress=" +
        userAddress
    );
    // navigator.clipboard.writeText(
    //   "http://localhost:3000/complete-request?amount=" +
    //     amount +
    //     "&networkIndex=" +
    //     networkChainIds.indexOf(userNetwork.chainId) +
    //     "&currencyIndex=" +
    //     selectedCurrencyIndex +
    //     "&receiverAddress=" +
    //     userAddress
    // );

    enqueueSnackbar("Copied to clipboard", {
      variant: "success",
      anchorOrigin: { horizontal: "center", vertical: "top" },
    });
  };

  const userAddress = useSelector(
    (addressSelector: any) => addressSelector.user.address
  );

  const [selectedCurrencyIndex, setCurrencyIndex] = useState(0);
  const [amount, setAmount] = useState("0");

  const { enqueueSnackbar } = useSnackbar();

  let userNetwork = useSelector(
    (networkSelector: any) => networkSelector.user.network
  );

  let currentSupportedCurrencies = Object.keys(
    CURRENCY_MAP[userNetwork.chainId]
  );

  return (
    <>
      <Box>
        <Box mb={3}>
          <Typography variant="h5" component="div">
            Request
          </Typography>
          <Typography variant="body2" component="div">
            Generate a private crypto request link
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Box>
              <Card variant="outlined" sx={{ borderRadius: 4, height: "100%" }}>
                <Paper sx={{ height: "100%" }}>
                  <CardContent sx={{ padding: 3 }}>
                    <Box mb={2} display="flex" gap={2}>
                      <FormControl>
                        <InputLabel>
                          <Typography variant="body2">Currency</Typography>
                        </InputLabel>
                        <Select
                          onChange={(v: any) => {
                            setCurrencyIndex(v.target.value);
                          }}
                          defaultValue={0}
                          label="Currency"
                        >
                          {currentSupportedCurrencies.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box mb={2} display="flex" gap={2}>
                      <FormControl sx={{ flexGrow: 1 }}>
                        <TextField
                          label="Amount"
                          variant="outlined"
                          type="number"
                          value={amount}
                          onChange={(v: any) => {
                            setAmount(v.target.value);
                          }}
                          inputProps={{ inputMode: "numeric", min: 0 }}
                          InputLabelProps={{
                            style: { color: "#fff" },
                          }}
                        />
                      </FormControl>
                    </Box>

                    <Box>
                      <Button
                        variant="contained"
                        onClick={() => {
                          amount != ""
                            ? setIsGenerateLinkModalOpen(true)
                            : enqueueSnackbar("Amount cannot be null", {
                                variant: "error",
                                anchorOrigin: {
                                  horizontal: "center",
                                  vertical: "top",
                                },
                              });
                        }}
                      >
                        Generate Link
                      </Button>
                    </Box>
                  </CardContent>
                </Paper>
              </Card>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={7}
            display={{ xs: "none", md: "flex" }}
            justifyContent="center"
          >
            <Box
              width="auto"
              height="350px"
              component="img"
              src={SendReceiveSvg}
            />
          </Grid>
        </Grid>
      </Box>

      <Dialog
        onClose={handleGenerateLinkModalClose}
        open={isGenerateLinkModalOpen}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h6" component="div" textAlign="center" mb={2}>
            Link Has been Generated.
          </Typography>
          <Grid
            item
            xs={12}
            md={12}
            display={{ xs: "none", md: "flex" }}
            justifyContent="center"
          >
            <Box>
              <Button variant="contained" onClick={() => onCopyGeneratedLink()}>
                Copy Link
              </Button>
            </Box>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReceivePage;
