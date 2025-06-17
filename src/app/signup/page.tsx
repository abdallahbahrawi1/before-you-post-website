import Divider from "../../components/ui/Divider";
import SocialSignInButtons from "../../components/common/SocialSignInButtons";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthLink from "../../components/auth/AuthLink";
import SignUpForm from "../../components/auth/SignUpForm";

const SignUp = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-28 px-4 bg-gradient-to-br from-purple-100 to-red-100">
      <div className="bg-white p-12 rounded-2xl shadow-lg w-full max-w-sm">
        <AuthHeader title="Create Account" />
        <SignUpForm />
        <Divider text="or sign up with" />
        <SocialSignInButtons />
        <AuthLink
          message="Already have an account?"
          linkText="Sign In"
          linkHref="/signin"
        />
      </div>
    </section>
  );
};

export default SignUp;
