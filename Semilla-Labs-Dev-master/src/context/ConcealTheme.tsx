import { createContext, Dispatch, useContext, useReducer } from "react";

type State = {
  isDarkMode: boolean;
};

type Actions = { type: "toggleDarkMode" };

const initialState: State = {
  isDarkMode: true,
  // isDarkMode:
  //   (localStorage.getItem("isDarkMode") as "true" | "false") === "true"
  //     ? true
  //     : false,
};

const ConcealThemeContext = createContext<{
  state: State;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  // @ts-ignore
  dispatch: undefined,
});

const { Provider } = ConcealThemeContext;

const reducer = (state: State, action: Actions) => {
  if (action.type === "toggleDarkMode") {
    const isDarkMode = !state.isDarkMode;
    localStorage.setItem("isDarkMode", isDarkMode.toString());

    return {
      ...state,
      isDarkMode,
    };
  }

  return state;
};

export const ConcealThemeProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export const useConcealThemeContext = () => {
  const context = useContext(ConcealThemeContext);

  if (!context) {
    throw new Error(
      "useConcealThemeProvider must be used insite ConcealThemeProvider"
    );
  }

  return context;
};
