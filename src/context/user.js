// import { createContext, useState, useEffect } from "react";

// export const UserContext = createContext(null);

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("proqit_user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//       setLoading(false);
//     }
//   }, []);

//   // Function to login and store user
//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("proqit_user", JSON.stringify(userData));
//   };

//   // Function to logout and remove user
//   const logout = () => {
//     localStorage.removeItem("proqit_user");
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

import { createContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load session on first render
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error.message);
      }

      setUser(session?.user || null);
      setLoading(false);
    };

    getUser();

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Function to log in (optional wrapper)
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data;
  };

  // Function to log out
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
