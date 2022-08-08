import express from 'express'
import {getPosts, getPostsBySearch, createPost, updatePost, deletePost, likePost, getPost, commentPost} from '../controllers/posts.js'
const router = express.Router()


//middleware
import auth from '../middleware/auth.js'



router.get('/', getPosts);
router.get('/search', getPostsBySearch)
router.get('/:id', getPost)
router.post('/',auth, createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id',auth, deletePost)
router.patch('/:id/likePost',auth, likePost)
router.post('/:id/commentPost', auth, commentPost)



export default router