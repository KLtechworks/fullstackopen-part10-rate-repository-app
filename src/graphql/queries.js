// import { gql } from '@apollo/client';

// export const GET_REPOSITORIES = gql`
//   query {
//     repositories {
//       ${/* ... */}
//     }
//   }
// `;

// Exercise 10.11: fetching repositories with Apollo Client
// import { gql } from '@apollo/client';

// export const GET_REPOSITORIES = gql`
//   query GetRepositories {
//     repositories {
//       edges {
//         node {
//           id
//           fullName
//           description
//           language
//           forksCount
//           stargazersCount
//           ratingAverage
//           reviewCount
//           ownerAvatarUrl
          
//         }
//       }
//     }
//   }
// `;

// Exercise 10.19: the single repository view
// import { gql } from '@apollo/client';

// export const GET_REPOSITORY = gql`
//   query Repository($id: ID!) {
//     repository(id: $id) {
//       id
//       fullName
//       description
//       language
//       forksCount
//       stargazersCount
//       ratingAverage
//       reviewCount
//       ownerAvatarUrl
//       url
//     }
//   }
// `;

// Exercise 10.20: repository's review list
import { gql } from '@apollo/client';

// Exercise 10.23: sorting the reviewed repositories list
// Exercise 10.24: filtering the reviewed repositories list

export const GET_REPOSITORIES = gql`
  query GetRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
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
          url
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;


// Exercise 10.27: infinite scrolling for reviews
export const GET_REPOSITORY = gql`
  query Repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

// Exercise 10.21: the review form
export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      id
      text
      rating
      createdAt
      repositoryId
      user {
        id
        username
      }
    }
  }
`;

// Exercise 10.22: the sign up form
export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      username
    }
  }
`;

// Exercise 10.25: the user's reviews view
export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
            repository {
              fullName
              url  
            }
          }
        }
      }
    }
  }
`;

// Exercise 10.26: review actions
export const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;

