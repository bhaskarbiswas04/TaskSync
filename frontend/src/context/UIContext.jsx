import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [pageLoading, setPageLoading] = useState(false);

  const triggerPageLoading = () => {
    setPageLoading(true);

    setTimeout(() => {
      setPageLoading(false);
    }, 600);
  };

  return (
    <UIContext.Provider value={{ pageLoading, triggerPageLoading }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUI must be used inside UIProvider");
  }

  return context;
};