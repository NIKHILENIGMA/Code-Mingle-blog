import express from 'express'
import { getAllUsers, getFollowers, getUser, removeUser, updateUser } from '../controllers/user.controller'

const router = express.Router()


//? This TypeScript code snippet is setting up routes for a user-related API using Express. 

//@ route is a GET request to fetch a user's details. It calls the getUser controller function.
router.route('/users/:id').get(getUser)

//@ route is a GET request to fetch all user profiles. It calls the getAllUsers controller function.
router.route('/users').get(getAllUsers)

//@ route is a PATCH request to update a user's details. It calls the updateUser controller function.
router.route('/users/:id:').patch(updateUser)

//@ route is a DELETE request to delete a user profile. It calls the removeUser controller function.
router.route('/users/:id').delete(removeUser)

//@ route is a GET request to fetch a user's followers. It calls the getFollowers controller function.
router.route('/users/:id/followers').get(getFollowers)

//@ route is a GET request to fetch a user's following. It calls the getFollowing controller function.
router.route('/users/:id/following').get(getFollowers)

//@ route is a POST request to follow a user. It calls the followUser controller function.
router.route('/users/:id/follow').post(getFollowers)

//@ route is a DELETE request to unfollow a user. It calls the unfollowUser controller function.
router.route('/users/:id/unfollow').delete(getFollowers)

export default router
