import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SendReceiveSvg from "../../assets/images/hero.png";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { CURRENCY_MAP } from "../../constants";
import {
  networkChainIds,
  networkGasCurrencys,
  networkRPCUrls,
  supportedNetworkNames,
} from "../../constants";
import { userNetworkLoaded } from "../../store/actions";
import { doDeposit } from "../../hooks/doDeposit";
import Loader from "react-loader-spinner";

const Web3 = require("web3");

const CompleteRequest: React.FC = () => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/v3/8376bb241320413b91dd2f592714dd8d"
    )
  );

  const query = new URLSearchParams(window.location.search);

  let isError: any;

  const selectedCurrencyIndex: any = query.get("currencyIndex");
  const amount: any = query.get("amount");

  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const receiverAddress = query.get("receiverAddress");

  const dispatch = useDispatch();

  const networkIndex: any = query.get("networkIndex");
  const privateKey: any = localStorage.getItem("userPrivateKey");

  if (
    networkIndex == undefined ||
    receiverAddress == undefined ||
    amount == undefined ||
    selectedCurrencyIndex == undefined ||
    !web3.utils.isAddress(receiverAddress)
  ) {
    isError = true;
  }

  let userNetwork = useSelector((networkSelector: any) =>
    networkSelector.user.network.chainId != networkChainIds[networkIndex] &&
    networkIndex != null
      ? dispatch(
          userNetworkLoaded({
            name: supportedNetworkNames[networkIndex],
            chainId: networkChainIds[networkIndex],
            gasCurrency: networkGasCurrencys[networkIndex],
            rpcUrl: networkRPCUrls[networkIndex],
          })
        ).network
      : networkSelector.user.network
  );

  let currentSupportedCurrencies = Object.keys(
    CURRENCY_MAP[userNetwork.chainId]
  );

  function getNotesForDeposit() {
  
      try {
        doDeposit(
          userNetwork,
          amount.toString(),
          receiverAddress,
          enqueueSnackbar,
          setIsLoading
        );
      } catch (e: any) {
        enqueueSnackbar(e.message, {
          variant: "error",
          anchorOrigin: { horizontal: "center", vertical: "top" },
        });
      }
  
  }


  return (
    <>
      <Box>
        <Box mb={3}>
          <Typography variant="h5" component="div">
            Complete Request
          </Typography>
          <Typography variant="body2" component="div">
            Complete a crypto request.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            {isError ? (
              <Box>
                <Typography variant="body2">Invalid Request</Typography>
              </Box>
            ) : (
              <Box>
                <Card
                  variant="outlined"
                  sx={{ borderRadius: 4, height: "100%" }}
                >
                  <Paper sx={{ height: "100%" }}>
                    <CardContent sx={{ padding: 3 }}>
                      <Box mb={2} display="flex" gap={2}>
                        <FormControl>
                          <InputLabel>
                            <Typography variant="body2">Currency</Typography>
                          </InputLabel>
                          <Select
                            defaultValue={selectedCurrencyIndex}
                            label="Currency"
                          >
                            <MenuItem
                              key={selectedCurrencyIndex}
                              value={selectedCurrencyIndex}
                            >
                              {
                                currentSupportedCurrencies[
                                  selectedCurrencyIndex
                                ]
                              }
                            </MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl sx={{ flexGrow: 1 }}>
                          <TextField
                            label="Amount"
                            variant="outlined"
                            type="number"
                            value={amount}
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
                          onClick={() => getNotesForDeposit()}
                          disabled={isLoading}
                        >
                          {" "}
                          {isLoading ? (
                            <Loader
                              type="ThreeDots"
                              color="#000000"
                              height={10}
                              width={20}
                            />
                          ) : (
                            "Transfer Fund"
                          )}
                        </Button>
                      </Box>
                    </CardContent>
                  </Paper>
                </Card>
              </Box>
            )}
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
    </>
  );
};

export default CompleteRequest;
