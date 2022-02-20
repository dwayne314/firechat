import { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../redux/actions";
import { getDarkMode } from "../redux/selectors";

const DarkModeContext = createContext({});

export const DarkModeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(getDarkMode);

  function toggleDarkMode() {
    dispatch(setDarkMode(!isDarkMode));
  }

  return (
    <DarkModeContext.Provider value={{ toggleDarkMode, isDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default function useDarkMode() {
  return useContext(DarkModeContext);
}
