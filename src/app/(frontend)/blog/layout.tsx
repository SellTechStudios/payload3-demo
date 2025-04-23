import { Container } from '@/components/Container'
import { PostsTrendingList } from './_components/PostsTrendingList'
import React from 'react'
import Section from '@/components/Section/Section'
import { TagsCloud } from './_components/PostsTagsCloud'

const PostsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Container className="pt-18 md:pt-22">
      <div className="flex min-h-screen gap-x-4 md:flex-row flex-col">
        <main className="w-2/3 flex-none">{children}</main>
        <aside className="w-1/3 flex-none flex-col gap-12 bg-gray-200 p-4">
          <Section>
            <Section.Header>
              <h5 className="text-header5">Trending posts</h5>
            </Section.Header>
            <Section.Content>
              <PostsTrendingList />
            </Section.Content>
          </Section>

          <Section>
            <Section.Header>
              <h5 className="text-header5">Browse other tags</h5>
            </Section.Header>
            <Section.Content>
              <TagsCloud />
            </Section.Content>
          </Section>
        </aside>
      </div>
    </Container>
  )
}

export default PostsLayout
