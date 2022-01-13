import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  Paper,
  CardContent,
  Button,
  LinearProgress,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import IosShareIcon from "@mui/icons-material/IosShare";

const LoansPage: React.FC = () => {
  return (
    <Box mb={12}>
      <Typography variant="h6" component="div" mb={3}>
        Credit Summary
      </Typography>
      <Grid container columnSpacing={3}>
        <Grid item md={4}>
          <Card variant="outlined" sx={{ borderRadius: 4 }}>
            <Paper sx={{ height: "100%" }}>
              <CardContent sx={{ padding: 3 }}>
                <Typography mb={1} variant="body2" sx={{ color: "#aaa" }}>
                  Borrowed
                </Typography>

                <Typography mb={2} variant="h4" component="div">
                  $0
                </Typography>

                <LinearProgress
                  value={0}
                  variant="buffer"
                  sx={{ mb: 2, height: 12, borderRadius: 2 }}
                />

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Typography component="div">0%</Typography>
                  <Typography component="div">Credit available $0</Typography>
                </Box>

                <Box display="flex" gap={2} mb={3}>
                  <Button
                    variant="contained"
                    disableElevation
                    size="small"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    <AccountBalanceIcon fontSize="small" />
                    Borrow
                  </Button>
                  <Button
                    variant="contained"
                    disableElevation
                    size="small"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    <IosShareIcon fontSize="small" />
                    Repay
                  </Button>
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={1}
                >
                  <Typography component="div">Wallet balance</Typography>
                  <Typography component="div">$0</Typography>
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={1}
                >
                  <Typography component="div">Credit</Typography>
                  <Typography component="div">-$0</Typography>
                </Box>
              </CardContent>
            </Paper>
          </Card>
        </Grid>
        <Grid item md={8}>
          <Box mb={3}>
            <Card variant="outlined" sx={{ borderRadius: 4, height: "100%" }}>
              <Paper sx={{ height: "100%" }}>
                <CardContent sx={{ padding: 3 }}>
                  <Box display="flex" alignItems="center" mb={2} gap={2}>
                    <img src="https://via.placeholder.com/30" alt="logo" />

                    <Box>
                      <Typography variant="body2" sx={{ color: "#aaa" }}>
                        Remaining credit
                      </Typography>

                      <Typography variant="body2" component="div">
                        0 pCELO
                      </Typography>
                    </Box>
                  </Box>

                  <LinearProgress
                    value={0}
                    variant="buffer"
                    sx={{ mb: 1, height: 6, borderRadius: 2 }}
                  />

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography component="div">0%</Typography>
                  </Box>
                </CardContent>
              </Paper>
            </Card>
          </Box>

          <Box mb={3}>
            <Card variant="outlined" sx={{ borderRadius: 4, height: "100%" }}>
              <Paper sx={{ height: "100%" }}>
                <CardContent sx={{ padding: 3 }}>
                  <Box display="flex" alignItems="center" mb={2} gap={2}>
                    <img src="https://via.placeholder.com/30" alt="logo" />

                    <Box>
                      <Typography variant="body2" sx={{ color: "#aaa" }}>
                        Remaining credit
                      </Typography>

                      <Typography variant="body2" component="div">
                        0 pCELO
                      </Typography>
                    </Box>
                  </Box>

                  <LinearProgress
                    value={0}
                    variant="buffer"
                    sx={{ mb: 2, height: 6, borderRadius: 2 }}
                  />

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography component="div">0%</Typography>
                  </Box>
                </CardContent>
              </Paper>
            </Card>
          </Box>

          <Box>
            <Card variant="outlined" sx={{ borderRadius: 4, height: "100%" }}>
              <Paper sx={{ height: "100%" }}>
                <CardContent sx={{ padding: 3 }}>
                  <Box display="flex" alignItems="center" mb={2} gap={2}>
                    <img src="https://via.placeholder.com/30" alt="logo" />

                    <Box>
                      <Typography variant="body2" sx={{ color: "#aaa" }}>
                        Remaining credit
                      </Typography>

                      <Typography variant="body2" component="div">
                        0 pCELO
                      </Typography>
                    </Box>
                  </Box>

                  <LinearProgress
                    value={0}
                    variant="buffer"
                    sx={{ mb: 2, height: 6, borderRadius: 2 }}
                  />

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography component="div">0%</Typography>
                  </Box>
                </CardContent>
              </Paper>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoansPage;
