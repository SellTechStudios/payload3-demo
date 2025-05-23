'use client'

import type { PayloadAdminBarProps } from 'payload-admin-bar'

import { cn } from '@/payload/utilities/cn'
import { useRouter, useSelectedLayoutSegments } from 'next/navigation'
import { PayloadAdminBar } from 'payload-admin-bar'
import React from 'react'

import './index.scss'

import { getClientSideURL } from '@/payload/utilities/getURL'
import { useAuth } from '@/providers/Auth'

const baseClass = 'admin-bar'

const collectionLabels = {
  pages: {
    plural: 'Pages',
    singular: 'Page',
  },
  posts: {
    plural: 'Posts',
    singular: 'Post',
  },
  projects: {
    plural: 'Projects',
    singular: 'Project',
  },
}

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  const segments = useSelectedLayoutSegments()

  const router = useRouter()
  const { user } = useAuth()

  const allowedRoles = ['admin', 'pim-manager', 'content-editor']
  const show = !!user?.roles?.some((role) => allowedRoles.includes(role))
  const collection = collectionLabels?.[segments?.[1]] ? segments?.[1] : 'pages'

  if (!show) return null

  return (
    <div className={cn(baseClass, 'py-2 bg-black text-white')}>
      <div className="container">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{
            controls: 'font-medium text-white',
            logo: 'text-white',
            user: 'text-white',
          }}
          cmsURL={getClientSideURL()}
          collection={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || 'Pages',
            singular: collectionLabels[collection]?.singular || 'Page',
          }}
          logo={<Title />}
          onPreviewExit={() => {
            fetch('/next/exit-preview').then(() => {
              router.push('/')
              router.refresh()
            })
          }}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
        />
      </div>
    </div>
  )
}
