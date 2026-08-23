import Collection from '@/components/sections/Collection'
import EditorialBreak from '@/components/sections/EditorialBreak'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import Mission from '@/components/sections/Mission'
import Pricing from '@/components/sections/Pricing'
import ShowCase from '@/components/sections/ShowCase'
import Stats from '@/components/sections/Stats'
import Testimonial from '@/components/sections/Testimonial'
import WhyUs from '@/components/sections/WhyUs'


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
      <Pricing />
    </main>
  )
}

export default page