/* eslint-disable @next/next/no-img-element */
'use client'

import 'swiper/css'
import 'swiper/css/navigation'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useEffect, useRef, useState } from 'react'

import { Navigation } from 'swiper/modules'
import { ProductDetails } from '@/db/products/detailsQueries'
import { Swiper as SwiperType } from 'swiper/types'

type ProductGalleryProps = {
  product: ProductDetails
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
      <div className="relative w-full pb-[100%]">
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected Product Image"
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            width={100}
            height={100}
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
              <div className="relative w-full h-0 pb-[100%]">
                <img
                  onClick={() => img.url && setSelectedImage(img.url)}
                  className="absolute top-0 left-0 object-cover w-full h-full rounded-lg cursor-pointer"
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
          className="absolute top-1/2 -left-3 transform -translate-y-1/2 z-10
          w-8 h-8 rounded-full bg-black bg-opacity-50 flex items-center justify-center
          text-white transition-opacity duration-200 hover:bg-opacity-100"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          ref={nextRef}
          className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-10
          w-8 h-8 rounded-full bg-black bg-opacity-50 flex items-center justify-center
          text-white transition-opacity duration-200 hover:bg-opacity-100"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
