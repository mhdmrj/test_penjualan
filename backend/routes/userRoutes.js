import express from 'express'
const router = express.Router()
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUsers,
  getUserById,
  updateUser,
} from '../controllers/userController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

router.post('/masuk', authUser)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router.route('/').post(registerUser).get(protect, admin, getUsers)

router.route('/:id')
.delete(protect, admin, deleteUsers)
.get(protect, admin, getUserById)
.put(protect, admin, updateUser)

export default router