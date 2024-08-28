import { RouterProvider } from "react-router-dom";

// project import
import router from "@/routes";
import ThemeCustomization from "@/themes";

import ScrollTop from "@/components/ScrollTop";
import Snackbar from "@/components/@extended/Snackbar";
import Notistack from "@/components/third-party/Notistack";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// auth provider
import { JWTProvider as AuthProvider } from "@contexts/JWTContext";
import { useEffect } from "react";
import { getToken, messaging } from "./firebase.config";

const queryClient = new QueryClient();

function App() {
  // if (navigator.serviceWorker) {
  //   navigator.serviceWorker
  //     .register("/firebase-messaging-sw.js")
  //     .then(function (registration) {
  //       console.log("Register SW firebase : ", registration);
  //     })
  //     .catch((err) => {
  //       console.log("ERR SW firebase : ", err);
  //     });
  // }

  // if (window.Notification) {
  //   if (Notification.permission === "granted") {
  //   } else if (Notification.permission !== "denied") {
  //     Notification.requestPermission((permission) => {
  //       if (permission === "granted") {
  //       }
  //     });
  //   }
  // }

  // const requestPermission = async () => {
  //   try {
  //     const currentToken = await getToken(messaging, {
  //       vapidKey:
  //         "BA89eSnxoKdl7apjC1etxWm9oepFzBDeC44iRVgV8TI-ENz2kSWjPT-T5_NOqcRy8dXddGZ2lFoibdRSxHbMipY",
  //     });
  //     if (currentToken) {
  //       console.log("FCM Token:", currentToken);
  //     } else {
  //       console.log("No registration token available.");
  //     }
  //   } catch (error) {
  //     console.error("Error getting registration token.", error);
  //   }
  // };

  // useEffect(() => {
  //   requestPermission();
  // }, []);

  return (
    <ThemeCustomization>
      <ScrollTop>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <>
              <Notistack>
                <RouterProvider router={router} />
                <Snackbar />
              </Notistack>
            </>
          </AuthProvider>
        </QueryClientProvider>
      </ScrollTop>
    </ThemeCustomization>
  );
}

export default App;
