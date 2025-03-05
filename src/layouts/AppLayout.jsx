import Header from "../components/globals/Header";
import UserProfileHeader from "../components/globals/UserProfileHeader";
import LiveChatNavigator from "../components/globals/LiveChatNavigator";
import AppHeader from "../components/globals/AppHeader";
import HeaderMain from "../components/globals/Header";
import HeaderTop from "../components/globals/HeaderTop";

const AppLayout = ({ children }) => {
  return (
    <main className="main">
      {/* <UserProfileHeader/> */}
      {/* <AppHeader/> */}
      {/* <HeaderMain/> */}
      <HeaderTop/>
      {children}
      <LiveChatNavigator/>
    </main>
  );
};

export default AppLayout;
