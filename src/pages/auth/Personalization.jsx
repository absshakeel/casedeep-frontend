import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import logo from '../../assets/casedeep-logo.svg';
import NormalInput from "../../components/inputs/NormalInput";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavigatorTab from "../../components/navigators/NavigatorTab";
import PersonalInformation from "../../components/page-sections/PersonalInformation";
import BusinessInformation from "../../components/page-sections/BusinessInformation";
import { languageList } from "../../dummyData";
import { useGetProfileQuery, useUpdatePersonalProfileMutation, useUpdateBusinessProfileMutation } from "../../store/services/profileApi";
import { toast } from "react-toastify";

const Personalization = () => {
  const [animation, setAnimation] = useState("");
  const [flowAt, setFlowAt] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate();

  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery();
  const [updatePersonalProfile] = useUpdatePersonalProfileMutation();
  const [updateBusinessProfile] = useUpdateBusinessProfileMutation();

  //get language and country from navigator
  const getDefaultLanguage = () => {
    let navigatorLang = navigator.language;
    let lang = languageList?.find((item) => {
      let criteria = `${item?.name?.toLowerCase()}-${item?.countryCode?.toLowerCase()}`;
      return criteria?.includes(navigatorLang);
    });
    return lang?.name || "English";
  };

  const [personalinformation, setPersonalInformation] = useState({
    dob: "",
    legalFullName: "",
    currency: "",
    language: getDefaultLanguage(),
    phoneNumber: undefined,
    address: {},
  });

  useEffect(() => {
    if (profileData?.personProfile) {
      const profile = profileData.personProfile;
      setPersonalInformation(prev => ({
        ...prev,
        dob: profile?.birthDate?.substring(0, 10) || prev.dob,
        currency: profile?.currency || prev.currency,
        language: profile?.language || getDefaultLanguage(),
        phoneNumber: profile?.phone || prev.phoneNumber,
        legalFullName: profile?.legalFullName || prev.legalFullName,
        address: {
          address: profile?.address || prev.address?.address,
          city: profile?.city || prev.address?.city,
          country: profile?.country || prev.address?.country,
          state: profile?.state || prev.address?.state,
          zipCode: profile?.zipCode || prev.address?.zipCode,
        },
      }));
    }
  }, [profileData]);

  const [businessInformation, setBusinessInformation] = useState({
    startDate: "",
    currency: "",
    language: getDefaultLanguage(),
    name: "",
    phoneNumber: undefined,
    address: {},
  });

  const renderComponent = () => {
    switch (flowAt) {
      case 0:
        return (
          <PersonalInformation
            personalinformation={personalinformation}
            setPersonalInformation={setPersonalInformation}
          />
        );
      case 1:
        return (
          <BusinessInformation
            businessInformation={businessInformation}
            setBusinessInformation={setBusinessInformation}
          />
        );
    }
  };

  const checkDisabledCondition = () => {
    if (flowAt == 0)
      return (
        personalinformation?.address?.country === undefined ||
        personalinformation?.legalFullName === "" ||
        personalinformation?.language === ""
      );
    else
      return (
        businessInformation?.address?.country === undefined ||
        businessInformation?.name === "" ||
        businessInformation?.language === ""
      );
  };

  return (
    <Row className="full-screen-size gx-0 d-flex justify-content-center align-items-center">
      <div style={{ width: "414px" }}>
        <Card className="border-transparent bg-transparent">
          <CardBody className="text-center">
            <div className="auth-logo-container">
              <img src={logo} alt="logo test" />
            </div>

            <div className="mt-3 mb-4">
              <NavigatorTab
                flowAt={flowAt}
                onItemClick={(item) => setFlowAt(item?.flowAt)}
                items={[
                  { title: "Personal", flowAt: 0 },
                  { title: "Business", flowAt: 1 },
                ]}
              />
              <div className="my-3">{renderComponent()}</div>
            </div>
            <Button
              disabled={checkDisabledCondition()}
              onClick={async () => {
                setIsLoading(true);
                try {
                  if (flowAt === 0) {
                    const updatedData = {
                      legalFullName: personalinformation?.legalFullName,
                      birthDate: personalinformation?.dob,
                      phone: personalinformation?.phoneNumber,
                      currency: personalinformation?.currency,
                      language: personalinformation?.language,
                      country: personalinformation?.address?.country,
                      state: personalinformation?.address?.state,
                      zipCode: personalinformation?.address?.zipCode,
                      address: personalinformation?.address?.address,
                      city: personalinformation?.address?.city,
                    };
                    await updatePersonalProfile(updatedData).unwrap();
                  } else {
                    const updatedData = {
                      name: businessInformation?.name,
                      startDate: businessInformation?.startDate,
                      phone: businessInformation?.phoneNumber,
                      currency: businessInformation?.currency,
                      language: businessInformation?.language,
                      country: businessInformation?.address?.country,
                      state: businessInformation?.address?.state,
                      zipCode: businessInformation?.address?.zipCode,
                      address: businessInformation?.address?.address,
                      city: businessInformation?.address?.city,
                    };
                    await updateBusinessProfile(updatedData).unwrap();
                  }
                  toast.success('Profile updated successfully');
                  navigateTo('/');
                } catch (error) {
                  toast.error(error?.data?.message || 'Failed to update profile');
                } finally {
                  setIsLoading(false);
                }
              }}
              className="btn d-flex py-3 align-items-center justify-content-center cyan-btn full-width "
            >
              {isLoading ? <Spinner size="sm" /> : "OK"}
            </Button>
          </CardBody>
        </Card>
      </div>
    </Row>
  );
};

export default Personalization;
