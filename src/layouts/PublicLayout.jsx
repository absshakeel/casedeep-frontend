import { useLocation } from "react-router-dom";
import CallToAction from "../components/shared/CallToAction/CallToAction";
import Footer from "../components/shared/Footer/Footer";
import Support from "../components/shared/Ui/Support";
import Navibar from "../components/shared/Navibar/Navibar";
import LiveChatNavigator from "../components/globals/LiveChatNavigator";

const PublicLayout = ({ children }) => {
  const location = useLocation();
  const hideLayoutElements = ["/web-top-pick", "/web-order-b", "/web-order-a"].includes(
    location.pathname
  );

  return (
    <div className="w-full mx-auto max-w-[1660px]">
      {!hideLayoutElements && <Navibar />}
      {children}
      {!hideLayoutElements && (
        <>
          <CallToAction />
          <Footer />
          {/* <Support /> */}
          {/* <LiveChatNavigator/> */}
        </>
      )}
    </div>
  );
};

export default PublicLayout;