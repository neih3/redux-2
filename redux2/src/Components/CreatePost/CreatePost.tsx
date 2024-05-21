import { addPost, cancelEditingPost, finishEditingPost } from 'Components/blog.slice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { Post } from 'types/blog.type'

const CreatePost = () => {
  const initialState: Post = {
    title: '',
    description: '',
    publishDate: '',
    id: '',
    featuredImage: '',
    published: false
  }

  const [formData, setFormData] = React.useState<Post>(initialState)
  const editingPost = useSelector((state: RootState) => state.blog.editingPost)
  const dispatch = useDispatch()

  useEffect(() => {
    setFormData(editingPost || initialState) //nếu  editing post là null thì là initial state
  }, [editingPost])
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (editingPost) {
      dispatch(finishEditingPost(formData))
    } else {
      const data = {
        ...formData,
        id: new Date().toString()
      }
      dispatch(addPost(data))
    }
    setFormData(initialState)
  }

  const handleCancelEditingPost = () => {
    dispatch(cancelEditingPost())
  }

  return (
    <div style={{ marginBottom: 30, display: 'flex', justifyContent: 'center' }}>
      <form
        onSubmit={handleSubmit}
        onReset={handleCancelEditingPost}
        action=''
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          padding: 10,
          margin: 10,
          border: '1px solid black',
          borderRadius: 10,
          width: 300,
          height: 300,
          backgroundColor: 'white',
          boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div>
          <label htmlFor=''>Title: </label>
          <input
            onChange={(e: any) => {
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }}
            value={formData.title}
            type='text'
          />
        </div>
        <div>
          <label htmlFor=''>FeaturedImage: </label>
          <input
            type='text'
            onChange={(e: any) => {
              setFormData((prev) => ({ ...prev, featuredImage: e.target.value }))
            }}
            value={formData.featuredImage}
          />
        </div>
        <div>
          <label htmlFor=''>Description: </label>
          <input
            type='text'
            onChange={(e: any) => {
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }}
            value={formData.description}
          />
        </div>
        <div>
          <label htmlFor=''> PublishDate: </label>
          <input
            type='date'
            onChange={(e: any) => {
              setFormData((prev) => ({ ...prev, publishDate: e.target.value }))
            }}
            value={formData.publishDate}
          />
        </div>
        <div>
          <label htmlFor=''> Publish: </label>
          <input
            type='checkbox'
            onChange={(e: any) => {
              setFormData((prev) => ({ ...prev, published: e.target.checked }))
            }}
            checked={formData.published}
          />
        </div>
        {editingPost && (
          <>
            <button type='submit'>Update Post</button>
            <button type='reset'>Cance</button>
          </>
        )}
        {!editingPost && <button type='submit'>Publish Post</button>}
      </form>
    </div>
  )
}

export default CreatePost
