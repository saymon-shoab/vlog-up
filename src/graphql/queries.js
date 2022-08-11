/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBlogpost = /* GraphQL */ `
  query GetBlogpost($id: ID!) {
    getBlogpost(id: $id) {
      id
      title
      content
      username
      coverImage
      createdAt
      updatedAt
    }
  }
`;
export const listBlogposts = /* GraphQL */ `
  query ListBlogposts(
    $filter: ModelBlogpostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogposts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        username
        coverImage
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const blogsByUsername = /* GraphQL */ `
  query BlogsByUsername(
    $username: String!
    $sortDirection: ModelSortDirection
    $filter: ModelBlogpostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    blogsByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        content
        username
        coverImage
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
