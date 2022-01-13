import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";

import MainInfoCard from "./MainInfoCard";

const HomeSectionTwo: React.FC = () => {
  return (
    <Box mb={20}>
      <Typography textAlign="center" variant="h4">
        Conceal Protocol
      </Typography>
      <Typography textAlign="center" variant="body2" color="primary">
        Conceal Protocol is a decentralized, zk-SNARKs based privacy mixer for
        popular cryptocurrencies and stable coins on Aurora and Fantom.
      </Typography>
      <Grid container mt={4} spacing={4} justifyContent="center">
        <Grid item sm={6} md={4}>
          <MainInfoCard
            title="How does Conceal Protocol work?"
            image="/images/setting1.png"
          >
            <Typography variant="body2" color="text.primary" mb={1}>
              Deposit - Wait - Withdraw
            </Typography>
            <Typography variant="body2" color="text.primary" mb={1}>
              Deposit select cryptocurrencies on Aurora or Fantom and receive a
              private key.
            </Typography>
            <Typography variant="body2" color="text.primary" mb={1}>
              Wait to increase your anonymity.
            </Typography>
            <Typography variant="body2" color="text.primary">
              Withdraw to claim your cryptocurrencies on a new wallet using your
              deposit private key.
            </Typography>
          </MainInfoCard>
        </Grid>
        <Grid item sm={6} md={4}>
          <MainInfoCard
            title="How does Conceal Protocol provide privacy?"
            image="/images/mask1.png"
          >
            <Typography variant="body2" color="text.primary" mb={1}>
              Conceal protocol provides transaction privacy by breaking the
              on-chain link between your deposit and receiving address using
              zk-SNARKs smart contracts.
            </Typography>
            <Typography variant="body2" color="text.primary">
              Once your cryptocurrency is withdrawn to a new wallet, there is no
              way to link your deposit to your withdrawal. Our zk-SNARKs
              contracts ensure complete privacy.
            </Typography>
          </MainInfoCard>
        </Grid>
        <Grid item sm={6} md={4}>
          <MainInfoCard
            title="Why use Conceal Protocol?"
            image="/images/set2.png"
          >
            <Typography variant="body2" color="text.primary" mb={1}>
              Conceal Protocol is built using MIT fair-use licensed zk-SNARKs
              technology deployed from well tested and audited open-sourced
              contracts by Semaphore, Zcash and others.
            </Typography>
            <Typography variant="body2" color="text.primary">
              This state-of-the-art cryptocurrency mixing protocol can be used
              in conjunction with a VPN to help you maintain your digital
              privacy.
            </Typography>
          </MainInfoCard>
        </Grid>
      </Grid>
      {/*<Box textAlign="center" mt={6}>*/}
      {/*  <Button variant="outlined">Learn More</Button>*/}
      {/*</Box>*/}
    </Box>
  );
};

export default HomeSectionTwo;
