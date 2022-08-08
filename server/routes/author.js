import express from 'express'
import {getAuthor, getPostsByAuthor, updateAuthor} from '../controllers/author.js'
const router = express.Router()

router.get('/:id', getAuthor)
router.get('/:id/posts', getPostsByAuthor)
router.patch('/:id', updateAuthor)


export default router