import { ThemeOptions } from "@mui/material";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#ffff40",
    },
    secondary: {
      main: "#121212",
    },
  },
  typography: {
    fontFamily: "Space Mono",
    body1:{
      color:"black",
    },
    h1:{
      color:"white",
    },
    h2:{
      color:"white",
    },
    h5:{
      color:"white",
    },
    h4:{
      color:"white",
    },
    h3:{
      color:"white",
    },
    h6:{
      color:"white",
    },
    body2:{
      color:"white",
    }
    // allVariants: {

    //   color: "light grey"
    // },

  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: "transparent",
      },
      styleOverrides: {
        colorDefault:{
          color:"white"
        },
        colorInherit: {
          backgroundColor: "white",
          color: "#fff",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + $track": {
              opacity: 1,
              border: "none",
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          border: "1px solid #bdbdbd",
          backgroundColor: "#fafafa",
          opacity: 1,
          transition:
            "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      // styleOverrides: {
      //   root: {
      //     background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      //     border: 0,
      //     borderRadius: 3,
      //     boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      //     color: "white",
      //     height: 48,
      //     padding: "0 30px",
      //   },
      // },
    },
    MuiList: {
      defaultProps: {
        dense: true,
      },
    },
    MuiMenuItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiTable: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
  },
};

export default themeOptions;
