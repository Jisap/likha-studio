import About from '@/components/sections/About'
import Collection from '@/components/sections/Collection'
import Configurator from '@/components/sections/Configurator'
import Contact from '@/components/sections/Contact'
import EditorialBreak from '@/components/sections/EditorialBreak'
import Film from '@/components/sections/Film'
import Footer from '@/components/sections/Footer'
import Gallery from '@/components/sections/Gallery'
import Hero from '@/components/sections/Hero'
import Industries from '@/components/sections/Industries'
import Marquee from '@/components/sections/Marquee'
import Mission from '@/components/sections/Mission'
import ParticleLogos from '@/components/sections/ParticleLogos'
import Pricing from '@/components/sections/Pricing'
import ShowCase from '@/components/sections/ShowCase'
import Statement from '@/components/sections/Statement'
import Stats from '@/components/sections/Stats'
import Testimonial from '@/components/sections/Testimonial'
import WhyUs from '@/components/sections/WhyUs'
import CurtainSection from '@/components/ui/CurtainSection'


const page = () => {
  return (
    <main>
      <Hero />
      <Mission />
      <Collection />
      <Testimonial />
      <Stats />
      <Marquee />
      <EditorialBreak />
      <WhyUs />
      <ShowCase />
      <CurtainSection>
        <Pricing />
      </CurtainSection>
      <CurtainSection>
        <Industries />
      </CurtainSection>
      <Statement />
      <Film />
      <Gallery />
      <About />
      <Configurator />
      <ParticleLogos />
      <Contact />
      <Footer />
    </main>
  )
}

export default page