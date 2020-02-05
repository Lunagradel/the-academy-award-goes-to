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
    winner
  }
}
`

export const GETCATEGORIESWITHWINNERS = gql`
  query CategoriesWithWinners {
  categoriesWithWinners {
    id
    title
    winner
  }
}
`

export const GETUSERS = gql`
  query Users {
  users {
    id
    name
    votes {
      category
      willWin
      shouldWin
    }
  }
}
`

export const GETUSER = gql`
  query User($id: ID!) {
  user(id: $id) {
    id
    name
    votes {
      category
      willWin
      shouldWin
    }
  }
}
`