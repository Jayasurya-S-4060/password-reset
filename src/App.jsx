import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, notification } from "antd";
import * as Yup from "yup";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import LoginIcon from "./assets/login";
import "./App.css";
import registerUser from "./services/registerUser";
import resetPasswordRequest from "./services/resetPasswordRequest";
import resetPassword from "./services/resetPassword";
import userLogin from "./services/userLogin";

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center w-full max-w-lg md:max-w-3xl">
        <div className="flex justify-center mb-4 md:mb-0 md:mr-4">
          <LoginIcon />
        </div>
        <div className="w-full">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/confirm-password" element={<ResetPassword />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const registerValidationSchema = Yup.object({
  userName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character (@$!%*?&#)"
    )
    .required("Required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700">Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          try {
            const userData = await userLogin(values);
            localStorage.setItem("token", userData.user.token);
            alert(`Successfully logged in as ${userData.user.userName}`);
          } catch (err) {
            const errorMessage =
              err.response?.data?.message || "Something went wrong.";
            notification.error({
              message: "Login Failed",
              description: errorMessage,
            });
          } finally {
            setSubmitting(false);
            resetForm();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mt-4">
            <FieldWrapper>
              <InputField
                type="email"
                name="email"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </FieldWrapper>

            <FieldWrapper>
              <InputField
                type="password"
                name="password"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </FieldWrapper>

            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              className="mt-4 w-full"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>

      <Link
        to="/forgot-password"
        className="mt-2 text-blue-500 hover:underline block"
      >
        {" "}
        Forgot Password?
      </Link>
      <Link to="/register" className="mt-4 text-blue-500 hover:underline block">
        Don't have an account? Register
      </Link>
    </div>
  );
};

const RegisterForm = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700">Register</h2>
      <Formik
        initialValues={{ userName: "", email: "", password: "" }}
        validationSchema={registerValidationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          try {
            await registerUser(values);
            notification.success({
              message: "Registration Successful",
              description: "User has been added successfully.",
            });
            resetForm();
          } catch (err) {
            const errorMessage =
              err.response?.data?.message || "Something went wrong.";
            notification.error({
              message: "Login Failed",
              description: errorMessage,
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mt-4">
            <FieldWrapper>
              <InputField
                type="text"
                name="userName"
                placeholder="Enter your name"
              />
              <ErrorMessage
                name="userName"
                component="div"
                className="text-red-500 text-sm"
              />
            </FieldWrapper>

            <FieldWrapper>
              <InputField
                type="email"
                name="email"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </FieldWrapper>

            <FieldWrapper>
              <InputField
                type="password"
                name="password"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </FieldWrapper>

            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              className="mt-4 w-full"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <Link
        to="/forgot-password"
        className="mt-4 text-blue-500 hover:underline block"
      >
        Forgot password
      </Link>

      <Link to="/" className="mt-4 text-blue-500 hover:underline block">
        Back to Login
      </Link>
    </div>
  );
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700">Forgot Password</h2>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid email").required("Required"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          try {
            await resetPasswordRequest(values).then(() => {
              navigate("/");
              notification
                .success({
                  message: "verification link sent to the given email",
                  description: "Verify to reset password",
                })
                .catch((err) => {
                  notification.error({
                    message: err.message,
                  });
                });
            });
          } catch (err) {
            console.log(err);
          } finally {
            setSubmitting(false);
            resetForm();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mt-4">
            <FieldWrapper>
              <InputField
                type="email"
                name="email"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </FieldWrapper>

            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              className="mt-4 w-full"
            >
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>
      <Link to="/register" className="mt-4 text-blue-500 hover:underline block">
        Back to Register
      </Link>
    </div>
  );
};

const ResetPassword = () => {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700">Reset Password</h2>
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(6, "Must be at least 6 characters")
            .required("Required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .min(6, "Must be at least 6 characters")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          try {
            await resetPassword({ password: values.password }, token);
            notification.success({
              message: "Successful changed password",
              description: "please login",
            });

            navigate("/");
          } catch (err) {
            notification.error({
              message: err.message,
              description: "try again later",
            });
          } finally {
            setSubmitting(false);
            resetForm();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mt-4">
            <FieldWrapper>
              <InputField
                type="password"
                name="password"
                placeholder="Enter new Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </FieldWrapper>
            <FieldWrapper>
              <InputField
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </FieldWrapper>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              className="mt-4 w-full"
            >
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const InputField = (props) => (
  <Field {...props} className="w-full p-2 mt-2 border rounded-lg" />
);
const FieldWrapper = ({ children }) => <div className="h-16">{children}</div>;

export default App;
