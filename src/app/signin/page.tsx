import Divider from "../components/ui/Divider";
import ForgotPasswordLink from "../components/auth/ForgotPasswordLink";
import SocialSignInButtons from "../components/common/SocialSignInButtons";
import SignInForm from "../components/auth/SignInForm";
import AuthHeader from "../components/auth/AuthHeader";
import AuthLink from "../components/auth/AuthLink";

const SignIn = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-28 px-4 bg-gradient-to-br from-purple-100 to-red-100">
      <div className="bg-white p-12 rounded-2xl shadow-lg w-full max-w-sm">
        <AuthHeader title="Sign In" />
        <SignInForm />
        <ForgotPasswordLink />
        <Divider />
        <SocialSignInButtons />
        <AuthLink
          message="Don't have an account?"
          linkText="Sign Up"
          linkHref="/signup"
        />
      </div>
    </section>
  );
};

export default SignIn;
