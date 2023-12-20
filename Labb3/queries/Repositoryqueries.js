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
            stargazers {
              totalCount
            }
            watchers {
              totalCount
            }
            issues(states: OPEN) {
              totalCount
            }
            pullRequests(states: OPEN) {
              totalCount
            }
            languages(first: 5) {
              edges {
                node {
                  name
                }
              }
            }
            licenseInfo {
              key
              name
              spdxId
            }
          }
        }
      }
    }
  }
`;
