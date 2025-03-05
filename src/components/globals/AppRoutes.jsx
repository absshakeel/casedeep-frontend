import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import PublicLayout from "../../layouts/PublicLayout";
import AppLayout from "../../layouts/AppLayout";
import Splash from "../../pages/Splash";
import Certificate from "../../pages/Certificate";
import Home from "../../screens/home";
import CodeValidation from "../../pages/auth/CodeValidation";
import ForgotPassword from "../../pages/auth/ForgotPassword";
import ResetPassword from "../../pages/auth/ResetPassword";
import Login from "../../pages/auth/Login";
import Personalization from "../../pages/auth/Personalization";
import SelectUserType from "../../pages/auth/SelectUserType";
import SetupUserName from "../../pages/auth/SetupUserName";
import Signup from "../../pages/auth/Signup";
import BookingList from "../../pages/user/BookingList";
import LiveChat from "../../pages/user/LiveChat";
import Orders from "../../pages/user/Orders";
import PersonalizationLoggedIn from "../../pages/user/PersonalizationLoggedIn";
import ProfileOptions from "../../pages/user/ProfileOptions";
import ProviderProfilePage from "../../pages/user/ProviderProfilePage";
import ShowcaseDetails from "../../pages/user/ShowcaseDetails";
import ManageAccount from "../../pages/ManageAccount";
import Invite from "../../pages/Invite";
import Qrcode from "../../pages/Qrcode";
import Rating from "../../pages/Rating";
import Honors from "../../pages/Honors";
import Signature from "../../pages/Signature";
import Feedback from "../../pages/Feedback";
import PaymentAccount from "../../pages/PaymentAccount";
import Proposal from "../../pages/Proposal";
import Certification from "../../screens/certification";
import Pricing from "../../screens/pricing";
import Features from "../../screens/features";
import Sticky from "../../screens/sticky";
import About from "../../screens/about";
import Contact from "../../screens/contact";
import Disclaimer from "../../screens/disclaimer";
import Terms from "../../screens/terms";
import PrivacyPolicy from "../../screens/privacyPolicy";
import WebTopPick from "../../screens/web-top-pick";
import WebOrderA from "../../screens/webOrderA";
import WebOrderB from "../../screens/webOrderB";

const routes = {
  publicRoutes: [
    { path: "/", component: Home },
    { path: "/certification", component: Certification },
    { path: "/pricing", component: Pricing },
    { path: "/features", component: Features },
    { path: "/sticky", component: Sticky },
    { path: "/about", component: About },
    { path: "/contact", component: Contact },
    { path: "/disclaimer", component: Disclaimer },
    { path: "/terms", component: Terms },
    { path: "/privacy-policy", component: PrivacyPolicy },
    { path: "/web-top-pick", component: WebTopPick },
    { path: "/web-order-a", component: WebOrderA },
    { path: "/web-order-b", component: WebOrderB },
  ],
  authRoutes: [
    { path: "/login", component: Login },
    { path: "/signup", component: Signup },
    { path: "/forgotpassword", component: ForgotPassword },
    { path: "/resetpassword", component: ResetPassword },
  ],
  userRoutes: [
    { path: "/dashboard", component: ProfileOptions },
    { path: "/chat", component: LiveChat },
    { path: "/code-validation", component: CodeValidation },
    { path: "/user-type", component: SelectUserType },
    { path: "/user-name", component: SetupUserName },
    { path: "/profile", component: ProfileOptions },
    { path: "/profile/basic-info", component: Personalization },
    { path: "/profile/qr-code", component: Qrcode },
    { path: "/profile/ratings", component: Rating},
    { path: "/profile/honors", component: Honors },
    { path: "/profile/signature", component: Signature },
    { path: "/profile/certification", component: Certificate },
    { path: "/profile/feedback", component: Feedback },
    { path: "/profile/payment", component: PaymentAccount },
    { path: "/profile/dispute-vote", component: Proposal },
    // { path: "/profile/basic-info", component: PersonalizationLoggedIn },
    { path: "/profile/manage-account", component: ManageAccount },
    { path: "/profile/invites", component: Invite },
    { path: "/profile/settings", component: ProviderProfilePage },
    { path: "/booking-list", component: BookingList },
    { path: "/orders", component: Orders },
    { path: "/showcase-details/:sId", component: ShowcaseDetails },
  ],
};


const AppRoutes = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const navigateTo = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setisLoggedIn(!!authToken);
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setisLoading(false);
    }, 3000);

    return () => clearTimeout(timeOut);
  }, []);

  if (isLoading) {
    return (
      <Routes>
        <Route path="*" element={<Splash />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {/* Public Routes - These should be accessible to everyone */}
      {routes?.publicRoutes?.map((route, key) => {
        const PageComponent = route?.component;
        return (
          <Route
            key={key}
            path={route?.path}
            element={
              <PublicLayout>
                <PageComponent />
              </PublicLayout>
            }
          />
        );
      })}

      {/* Auth Routes - Redirect to dashboard if logged in */}
      {routes?.authRoutes?.map((route, key) => {
        const PageComponent = route?.component;
        return (
          <Route
            key={key}
            path={route?.path}
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <AuthLayout>
                  <PageComponent onAuthSuccess={() => setisLoggedIn(true)} />
                </AuthLayout>
              )
            }
          />
        );
      })}

      {/* Protected Routes - Redirect to login if not authenticated */}
      {routes?.userRoutes?.map((route, key) => {
        const PageComponent = route?.component;
        return (
          <Route
            key={key}
            path={route?.path}
            element={
              isLoggedIn ? (
                <AppLayout>
                  <PageComponent
                    onLogout={() => {
                      localStorage.removeItem("authToken");
                      setisLoggedIn(false);
                      navigateTo("/login");
                    }}
                  />
                </AppLayout>
              ) : (
                <Navigate to="/login" state={{ from: route.path }} replace />
              )
            }
          />
        );
      })}

      {/* Catch all route - Show 404 or redirect to home */}
      <Route
        path="*"
        element={
          <Navigate to="/" replace />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
