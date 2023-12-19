import { gql } from "@apollo/client";

export const GET_TRENDING_REPOSITORIES = gql`
  query GetTrendingRepositories($queryString: String!, $first: Int = 10) {
    search(query: $queryString, type: REPOSITORY, first: $first) {
      edges {
        node {
          ... on Repository {
            id
            name
            description
            owner {
              login
            }
            stargazers {
              totalCount
            }
            url
            primaryLanguage {
              name
            }
            createdAt
          }
        }
      }
    }
  }
`;
