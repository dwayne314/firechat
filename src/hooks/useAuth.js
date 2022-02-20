import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { provider, auth, signInWithRedirect, signOut } from "../firebase";
import useDatabase from "./useDatabase";
import { addAlert, login, setSigningIn } from "../redux/actions";
import { getCurrentUser } from "../redux/selectors";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { createUser } = useDatabase();
  const currentUser = useSelector(getCurrentUser);

  const signInWithGoogle = async () => {
    dispatch(setSigningIn(true));
    try {
      await signInWithRedirect(auth, provider);
    } catch (err) {
      dispatch(
        addAlert({
          title: "Auth Error",
          message: "Error signing in. Please try again.",
          type: "error",
        })
      );
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      dispatch(
        addAlert({
          title: "Auth Error",
          message: "Error signing out. Please try again.",
          type: "error",
        })
      );
    }
  };

  useEffect(() => {
    async function handleAuthStateChange(authUser) {
      let user = null;
      if (authUser) {
        user = await createUser(authUser);
      }

      dispatch(login(user));
      dispatch(setSigningIn(false));
    }
    const subscriber = auth.onAuthStateChanged((authUser) => {
      handleAuthStateChange(authUser);
    });

    return subscriber;
  }, [dispatch, createUser]);

  return (
    <AuthContext.Provider value={{ signInWithGoogle, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
