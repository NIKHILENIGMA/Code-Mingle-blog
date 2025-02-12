import { Router } from 'express'
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from './category.controller'
import { validateBody, validateParams } from '@/middleware'
import { CategoryBodySchema, CategoryParamsSchema } from './category.schema'

const router = Router()

/**
 * Route for creating a new category.
 *
 * @description: This route is used to create a new category.
 * @method POST
 * @param {string} path - /api/admin/category/new
 * @param {function} createCategory - Controller function to create a new category.
 */
router.route('/new').post(validateBody(CategoryBodySchema), createCategory)

/**
 * Route for updating a category.
 *
 * @description: This route is used to update a category.
 * @method PUT
 * @param {string} path - /api/admin/category/:id
 * @param {function} updateCategory - Controller function to update a category.
 */
router.route('/:id').put(validateParams(CategoryParamsSchema), validateBody(CategoryBodySchema), updateCategory)

/**
 * Route for deleting a category.
 *
 * @description: This route is used to delete a category.
 * @method DELETE
 * @param {string} path - /api/admin/category/:id
 * @param {function} deleteCategory - Controller function to delete a category.
 */
router.route('/:id').delete(validateParams(CategoryParamsSchema), deleteCategory)

/**
 * Route for getting a category.
 *
 * @description: This route is used to get a category.
 * @method GET
 * @param {string} path - /api/admin/category/:id
 * @param {function} getCategory - Controller function to get a category.
 */
router.route('/:id').get(validateParams(CategoryParamsSchema), getCategory)

/**
 * Route for getting all categories.
 *
 * @description: This route is used to get all categories.
 * @method GET
 * @param {string} path - /api/admin/category/:id
 * @param {function} getCategories - Controller function to get all categories.
 */
router.route('/').get(getCategories)


export default router
