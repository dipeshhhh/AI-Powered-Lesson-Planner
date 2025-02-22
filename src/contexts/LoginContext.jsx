import { createContext, useContext, useState } from "react";
import { LOGGEDIN_USER_LOCAL_STORAGE_KEY } from "@/lib/constants";

const LoginContext = createContext({});

export function useLogin() {
  return useContext(LoginContext);
}

export function LoginProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(getCurrentLoggedInUser());

  const authenticateUser = (email, password) => {
    if (email !== "demouser" || password !== "demopass") { // for anything other than demouser and demopass
      return false
    }

    const userDetails = {
      "email": email
    }
    localStorage.setItem(LOGGEDIN_USER_LOCAL_STORAGE_KEY, JSON.stringify(userDetails));
    setLoggedInUser(userDetails);

    return true;
  }

  return (
    <LoginContext.Provider value={{ loggedInUser, setLoggedInUser, authenticateUser }}>
      {children}
    </LoginContext.Provider>
  )
}

function getCurrentLoggedInUser() {
  // Check if user is already logged in
  const userInLocalStorage = localStorage.getItem(LOGGEDIN_USER_LOCAL_STORAGE_KEY);
  // Currently using localStorage for this as per assignment requirements: 2C "All data should be handled in the frontend state (React state or localStorage)"

  let localUser = null;
  try {
    if (userInLocalStorage) localUser = JSON.parse(userInLocalStorage);
    else localUser = null;
  } catch (error) {
    console.error(error);
    localUser = null;
  }

  return localUser;
}