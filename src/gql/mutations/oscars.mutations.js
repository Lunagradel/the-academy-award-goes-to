import gql from 'graphql-tag'

export const createUserwVotes = gql`
  mutation CreateUser($name: String!, $votes: [VoteInput]!) {
    addUserwVotes(name: $name, votes: $votes) {
      name
      votes {
          category
          willWin
      }
    }
  }
`;

export const updCategorywWinner = gql`
  mutation setWinner($categoryID: ID!, $nomineeID: ID!) {
    updateCategorywWinner(categoryID: $categoryID, nomineeID: $nomineeID) {
      id
    }
  }
`;