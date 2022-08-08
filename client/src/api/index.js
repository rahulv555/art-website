import axios from 'axios'

const API = axios.create({baseURL:'http://localhost:5000'}) //the backend route
// const API = axios.create({baseURL:'https://art-website-project.herokuapp.com/posts'})


//IMPORTANT - for req.headers.authorization 
API.interceptors.request.use((req) => { //happens on each, before all requests
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });


export const fetchPosts = (page) => API.get(`/posts?page=${page}`)  //fetches all the posts 
export const fetchPost = (id)=>API.get(`/posts/${id}`)
export const createPost = (newPost)=>API.post('/posts', newPost) 
export const updatePost = (id, updatedPost)=>API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id)=>API.delete(`/posts/${id}`)
export const likePost = (id)=>API.patch(`/posts/${id}/likePost`);
export const fetchPostsBySearch = (searchQuery)=>API.get(`/posts/search?searchQuery=${searchQuery || 'none'}`)

export const comment = (comment, id)=>API.post(`/posts/${id}/commentPost`, {comment})

export const getAuthor = (id)=>API.get(`/author/${id}`)
export const getPostsByAuthor = (id)=>API.get(`/author/${id}/posts`)
export const updateAuthor = (id, authorData)=>API.patch(`/author/${id}`, authorData)

export const signIn = (formData)=>API.post('/user/signin', formData)
export const signUp = (formData)=>API.post('/user/signup', formData)