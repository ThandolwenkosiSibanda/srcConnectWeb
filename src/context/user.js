import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("proqit_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to login and store user
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("proqit_user", JSON.stringify(userData));
  };

  // Function to logout and remove user
  const logout = () => {
    localStorage.removeItem("proqit_user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
