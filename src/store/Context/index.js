import { createContext } from "react";

const StoreContext = createContext({
  token: null,
  setToken: () => {},
  user: {},
});

export default StoreContext;
