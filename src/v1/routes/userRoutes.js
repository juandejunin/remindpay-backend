const express = require('express')
const { registerUser, loginUser, verifyEmail, deleteUser } = require('../../controllers/userController')
const { registroValidator, loginValidator } = require('../../middlewares/validators')
const check = require('../../middlewares/auth')

const routerAuth = express.Router()

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Register User
 *     summary: Register a new user
 *     description: Register a new user with a username, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: username
 *               email:
 *                 type: string
 *                 format: email
 *                 example: email@gmail.com
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: User created
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: User registration failed
 */

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - User Login
 *     summary: User login
 *     description: Log in a user with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: email@gmail.com
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: User logged in successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: user_id
 *                     name:
 *                       type: string
 *                       example: user_name
 *                     nick:
 *                       type: string
 *                       example: user_nickname
 *                 token:
 *                   type: string
 *                   example: your_access_token
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: User login failed
 */

/**
 * @openapi
 * /api/v1/auth/verify-email/{cryptoToken}:
 *   get:
 *     tags:
 *       - Verify Email
 *     summary: Verify user's email
 *     description: Verify a user's email using a cryptographic token.
 *     parameters:
 *       - in: path
 *         name: cryptoToken
 *         required: true
 *         description: The cryptographic token received in the email.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: email@gmail.com
 *                 username:
 *                   type: string
 *                   example: username
 *                 verified:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Email verification failed
 *       302:
 *         description: Redirect to appropriate page
 */

/**
 * @openapi
 * /api/v1/auth/delete-user/{id}:
 *   delete:
 *     tags:
 *       - Delete User
 *     summary: Delete a user
 *     description: Delete a user account by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Unauthorized You do not have permission to delete this user
 *       404:
 *         description: User Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Server error
 */

routerAuth.route('/register').post(registroValidator, registerUser)
routerAuth.route('/login').post(loginValidator, loginUser)
routerAuth.route('/user/verify/:cryptoToken').get(verifyEmail)
routerAuth.delete('/delete/:id', check.auth, deleteUser)

module.exports = routerAuth
