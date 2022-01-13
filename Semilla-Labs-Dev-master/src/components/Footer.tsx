import React from "react";
import {Box, Link, Typography} from "@mui/material";

import Logo from "../assets/images/logo.png";

const Footer: React.FC = () => {
    return (
        <Box>
            <Box
                component="footer"
                py={12}
                sx={{
                    display: "grid",
                    gridTemplateAreas: {
                        xs: `
                "copyright copyright"
                "product social"
              `,
                        sm: `"copyright product social"`,
                        md: `"copyright copyright product social"`,
                    },
                    gap: {xs: 4, md: 24},
                }}
            >
                <Box gridArea="copyright">
                    {/* <Typography fontWeight="bold" mb={4}>
          Lorem
        </Typography> */}
                    <Box mb={4} textAlign={{xs: "center", sm: "left"}}>
                        <Box
                            component="img"
                            src={Logo}
                            alt="logo"
                            width="150px"
                            height="auto"
                        />
                    </Box>
                    {/* <Typography variant="body2" mb={4}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero neque
          fuga id inventore maxime asperiores nisi.
        </Typography>
        <Typography variant="body2">
          Copyright &copy; Lorem ipsum dolor sit amet consectetur.
        </Typography> */}
                </Box>
                {/* <Box gridArea="product">
        <Typography variant="body2" fontWeight="bold" mb={4}>
          Product
        </Typography>
        <Box mb={0.5}>
          <Link href="#" underline="none">
            Lorem 1
          </Link>
        </Box>
        <Box mb={0.5}>
          <Link href="#" underline="none">
            Lorem 2
          </Link>
        </Box>
        <Box mb={0.5}>
          <Link href="#" underline="none">
            Lorem 3
          </Link>
        </Box>
        <Box mb={0.5}>
          <Link href="#" underline="none">
            Lorem 4
          </Link>
        </Box>
        <Box mb={0.5}>
          <Link href="#" underline="none">
            Lorem 5
          </Link>
        </Box>
        <Box>
          <Link href="#" underline="none">
            Lorem 6
          </Link>
        </Box>
      </Box> */}
                <Box gridArea="social">
                    <Typography variant="body2" fontWeight="bold" mb={4}>
                        Social
                    </Typography>
                    <Box mb={0.5}>
                        <Link href="#" underline="none">
                            Discord
                        </Link>
                    </Box>
                    <Box mb={0.5}>
                        <Link href="https://t.me/Monero0xMR" underline="none">
                            Telegram
                        </Link>
                    </Box>
                    <Box mb={0.5}>
                        <Link href="#" underline="none">
                            Reddit
                        </Link>
                    </Box>
                    <Box mb={0.5}>
                        <Link href="https://twitter.com/concealprotocol" underline="none">
                            Twitter
                        </Link>
                    </Box>
                    <Box>
                        <Link href="#" underline="none">
                            Medium
                        </Link>
                    </Box>
                </Box>
            </Box>
            <Typography variant="body2" component="div" textAlign="center" mb={6}>
                Use Conceal Protocol in conjunction with a VPN for maximum privacy.
            </Typography>
        </Box>
    );
};

export default Footer;
