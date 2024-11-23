import Divider from "../ui/Divider";

import { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
  footerMessage: string;
  footerLinkText: string;
  footerLinkHref: string;
}

const AuthLayout = ({ title, children, footerMessage, footerLinkText, footerLinkHref }: AuthLayoutProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center py-28 px-4 bg-gradient-to-br from-purple-100 to-red-100">
      <div className="bg-white p-12 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        {children}
        <Divider />
        <p className="mt-6 text-sm text-gray-600">
          {footerMessage}{" "}
          <a href={footerLinkHref} className="text-purple-500 font-semibold">
            {footerLinkText}
          </a>
        </p>
      </div>
    </section>
  );
};

export default AuthLayout;
