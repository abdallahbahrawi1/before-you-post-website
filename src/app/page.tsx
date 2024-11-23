import FeaturesSection from "./components/sections/FeaturesSection"
import Footer from "./components/common/Footer"
import HeroSection from "./components/sections/HeroSection"
import HowItWorks from "./components/sections/HowItWorks"

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <Footer />
    </>
  )
}

export default HomePage