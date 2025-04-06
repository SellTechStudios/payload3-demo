export const quickSearch = (searchString: string) => ({
  $search: {
    index: 'quick-search-index',
    text: {
      query: searchString,
      path: 'name',
    },
  },
})
