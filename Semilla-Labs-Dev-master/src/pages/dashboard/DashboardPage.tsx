import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import GetAppIcon from "@mui/icons-material/GetApp";
import UploadIcon from "@mui/icons-material/Upload";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, connect, useDispatch } from "react-redux";
import { networkSelector } from "../../store/selectors";
import { useTokenBalance } from "../../hooks/useTokenBalance";
import {
  CURRENCY_MAP,
  networkChainIds,
  networkGasCurrencys,
  networkRPCUrls,
  supportedNetworkNames,
} from "../../constants";
import { userNetworkLoaded } from "../../store/actions";

const DashboardPage: React.FC = () => {
  const Web3 = require("web3");
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/v3/20de382e6be74214854ccf558284a440"
    )
  );

  const navigate = useNavigate();
  const userAddress = useSelector(
    (addressSelector: any) => addressSelector.user.address
  );

  const [address, setAddress] = useState(
    userAddress === undefined ? "" : userAddress
  );
  const [balance, setBalance] = useState(0);

  let balances = [];

  const dispatch = useDispatch();

  let userNetwork = useSelector((networkSelector: any) =>
    networkSelector.user.network === undefined
      ? dispatch(
          userNetworkLoaded({
            name: supportedNetworkNames[0],
            chainId: networkChainIds[0],
            gasCurrency: networkGasCurrencys[0],
            rpcUrl: networkRPCUrls[0],
          })
        ).network
      : networkSelector.user.network
  );

  Object.values(CURRENCY_MAP[userNetwork.chainId]);

  let txs: any[] = [];

  useTokenBalance(
    userNetwork,
    address
  ).then((v) => setBalance(v));

  for (var key in CURRENCY_MAP[userNetwork.chainId]) {
    balances.push({
      name: key,
      balance: balance,
    });
  }

  getTransactionHistory();

  async function getTransactionHistory() {
    const latest = await web3.eth.getBlockNumber();
    var block = await web3.eth.getBlock(latest);

    for (var i = 0; i < latest; i++) {
      var block = await web3.eth.getBlock(i, true);
      for (var j = 0; j < block.transactions; j++) {
        if (block.transactions[j].to == userAddress) {
          let trx = web3.eth.getTransaction(block.transactions[j]);
          txs.push(trx);
        }
      }
    }
  }

  useEffect(() => {}, [userNetwork]);

  return (
    <>
      <Box mb={12}>
        <Typography variant="h6" component="div" mb={3}>
          Your Wallet
        </Typography>
        <Grid container spacing={4} mb={4}>
          <Grid xs={12} sm={6} lg={4} item>
            <Card variant="outlined" sx={{ borderRadius: 4, height: "100%" }}>
              <Paper sx={{ height: "100%" }}>
                <CardContent sx={{ padding: 3 }}>
                  <Typography mb={1} variant="body2" sx={{ color: "#aaa" }}>
                    Wallet Balance
                  </Typography>
                  <Typography mb={2} variant="h4" component="div">
                    {userNetwork.gasCurrency + " " + balance}
                  </Typography>
                  <Link to="/home/deposit" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      disableElevation
                      size="small"
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <GetAppIcon fontSize="small" />
                      Deposit
                    </Button>
                  </Link>
                </CardContent>
              </Paper>
            </Card>
          </Grid>

          {/* <Grid xs={12} sm={6} lg={4} item>
            <Card variant="outlined" sx={{ borderRadius: 4, height: "100%" }}>
              <Paper sx={{ height: "100%" }}>
                <CardContent sx={{ padding: 3 }}>
                  <Typography mb={1} variant="body2" sx={{ color: "#aaa" }}>
                    Stats
                  </Typography>
                  <Typography
                    mb={2}
                    variant="h4"
                    color="success.main"
                    component="div"
                  >
                    TVL $1,604,377.15
                  </Typography>
                </CardContent>
              </Paper>
            </Card>
          </Grid> */}
        </Grid>

        <Grid container spacing={4} mb={4}>
          <Grid xs={12} sm={6} lg={4} item>
            <Link to="/home/send" style={{ textDecoration: "none" }}>
              <Card
                variant="outlined"
                sx={[
                  {
                    borderRadius: 4,
                    height: "100%",
                    cursor: "pointer",
                  },
                  {
                    "&:hover": {
                      background: "rgba(255, 255, 64, 0.08)",
                    },
                  },
                ]}
              >
                <CardContent sx={{ padding: 3, display: "flex", gap: 2 }}>
                  <Box>
                    <IconButton
                      color="primary"
                      sx={{ background: "rgba(255, 255, 64, 0.08)" }}
                    >
                      <UploadIcon fontSize="large" />
                    </IconButton>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Typography variant="body2" fontWeight="bold">
                      Send
                    </Typography>
                    <Typography variant="body2">
                      Send crypto privately to any user
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>

          <Grid xs={12} sm={6} lg={4} item>
            <Link to="/home/request" style={{ textDecoration: "none" }}>
              <Card
                variant="outlined"
                sx={[
                  {
                    borderRadius: 4,
                    height: "100%",
                    cursor: "pointer",
                  },
                  {
                    "&:hover": {
                      background: "rgba(255, 255, 64, 0.08)",
                    },
                  },
                ]}
              >
                <CardContent sx={{ padding: 3, display: "flex", gap: 2 }}>
                  <Box>
                    <IconButton
                      color="primary"
                      sx={{ background: "rgba(255, 255, 64, 0.08)" }}
                    >
                      <RequestPageIcon fontSize="large" />
                    </IconButton>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Typography variant="body2" fontWeight="bold">
                      Request Payment
                    </Typography>
                    <Typography variant="body2">
                      Generate a private crypto request link
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <TableContainer
              sx={{
                borderRadius: 4,
                height: balances.length > 1 ? "100%" : "25%",
                minHeight: "150px",
              }}
              component={Paper}
              variant="outlined"
            >
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="left">Assets</TableCell>
                    <TableCell align="left">Balance</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {balances.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <IconButton
                          color="success"
                          sx={[
                            {
                              background: "rgba(102, 187, 106, 0.08)",
                            },
                            {
                              "&:hover": {
                                background: "rgba(255, 255, 255, 0.08)",
                              },
                            },
                          ]}
                        >
                          <MonetizationOnIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <Box>{item.name}</Box>
                        {/* <Box>{`${item.percentage}%`}</Box> */}
                      </TableCell>
                      <TableCell align="left">
                        <Box>{item.balance}</Box>
                        {/* <Box>{`$${item.balanceAmount}`}</Box> */}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          sx={[
                            {
                              background: "rgba(255, 255, 64, 0.08)",
                              mr: 1,
                            },
                            {
                              "&:hover": {
                                background: "rgba(255, 255, 255, 0.02)",
                              },
                            },
                          ]}
                        >
                          <GetAppIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          sx={[
                            {
                              background: "rgba(255, 255, 64, 0.08)",
                            },
                            {
                              "&:hover": {
                                background: "rgba(255, 255, 255, 0.2)",
                              },
                            },
                          ]}
                        >
                          <UploadIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <Card
              variant="outlined"
              sx={{ borderRadius: 4, height: txs.length > 0 ? "100%" : "80%" }}
            >
              <CardHeader subheader="Transaction History" />
              <Paper sx={{ height: "100%" }}>
                <CardContent sx={{ padding: 3 }}>
                  <TableContainer>
                    <Table size="medium">
                      <TableHead>
                        <TableRow>
                          <TableCell>Account</TableCell>
                          <TableCell>Value</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {txs.length == 0 ? (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <br></br>
                            <Typography variant="body2">
                              No transaction history found
                            </Typography>
                          </TableRow>
                        ) : (
                          txs.map((item: any, index: any) => (
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell>txs[index].from</TableCell>
                              <TableCell>txs[index].value</TableCell>
                              <TableCell align="right">
                                <IconButton
                                  color="info"
                                  sx={[
                                    {
                                      background: "rgba(41, 182, 246, 0.08)",
                                    },
                                    {
                                      "&:hover": {
                                        background: "rgba(255, 255, 255, 0.08)",
                                      },
                                    },
                                  ]}
                                >
                                  <OpenInNewIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Paper>
            </Card>
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
};

function mapStateToProps(state: any) {
  return {
    network: networkSelector(state),
  };
}

export default connect(mapStateToProps)(DashboardPage);
