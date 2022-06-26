import "react-native-gesture-handler";
import React from "react";
import { StatusBar, useColorScheme, LogBox } from "react-native";
import SplashScreen from "react-native-splash-screen";
/**
 * ? Local Imports
 */
import Navigation from "./src/navigation";
import { isAndroid } from "@freakycoder/react-native-helpers";
import { Provider } from "react-redux";
import { store } from "config/store";
import { ToastProvider } from "react-native-toast-notifications";

LogBox.ignoreAllLogs();

const App = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  React.useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");
    if (isAndroid) {
      StatusBar.setBackgroundColor("rgba(0,0,0,0)");
      StatusBar.setTranslucent(true);
    }

    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, [scheme, isDarkMode]);

  return (
    <>
      <ToastProvider>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </ToastProvider>
    </>
  );
};

export default App;
