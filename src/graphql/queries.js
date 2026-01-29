// import { gql } from '@apollo/client';

// export const GET_REPOSITORIES = gql`
//   query {
//     repositories {
//       ${/* ... */}
//     }
//   }
// `;

// Exercise 10.11: fetching repositories with Apollo Client
import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
`;