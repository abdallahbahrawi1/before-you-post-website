
import '../styles/Footer.css';
import FooterColumn from './FooterColumn';
import SocialLinks from './SocialLinks';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <FooterColumn
          title="Supportify"
          content={
            <p>
              Join our community of creators supporting creators. Earn points, give support, and grow together in a positive environment.
            </p>
          }
          customContent={<SocialLinks />}
        />

        <FooterColumn
          title="Platform"
          links={[
            { label: 'Features', href: 'https://example.com/features' },
            { label: 'Pricing', href: 'https://example.com/pricing' },
            { label: 'Support', href: 'https://example.com/support' }
          ]}
        />

        <FooterColumn
          title="Company"
          links={[
            { label: 'About Us', href: 'https://example.com/about' },
            { label: 'Blog', href: 'https://example.com/blog' }
          ]}
        />

        <FooterColumn
          title="Legal"
          links={[
            { label: 'Terms', href: 'https://example.com/terms' },
            { label: 'Privacy', href: 'https://example.com/privacy' },
            { label: 'Cookies', href: 'https://example.com/cookies' },
            { label: 'Licenses', href: 'https://example.com/licenses' }
          ]}
        />
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Supportify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
