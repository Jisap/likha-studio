import Collection from '@/components/sections/Collection'
import Hero from '@/components/sections/Hero'
import Mission from '@/components/sections/Mission'
import Stats from '@/components/sections/Stats'
import Testimonial from '@/components/sections/Testimonial'


const page = () => {
  return (
    <main>
      <Hero />
      <Mission />
      <Collection />
      <Testimonial />
      <Stats />
    </main>
  )
}

export default page