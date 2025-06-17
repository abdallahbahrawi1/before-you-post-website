import FeaturesSection from "@/features/landing/components/FeaturesSection"
import Footer from "@/features/landing/components/Footer"
import HeroSection from "@/features/landing/components/HeroSection"
import HowItWorks from "@/features/landing/components/HowItWorks"

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