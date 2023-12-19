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

export const GET_REPOSITORY_DETAILS = gql`
  query GetRepositoryDetails($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      name
      description
      stargazers {
        totalCount
      }
      forks {
        totalCount
      }
      licenseInfo {
        name
      }
      defaultBranchRef {
        target {
          ... on Commit {
            history {
              totalCount
            }
          }
        }
      }
      refs(refPrefix: "refs/heads/") {
        totalCount
      }
    }
  }
`;
