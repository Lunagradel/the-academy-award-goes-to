import gql from 'graphql-tag'

export const GETCATEGORIES = gql`
  query Categories {
  categories {
    id
    title
    nominees {
      id
      film
      persons
    }
    isFilmNominated
  }
}
`