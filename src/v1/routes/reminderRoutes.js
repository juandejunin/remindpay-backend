const express = require('express')
const { createReminder, readReminder, readOneReminder, updateReminder, deleteReminder } = require('../../controllers/reminderController')
// const { validateJwt, handleErrorAuthentication } = require('../../middlewares/tokenValidator')
const check = require('../../middlewares/auth')
const { reminderValidator } = require('../../middlewares/validators')

const routerReminder = express.Router()

const prueba = async (req, res) => {
  return res.send('Si llegaste  hasta aca es porque pudiste autenticarte exitosamente')
}

/**
 * @openapi
 * /api/v1/reminder/create:
 *   post:
 *     tags:
 *       - Create Reminder
 *     summary: Create a new reminder
 *     description: Create a new reminder with a remindername, price, and date.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               remindername:
 *                 type: string
 *                 example: My Reminder
 *               price:
 *                 type: number
 *                 example: 19.99
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2023-10-31
 *     security:
 *       - JWT: []
 *     responses:
 *       201:
 *         description: Reminder created
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
 *                   example: Reminder created
 *                 reminder:
 *                   type: object
 *                   properties:
 *                     remindername:
 *                       type: string
 *                       example: My Reminder
 *                     price:
 *                       type: number
 *                       example: 19.99
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: 2023-10-31
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
 *                   example: Reminder creation failed
 */

/**
 * @openapi
 * /api/v1/reminder/read:
 *   get:
 *     tags:
 *       - Read Reminders
 *     summary: Read all reminders
 *     description: Get all reminders for the authenticated user.
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Reminders found
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
 *                   example: Reminders found
 *                 reminders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       remindername:
 *                         type: string
 *                         example: My Reminder
 *                       price:
 *                         type: number
 *                         example: 19.99
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: 2023-10-31
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
 *                   example: Internal server error
 */

/**
 * @openapi
 * /api/v1/reminder/read/{id}:
 *   get:
 *     tags:
 *       - Read Reminder by ID
 *     summary: Read a reminder by ID
 *     description: Get a specific reminder by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the reminder to retrieve.
 *         schema:
 *           type: string
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Reminder found
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
 *                   example: Reminder found
 *                 reminder:
 *                   type: object
 *                   properties:
 *                     remindername:
 *                       type: string
 *                       example: My Reminder
 *                     price:
 *                       type: number
 *                       example: 19.99
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: 2023-10-31
 *       404:
 *         description: Reminder Not Found
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
 *                   example: Reminder not found
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
 *                   example: Internal server error
 */

/**
 * @openapi
 * /api/v1/reminder/update/{id}:
 *   put:
 *     tags:
 *       - Update Reminder
 *     summary: Update a reminder
 *     description: Update a reminder by ID with new data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the reminder to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               remindername:
 *                 type: string
 *                 example: Updated Reminder
 *               price:
 *                 type: number
 *                 example: 29.99
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2023-11-15
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Reminder updated
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
 *                   example: Reminder updated
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
 *                   example: Reminder update failed
 *       404:
 *         description: Reminder Not Found
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
 *                   example: Reminder not found
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
 *                   example: Internal server error
 */

/**
 * @openapi
 * /api/v1/reminder/delete/{id}:
 *   delete:
 *     tags:
 *       - Delete Reminder
 *     summary: Delete a reminder
 *     description: Delete a reminder by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the reminder to delete.
 *         schema:
 *           type: string
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Reminder deleted
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
 *                   example: Reminder deleted successfully
 *       404:
 *         description: Reminder Not Found
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
 *                   example: Reminder not found
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
 *                   example: Internal server error
 */

routerReminder.post('/create', check.auth, reminderValidator, createReminder)
routerReminder.get('/read', check.auth, readReminder)
routerReminder.get('/read/:id', check.auth, readOneReminder)
routerReminder.put('/update/:id', check.auth, updateReminder)
routerReminder.delete('/delete/:id', check.auth, deleteReminder)

module.exports = routerReminder
