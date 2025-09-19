
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import SocialLogin from "@/components/auth/SocialLogin";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <img
            src="/lovable-uploads/f3c0216f-c271-49c7-88f8-87616e547aca.png"
            alt="TicketAra"
            className="h-14 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Sign in to your account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link to="/signup" className="font-medium text-morocco-red hover:text-morocco-red/80">
              create a new account
            </Link>
          </p>
        </div>

        <LoginForm />
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
