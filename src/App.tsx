import { Sidebar, Toast } from "@components/custom";
import {
  ConfirmationModal,
  DetailModal,
  LoadingModal,
} from "@components/modal";
import AppRoute from "@routes/AppRoute";
import AuthRoute from "@routes/AuthRoute";
import { useAuth } from "@stores/authStore";
import { useEffect } from "react";
import { BrowserRouter } from "react-router";

const App = () => {
  const auth = useAuth();

  useEffect(() => {
    auth.checkIsLoggedIn();
  }, []);

  return (
    <div className="main">
      <BrowserRouter>
        {auth.token ? (
          <div className="relative flex-1 !flex-row bg-neutral-50">
            <Sidebar />

            <AppRoute />

            <LoadingModal />
            <ConfirmationModal />
            <DetailModal />
          </div>
        ) : (
          <AuthRoute />
        )}
      </BrowserRouter>

      <Toast />
    </div>
  );
};

export default App;
