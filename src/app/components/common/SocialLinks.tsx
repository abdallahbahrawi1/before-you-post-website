import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { CiLinkedin, CiTwitter } from 'react-icons/ci';

const SocialLinks = () => (
  <div className="social-links">
    <a href="https://x.com/Abdallahbahraw1" className="social-icon" aria-label="Twitter">
      <CiTwitter size={20} color="#6B4DE6" />
    </a>
    <a href="https://www.instagram.com/abdallah.bahrawi/" className="social-icon" aria-label="Instagram">
      <FaInstagram size={20} color="#6B4DE6" />
    </a>
    <a href="https://www.linkedin.com/in/abdallahbahrawi/" className="social-icon" aria-label="LinkedIn">
      <CiLinkedin size={20} color="#6B4DE6" />
    </a>
  </div>
);

export default SocialLinks;
