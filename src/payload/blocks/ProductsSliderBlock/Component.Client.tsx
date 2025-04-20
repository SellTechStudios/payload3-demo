'use client'

import 'swiper/css'
import 'swiper/css/navigation'

import { Autoplay, FreeMode, Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { NavigationOptions, Swiper as SwiperType } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useEffect, useRef } from 'react'

import { ProductCard } from '@/components/Product/Card/ProductCard'
import { ProductItem } from '@/db/products/queries.types'

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
  products: ProductItem[] | undefined
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
          <SwiperSlide key={p.slug} className="!h-auto">
            <ProductCard product={p} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        ref={prevRef}
        className="top-1/2 -left-5 z-10 absolute flex justify-center items-center bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full w-10 h-10 text-white transition-opacity -translate-y-1/2 duration-200 transform"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        ref={nextRef}
        className="top-1/2 -right-5 z-10 absolute flex justify-center items-center bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full w-10 h-10 text-white transition-opacity -translate-y-1/2 duration-200 transform"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}
