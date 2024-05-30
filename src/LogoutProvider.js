import { useContext } from 'react';
import { AppContext } from './AppContextProvider';

let logoutFunction = null;

export const LogoutProvider = ({ children }) => {
    const { logout } = useContext(AppContext);
    logoutFunction = logout;
    return children;
};

export const logout = () => {
  if (logoutFunction) {
    logoutFunction();
  } else {
    console.error('Logout function not available');
  }
};
