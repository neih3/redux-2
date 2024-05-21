import { Box, Grid } from '@mui/material'
import RecipeReviewCard from 'Components/RecipeReviewCard/RecipeReviewCard'
import { deletePost, startEditPost } from 'Components/blog.slice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'

const PostList = () => {
  const postList = useSelector((state: RootState) => state.blog.postList)
  const dispatch = useDispatch()
  const handleDelete = (postId: string) => {
    dispatch(deletePost(postId))
  }

  const handleStartEditing = (postId: string) => {
    dispatch(startEditPost(postId))
  }
  console.log(postList)
  return (
    <Grid container spacing={2}>
      {postList.map((post) => {
        return (
          <Grid xs={3} key={post.id}>
            <RecipeReviewCard
              post={post}
              key={post.id}
              handleDelete={handleDelete}
              handleStartEditing={handleStartEditing}
            ></RecipeReviewCard>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default PostList
