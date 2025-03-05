import { Button, Card, CardBody, Col, Row, Spinner } from "reactstrap";
import logo from '../../assets/casedeep-logo.svg';
import NormalInput from "../../components/inputs/NormalInput";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/userServices";
import { useTranslation } from 'react-i18next';

const Signup = () => {
  const { t } = useTranslation();
  const [credientials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [animation, setAnimation] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleSignup = async () => {
    setisLoading(true);
    try {
      const response = await axiosInstance.post("/api/auth/register", {
        username: credientials.username,
        email: credientials.email,
        password: credientials.password,
      });
      if (response?.status === 200) {
        setAnimation("bounce-1 1s linear 1");
        toast.success(
          "Registration successful, Redirecting to Verification Page"
        );
        const userId = response?.data?.userId;
        const authToken = response?.data?.token;
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("userId", userId);
        setTimeout(() => {
          window.location.href = "/code-validation";
        }, 2000);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || // Backend error message
        error?.response?.data?.error || // Another common location for error messages
        error.message || // Axios error message if response is not structured
        "An unexpected error occurred. Please try again."; // Fallback message

      toast.error(errorMessage);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <Row className="full-screen-size gx-0 d-flex justify-content-center align-items-center">
      <div style={{ width: "414px" }}>
        <Card className="border-transparent bg-transparent">
          <CardBody className=" text-center">
            <div className="auth-logo-container">
              <img src={logo} alt={t('signup.logoAlt')} />
            </div>
            <h5 className="text-center mt-3 mb-5 color-half-white">{t('signup.title')}</h5>
            <div>
              <NormalInput
                value={credientials?.username}
                setValue={(v) =>
                  setCredentials((prev) => ({ ...prev, username: v }))
                }
                className="mb-3"
                placeholder={t('signup.usernamePlaceholder')}
                label={t('signup.usernameLabel')}
                type="text"
              />
              <NormalInput
                value={credientials?.email}
                setValue={(v) =>
                  setCredentials((prev) => ({ ...prev, email: v }))
                }
                className="mb-3"
                placeholder={t('signup.emailPlaceholder')}
                label={t('signup.emailLabel')}
                type="email"
              />
              <NormalInput
                value={credientials?.password}
                setValue={(v) =>
                  setCredentials((prev) => ({ ...prev, password: v }))
                }
                placeholder={t('signup.passwordPlaceholder')}
                label={t('signup.passwordLabel')}
                type="password"
              />

              <Button
                disabled={
                  credientials?.email === "" || credientials?.password === ""
                }
                className="orange-btn-1 full-width my-4"
                onClick={() => handleSignup()}
              >
                {isLoading ? <Spinner size={"sm"} /> : t('signup.signupButton')}
              </Button>
              <span className="color-7777 d-block">
                {t('signup.termsText')}
              </span>
            </div>
          </CardBody>
        </Card>
      </div>
    </Row>
  );
};

export default Signup;
