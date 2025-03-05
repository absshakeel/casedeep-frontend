import Hero from "../components/Home/Hero";
import Welcome from "../components/Home/Welcome";
import CallToAction from "../components/shared/CallToAction/CallToAction";
import Invite from "../components/Home/Invite";
import Banner from "../components/Home/Banner";
import Attributes from "../components/Home/Attributes";
import HowItWorks from "../components/Home/HowItWorks";
import Feature from "../components/Features/Feature/Feature";
import Pricing from "./pricing";
import Certification from "./certification";

export default function Home() {
  return (
    <div>
     <Hero />
     <Welcome/>
     <CallToAction/>
     <Invite/>
     <Banner/>
     <Attributes/>
     <HowItWorks/>
     <CallToAction/>

     <Feature/>

     <Pricing/>
     <CallToAction/>

    <Certification/>
    </div>
  );
}
