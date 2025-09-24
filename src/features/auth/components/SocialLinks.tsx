import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { CiLinkedin, CiTwitter } from 'react-icons/ci';

const SocialLinks = () => (
  <div className="social-links">
    <a 
      href="https://x.com/Abdallahbahraw1" 
      className="social-icon" 
      aria-label="X (formerly Twitter)"
      target="_blank"
      rel="noopener noreferrer"
      title="X (formerly Twitter)"
    >
      <CiTwitter size={20} color="#6B4DE6" />
    </a>
    <a 
      href="https://www.instagram.com/abdallah.bahrawi/" 
      className="social-icon" 
      aria-label="Instagram"
      target="_blank"
      rel="noopener noreferrer"
      title="Instagram"
    >
      <FaInstagram size={20} color="#6B4DE6" />
    </a>
    <a 
      href="https://www.linkedin.com/in/abdallahbahrawi/" 
      className="social-icon" 
      aria-label="LinkedIn"
      rel="noopener noreferrer"
      title="LinkedIn"
    >
      <CiLinkedin size={20} color="#6B4DE6" />
    </a>
  </div>
);

export default SocialLinks;
