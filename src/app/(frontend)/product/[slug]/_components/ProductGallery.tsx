/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
'use client'

import 'swiper/css'
import 'swiper/css/navigation'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useEffect, useRef, useState } from 'react'

import { Navigation } from 'swiper/modules'
import { Product } from '@/payload-types'
import { Swiper as SwiperType } from 'swiper/types'

type ProductGalleryProps = {
  product: Product
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ product }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(product?.mediaImages?.[0]?.url || '')
  const swiperRef = useRef<SwiperType>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.params) {
      const swiper = swiperRef.current
      // @ts-ignore
      swiper.params.navigation.prevEl = prevRef.current
      // @ts-ignore
      swiper.params.navigation.nextEl = nextRef.current
      swiper.navigation.destroy()
      swiper.navigation.init()
      swiper.navigation.update()
    }
  }, [])

  return (
    <div>
      <div className="relative pb-[100%] w-full">
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected Product Image"
            className="top-0 left-0 absolute rounded-lg w-full"
            width={100}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="relative">
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          modules={[Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          className="mt-4"
        >
          {product.mediaImages?.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative pb-[100%] w-full h-0">
                <img
                  onClick={() => img.url && setSelectedImage(img.url)}
                  className="top-0 left-0 absolute rounded-lg w-full h-full object-cover cursor-pointer"
                  src={img.url}
                  alt={`Product Image ${i + 1}`}
                  width={100}
                  height={100}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          ref={prevRef}
          className="top-1/2 -left-3 z-10 absolute flex justify-center items-center bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full w-8 h-8 text-white transition-opacity -translate-y-1/2 duration-200 transform"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          ref={nextRef}
          className="top-1/2 -right-3 z-10 absolute flex justify-center items-center bg-black bg-opacity-50 hover:bg-opacity-100 rounded-full w-8 h-8 text-white transition-opacity -translate-y-1/2 duration-200 transform"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
