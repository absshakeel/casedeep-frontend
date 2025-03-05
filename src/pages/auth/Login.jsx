import { Button, Card, CardBody, Col, Row, Spinner } from "reactstrap";
import NormalInput from "../../components/inputs/NormalInput";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaApple, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../store/services/authService";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/slices/authSlice";
import logo from '../../assets/casedeep-logo.svg';

const Login = ({ onAuthSuccess }) => {
  const [credientials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [animation, setAnimation] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const handleLogin = async () => {
    try {
      setisLoading(true);
      
      // Validate credentials before making the request
      if (!credientials.username || !credientials.password) {
        toast.error("Please enter both username and password");
        return;
      }

      const response = await login({
        username: credientials.username,
        password: credientials.password,
      }).unwrap();
      
      // Enhanced response validation
      if (!response) {
        throw new Error('No response received from server');
      }

      if (!response.token) {
        throw new Error('Authentication token not received');
      }

      if (!response.userId) {
        throw new Error('User ID not received');
      }

      // Store token and userId
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userId', response.userId);
      setAnimation("bounce-1 1s linear 1");
      toast.success(response.message || "Login successful");
      
      dispatch(loginSuccess({
        userId: response.userId,
        token: response.token
      }));
      
      if (onAuthSuccess) {
        onAuthSuccess();
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage;
      
      if (error.status === 403) {
        errorMessage = "Access forbidden. Please check your credentials.";
      } else if (error.data?.message) {
        errorMessage = error.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = "An error occurred during login. Please try again.";
      }
      
      toast.error(errorMessage);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <Row className="full-screen-size gx-0 d-flex justify-content-center align-items-center">
      <div style={{ width: "414px" }}>
        <Card className="border-transparent bg-transparent">
          <CardBody className="text-center">
            <div className="auth-logo-container">
              <img src={logo} alt="logo" />
            </div>
            <h5 className="text-center mt-3 mb-5 color-half-white">Login</h5>
            <div>
              <NormalInput
                value={credientials?.username}
                setValue={(v) =>
                  setCredentials((prev) => ({ ...prev, username: v }))
                }
                className="mb-3"
                placeholder={"Username"}
                label={"Username"}
                type="text"
              />
              <NormalInput
                value={credientials?.password}
                setValue={(v) =>
                  setCredentials((prev) => ({ ...prev, password: v }))
                }
                placeholder={"Password"}
                label={"Password"}
                type="password"
              />
            </div>
            <Button
              disabled={
                credientials?.username === "" || credientials?.password === ""
              }
              className="cyan-btn mt-5 full-width "
              onClick={() => handleLogin()}
            >
              {isLoading ? <Spinner size={"sm"} /> : "Log In"}
            </Button>
            <div className="d-flex align-items-center justify-content-center my-4 gap-3">
              <Button
                className="cyan-btn d-flex align-items-center justify-content-center"
                style={{ height: "45px", width: "45px", borderRadius: "50%" }}
              >
                <FaApple
                  size={30}
                  style={{ transform: "translate(-0.5px, -1.5px)" }}
                />
              </Button>
              <Button
                className="cyan-btn"
                style={{ height: "45px", width: "45px", borderRadius: "50%" }}
              >
                <FaGoogle size={25} />
              </Button>
            </div>
            <div className="d-flex justify-content-between align-items-center gap-3">
              <Link
                to={"/signup"}
                className="btn text-decoration-none orange-btn-2 full-width"
              >
                Sign Up Free
              </Link>
              <Link
                to={"/forgotpassword"}
                className=" btn text-decoration-none cyan-bordered-btn full-width"
              >
                Forgot Password
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </Row>
  );
};

export default Login;
