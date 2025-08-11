import AuthHeader from "@/features/auth/components/AuthHeader";
import AuthLink from "@/features/auth/components/AuthLink";
import SignUpForm from "@/features/auth/components/SignUpForm";
import SocialSignInButtons from "@/features/auth/components/SocialSignInButtons";
import Divider from "@/ui/layout/Divider";

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
