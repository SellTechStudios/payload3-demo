'use client'

import 'swiper/css'
import 'swiper/css/navigation'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Autoplay, FreeMode, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ProductSliderItem } from '@/db/products/sliderQueries'
import { NavigationOptions, Swiper as SwiperType } from 'swiper/types'
import { ProductSliderElement } from './_components/ProductSliderItem'

const breakpoints = {
  640: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
  1280: {
    slidesPerView: 4,
    spaceBetween: 40,
  },
}

type ProductsSliderClientProps = {
  products: ProductSliderItem[] | undefined
}

export const ProductsSliderClient = (props: ProductsSliderClientProps) => {
  const { products } = props
  const swiperRef = useRef<SwiperType>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      ;(swiperRef.current.params.navigation as NavigationOptions).prevEl = prevRef.current
      ;(swiperRef.current.params.navigation as NavigationOptions).nextEl = nextRef.current
      swiperRef.current.navigation.init()
      swiperRef.current.navigation.update()
    }
  }, [])

  if (!products) {
    return <p>Brak produktów do wyświetlenia.</p>
  }

  return (
    <div className="relative">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        slidesPerView={4}
        spaceBetween={30}
        modules={[FreeMode, Navigation, Autoplay]}
        autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        loop={products.length >= 4}
        breakpoints={breakpoints}
      >
        {products.map((p) => (
          <SwiperSlide key={p.id} className="!h-auto">
            <ProductSliderElement product={p} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        ref={prevRef}
        className="absolute top-1/2 -left-5 transform -translate-y-1/2 z-10
          w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center
          text-white transition-opacity duration-200 hover:bg-opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        ref={nextRef}
        className="absolute top-1/2 -right-5 transform -translate-y-1/2 z-10
          w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center
          text-white transition-opacity duration-200 hover:bg-opacity-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}
