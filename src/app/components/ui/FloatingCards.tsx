// components/FloatingCards.tsx
import React from 'react';
import FloatingCard from './FloatingCard';
import { FiCheckCircle, FiStar, FiSmile } from 'react-icons/fi';

const FloatingCards: React.FC = () => {
  return (
    <div className="visual flex items-center justify-center relative">
      <div className="floating-cards relative w-full h-full">
        <FloatingCard
          icon={<FiCheckCircle className="text-purple" />}
          text="Points Earned: 150"
          position="top-[20%] left-[10%]"
        />
        <FloatingCard
          icon={<FiStar className="text-coral" />}
          text="5 Star Rating"
          position="top-[50%] right-[5%]"
          delay="delay-1000"
        />
        <FloatingCard
          icon={<FiSmile className="text-mint" />}
          text="Community Level 5"
          position="bottom-[20%] left-[20%]"
          delay="delay-2000"
        />
      </div>
    </div>
  );
};

export default FloatingCards;
