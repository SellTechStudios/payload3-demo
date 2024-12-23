import Link from 'next/link'
import React from 'react'
import type { Footer, Settings } from '@/payload-types'
import { BsTwitterX } from 'react-icons/bs'
import { FaLinkedin, FaPinterest, FaSquareInstagram } from 'react-icons/fa6'
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  TagIcon,
  TruckIcon,
} from '@heroicons/react/24/outline'
import { Container } from '@/components/Container'
import { getCachedGlobal } from '@/payload/utilities/getGlobals'

export async function Footer() {
  const settings: Settings = await getCachedGlobal('settings', 1)()

  return (
    <footer className="py-24 bg-gray-100 text-gray-800 text-opacity-75 font-light">
      <Container className="flex flex-col gap-24 ">
        {/* delivery info */}
        <div className="flex flex-row justify-center gap-40">
          <div className="flex flex-col items-center prose">
            <TruckIcon className="size-16" />
            <h3 className="text-gray-900">Darmowa Dostawa</h3>
            <div>dla zamówień powyżej 200 zł</div>
          </div>

          <div className="flex flex-col items-center prose">
            <TagIcon className="size-16" />
            <h3 className="text-gray-900">Tanie Dostawy</h3>
            <div>Orlen Paczka: 8.50 zł</div>
            <div>Paczkomaty InPost: 13.00 zł</div>
          </div>

          <div className="flex flex-col items-center prose">
            <TruckIcon className="size-16" />
            <h3 className="text-gray-900">Darmowa Dostawa</h3>
            <div>dla zamówień powyżej 200 zł</div>
          </div>
        </div>

        {/* footer */}
        <nav className="container flex flex-row items-start justify-between mx-auto align-top">
          {/* contact info */}
          <div className="flex flex-col gap-6  text-sm">
            <img src="/logo.png" width={140} height={60} alt="Mediapart Logo" />
            <div className="flex flex-row items-center gap-2">
              <MapPinIcon className="size-4" />
              <span>
                {settings.addressLine1}
                <br />
                {settings.addressLine2}
              </span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <PhoneIcon className="size-4" />
              <Link
                prefetch={false}
                href={`tel: ${settings.phone}`}
                className="hover:text-orange-700"
              >
                {settings.phone}
              </Link>
            </div>
            <div className="flex flex-row items-center gap-2">
              <EnvelopeIcon className="size-4" />
              <Link
                prefetch={false}
                href={`mailto:${settings.email}`}
                className="hover:text-orange-700"
              >
                {settings.email}
              </Link>
            </div>
          </div>

          <nav className="flex flex-col prose">
            <h5 className="mb-4 text-gray-900 uppercase">Informacje</h5>
            <div className="flex flex-col text-sm gap-6">
              <Link
                prefetch={false}
                className="no-underline font-light hover:text-orange-700"
                href="#"
              >
                Polityka Prywatności
              </Link>
              <Link
                prefetch={false}
                className="no-underline font-light hover:text-orange-700"
                href="#"
              >
                Regulamin
              </Link>
              <Link
                prefetch={false}
                className="no-underline font-light hover:text-orange-700"
                href="#"
              >
                Dostawy
              </Link>
              <Link className="no-underline font-light hover:text-orange-700" href="#">
                Płatności
              </Link>
              <Link
                prefetch={false}
                className="no-underline font-light hover:text-orange-700"
                href="#"
              >
                Zwroty i reklamacje
              </Link>
              <Link
                prefetch={false}
                className="no-underline font-light hover:text-orange-700"
                href="#"
              >
                Odstąpienie od umowy
              </Link>
            </div>
          </nav>

          <nav className="flex flex-col prose">
            <h5 className="mb-4 text-gray-900 uppercase">Przydatne linki</h5>
            <div className="flex flex-col text-sm gap-6">
              <Link
                prefetch={false}
                className="no-underline font-light hover:text-orange-700"
                href="login"
              >
                Logowanie
              </Link>
              <Link
                prefetch={false}
                className="no-underline font-light hover:text-orange-700"
                href="#"
              >
                Blog
              </Link>
              <Link
                prefetch={false}
                className="no-underline font-light hover:text-orange-700"
                href="#"
              >
                Status Zamówienia
              </Link>
              <Link
                prefetch={false}
                className="no-underline font-light hover:text-orange-700"
                href="#"
              >
                Mapa Strony
              </Link>
            </div>
          </nav>

          <nav className="flex flex-col prose">
            <h5 className="mb-4 text-gray-900 uppercase">Zobacz więcej</h5>
            <div className="flex flex-col text-sm gap-6">
              <div className="flex flex-row items-center gap-2">
                <PhoneIcon className="size-4" />
                <Link
                  prefetch={false}
                  className="no-underline font-light hover:text-orange-700"
                  href="https://www.facebook.com"
                  target="_blank"
                >
                  Facebook
                </Link>
              </div>
              <div className="flex flex-row items-center gap-2">
                <FaSquareInstagram />
                <Link
                  prefetch={false}
                  className="no-underline font-light hover:text-orange-700"
                  href="https://www.facebook.com"
                  target="_blank"
                >
                  Instagram
                </Link>
              </div>
              <div className="flex flex-row items-center gap-2">
                <FaLinkedin />
                <Link
                  prefetch={false}
                  className="no-underline font-light hover:text-orange-700"
                  href="https://www.linkedin.com"
                  target="_blank"
                >
                  LinkedIn
                </Link>
              </div>
              <div className="flex flex-row items-center gap-2">
                <BsTwitterX />
                <Link
                  prefetch={false}
                  className="no-underline font-light hover:text-orange-700"
                  href="https://www.x.com"
                  target="_blank"
                >
                  X / Twitter
                </Link>
              </div>
              <div className="flex flex-row items-center gap-2">
                <FaPinterest />
                <Link
                  prefetch={false}
                  className="no-underline font-light hover:text-orange-700"
                  href="https://www.x.com"
                  target="_blank"
                >
                  Pinterest
                </Link>
              </div>
            </div>
          </nav>
        </nav>
      </Container>
    </footer>
  )
}
