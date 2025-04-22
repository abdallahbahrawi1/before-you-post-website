import { FaRocket } from 'react-icons/fa';
import { CiFaceSmile, CiTrophy } from 'react-icons/ci';

const HowItWorks = () => (
  <section className="py-20 px-5 bg-white">
    <h2 className="text-center text-4xl font-extrabold mb-12 bg-gradient-to-r from-[#6B4DE6] to-[#FF7676] bg-clip-text text-transparent">
      How It Works
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
      {/* Decorative line */}
      <div className="absolute top-1/3 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-[#6B4DE6] to-[#FF7676] hidden md:block"></div>

      <div className="flex flex-col items-center text-center p-8 bg-white relative z-10">
        <div className="w-28 h-28 bg-[#6B4DE61A] rounded-full flex items-center justify-center mb-6 transition-transform duration-300 transform hover:translate-y-[-5px]">
          <CiFaceSmile className="text-purple-600 text-5xl hover:text-purple-800 transition-all duration-200" style={{ color: "purple" }} />
        </div>
        <h3 className="text-xl font-bold text-[#1B2D45] mb-4">Help Others</h3>
        <p className="text-base leading-7 text-[#1B2D45] opacity-80">Share your knowledge and engage with the community. Every meaningful interaction earns you valuable points.</p>
      </div>

      <div className="flex flex-col items-center text-center p-8 bg-white relative z-10">
        <div className="w-28 h-28 bg-[#6B4DE61A] rounded-full flex items-center justify-center mb-6 transition-transform duration-300 transform hover:translate-y-[-5px]">
          <CiTrophy className="text-purple-600 fill-current text-5xl hover:text-purple-800 transition-all duration-200" style={{ color: '#4169E1' }} />
        </div>
        <h3 className="text-xl font-bold text-[#1B2D45] mb-4">Earn Credits</h3>
        <p className="text-base leading-7 text-[#1B2D45] opacity-80">Watch your points stack up as you contribute. The more you help, the more credits you collect.</p>
      </div>

      <div className="flex flex-col items-center text-center p-8 bg-white relative z-10">
        <div className="w-28 h-28 bg-[#6B4DE61A] rounded-full flex items-center justify-center mb-6 transition-transform duration-300 transform hover:translate-y-[-5px]">
          <FaRocket className="text-purple-600 fill-current text-5xl hover:text-purple-800 transition-all duration-200" style={{ color: '#9B4DFF' }} />
        </div>
        <h3 className="text-xl font-bold text-[#1B2D45] mb-4">Boost Your Content</h3>
        <p className="text-base leading-7 text-[#1B2D45] opacity-80">Use your earned credits to promote your own content and increase visibility in the community.</p>
      </div>
    </div>
  </section>
);

export default HowItWorks;
