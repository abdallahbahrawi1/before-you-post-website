import AuthHeader from "@/features/auth/components/AuthHeader";
import AuthLink from "@/features/auth/components/AuthLink";
import ForgotPasswordLink from "@/features/auth/components/ForgotPasswordLink";
import SignInForm from "@/features/auth/components/SignInForm";
import SocialSignInButtons from "@/features/auth/components/SocialSignInButtons";
import Divider from "@/ui/layout/Divider";

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
