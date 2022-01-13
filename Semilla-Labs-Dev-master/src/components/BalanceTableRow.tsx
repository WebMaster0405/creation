
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
//   import React, { useEffect, useState } from "react";
//   import GetAppIcon from "@mui/icons-material/GetApp";
//   import UploadIcon from "@mui/icons-material/Upload";
//   import RequestPageIcon from "@mui/icons-material/RequestPage";
//   import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
//   import OpenInNewIcon from "@mui/icons-material/OpenInNew";
//   import CloseIcon from "@mui/icons-material/Close";
//   import { Link, useNavigate } from "react-router-dom";
//   import { useSelector, connect, useDispatch } from "react-redux";
//   import { useTokenBalance } from "../hooks/useTokenBalance";

// const BalanceTableRow: React.FC = (index:any, currency:any, tokenAddress:any,userAddress:any) => {
//     let balance = useTokenBalance(
//       tokenAddress,
//       currency,
//       userAddress
//     );
//     return (
//       <><></>
//         <TableRow
//           key={index}
//           sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//         >
//           <TableCell>
//             <IconButton
//               color="success"
//               sx={[
//                 {
//                   background: "rgba(102, 187, 106, 0.08)",
//                 },
//                 {
//                   "&:hover": {
//                     background: "rgba(255, 255, 255, 0.08)",
//                   },
//                 },
//               ]}
//             >
//               <MonetizationOnIcon />
//             </IconButton>
//           </TableCell>
//           <TableCell>
//             <Box>{currency}</Box>
//             {/* <Box>{`${item.percentage}%`}</Box> */}
//           </TableCell>
//           <TableCell align="left">
//             <Box>{balance}</Box>
//             {/* <Box>{`$${item.balanceAmount}`}</Box> */}
//           </TableCell>
//           <TableCell align="right">
//             <IconButton
//               color="primary"
//               sx={[
//                 {
//                   background: "rgba(255, 255, 64, 0.08)",
//                   mr: 1,
//                 },
//                 {
//                   "&:hover": {
//                     background: "rgba(255, 255, 255, 0.02)",
//                   },
//                 },
//               ]}
//             >
//               <GetAppIcon />
//             </IconButton>
//             <IconButton
//               color="primary"
//               sx={[
//                 {
//                   background: "rgba(255, 255, 64, 0.08)",
//                 },
//                 {
//                   "&:hover": {
//                     background: "rgba(255, 255, 255, 0.2)",
//                   },
//                 },
//               ]}
//             >
//               <UploadIcon />
//             </IconButton>
//           </TableCell>
//         </TableRow>
//      </>
//     );
//   }