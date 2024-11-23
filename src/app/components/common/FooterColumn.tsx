import React from 'react';
import FooterLink from './FooterLink';

interface FooterColumnProps {
  title: string;
  links?: { href: string; label: string }[];
  content?: React.ReactNode;
  customContent?: React.ReactNode;
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links = [], content, customContent }) => {
  return (
    <div className="footer-col">
      <h4>{title}</h4>
      {content}
      {customContent}
      <ul className="footer-links">
        {links.map((link, index) => (
          <FooterLink key={index} href={link.href} label={link.label} />
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;
