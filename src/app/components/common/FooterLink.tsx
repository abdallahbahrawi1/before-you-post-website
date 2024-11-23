import React from 'react';

interface FooterLinkProps {
  href: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, label }) => (
  <li>
    <a href={href}>{label}</a>
  </li>
);

export default FooterLink;
