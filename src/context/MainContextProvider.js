"use client";

import React, { createContext, useState } from "react";

export const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  const [showMenu, setShowMenu] = useState(true);

  return (
    <MainContext.Provider value={{ showMenu, setShowMenu }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
