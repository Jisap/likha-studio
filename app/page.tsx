import Collection from '@/components/sections/Collection'
import EditorialBreak from '@/components/sections/EditorialBreak'
import Film from '@/components/sections/Film'
import Hero from '@/components/sections/Hero'
import Industries from '@/components/sections/Industries'
import Marquee from '@/components/sections/Marquee'
import Mission from '@/components/sections/Mission'
import Pricing from '@/components/sections/Pricing'
import ShowCase from '@/components/sections/ShowCase'
import Statement from '@/components/sections/Statement'
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
      <Industries />
      <Statement />
      <Film />
    </main>
  )
}

export default page