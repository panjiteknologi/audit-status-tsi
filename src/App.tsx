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

const queryClient = new QueryClient();

function App() {

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
