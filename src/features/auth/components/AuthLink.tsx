import Link from 'next/link'


interface AuthLinkProps {
  message: string;
  linkText: string;
  linkHref: string;
}

const AuthLink: React.FC<AuthLinkProps> = ({ message, linkText, linkHref }) => (
  <div className="text-center mt-6">
    <p className="text-blue-900">
      {message}{' '}
      <Link href={linkHref} className="text-purple-500 font-semibold hover:underline">
        {linkText}
      </Link>
    </p>
  </div>
);

export default AuthLink;
