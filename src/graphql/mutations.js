/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBlogpost = /* GraphQL */ `
  mutation CreateBlogpost(
    $input: CreateBlogpostInput!
    $condition: ModelBlogpostConditionInput
  ) {
    createBlogpost(input: $input, condition: $condition) {
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
export const updateBlogpost = /* GraphQL */ `
  mutation UpdateBlogpost(
    $input: UpdateBlogpostInput!
    $condition: ModelBlogpostConditionInput
  ) {
    updateBlogpost(input: $input, condition: $condition) {
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
export const deleteBlogpost = /* GraphQL */ `
  mutation DeleteBlogpost(
    $input: DeleteBlogpostInput!
    $condition: ModelBlogpostConditionInput
  ) {
    deleteBlogpost(input: $input, condition: $condition) {
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
