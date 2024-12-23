export const quickSearch = (searchString: string) => ({
  $search: {
    index: 'facets',
    text: {
      query: searchString,
      path: 'name',
    },
  },
})
