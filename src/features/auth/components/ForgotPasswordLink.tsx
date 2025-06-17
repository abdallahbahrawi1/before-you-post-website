import Link from "next/link";

const ForgotPasswordLink = () => {
  return (
    <div className="flex justify-end mt-4">
      <Link href="#" className="text-purple-500 font-semibold hover:underline">
        Forgot password?
      </Link>
    </div>
  );
};

export default ForgotPasswordLink;
