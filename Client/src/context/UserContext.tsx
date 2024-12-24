import { ReactNode, createContext, useEffect, useState } from "react";

interface UserContextState {
  isLoggedIn: string | null;
  setIsLoggedIn: (isLoggedIn: string | null) => void;
}

const defaultState: UserContextState = {
  isLoggedIn: null,
  setIsLoggedIn: () => {},
};

export const UserContext = createContext<UserContextState>(defaultState);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<string | null>(
    JSON.parse(localStorage.getItem("token") || "null")
  );

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
