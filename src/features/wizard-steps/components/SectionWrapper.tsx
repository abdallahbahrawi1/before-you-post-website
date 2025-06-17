import { ReactNode } from 'react';

interface SectionWrapperProps {
  title: string;
  helpText?: string;
  children: ReactNode;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ title, helpText, children }) => (
  <div className="mb-8">
    <label className="block text-gray-700 font-semibold mb-4">
      {title}
      {helpText && (
        <span title={helpText} className="ml-2 text-gray-400 cursor-help">
          ?
        </span>
      )}
    </label>
    {children}
  </div>
);
