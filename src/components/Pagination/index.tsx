'use client'

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/payload/blocks/Form/_ui/pagination'

import React from 'react'
import canUseDOM from '@/payload/utilities/canUseDOM'
import { useRouter } from 'next/navigation'

export const Pagination: React.FC<{
  className?: string
  page: number
  totalItems: number
  pageSize: number
}> = (props) => {
  const router = useRouter()
  const { className, page, totalItems, pageSize } = props

  const totalPages = Math.ceil(totalItems / pageSize)

  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const hasExtraPrevPages = page - 1 > 1
  const hasExtraNextPages = page + 1 < totalPages

  const url = canUseDOM ? window.location.origin + window.location.pathname : ''

  return (
    <div className={className}>
      <PaginationComponent>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={!hasPrevPage}
              onClick={() => {
                router.push(`${url}?page=${page - 1}&pageSize=${pageSize}`)
              }}
            />
          </PaginationItem>

          {hasExtraPrevPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {hasPrevPage && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  router.push(`${url}?page=${page - 1}&pageSize=${pageSize}`)
                }}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink
              isActive
              onClick={() => {
                router.push(`${url}?page=${page}&pageSize=${pageSize}`)
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>

          {hasNextPage && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  router.push(`${url}?page=${page + 1}&pageSize=${pageSize}`)
                }}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {hasExtraNextPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              disabled={!hasNextPage}
              onClick={() => {
                router.push(`${url}?page=${page + 1}&pageSize=${pageSize}`)
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    </div>
  )
}
