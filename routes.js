const express = require('express');
const userController =require('./controller/userController');
const eventController = require('./controller/eventController');
const jwt = require('./Middleware/jwtMiddleware');
const router = new express.Router();

//register
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController)

//addevents
router.post('/addevent',jwt,eventController.addEventController)

//Get user created events
router.get('/userevents',jwt,eventController.userEventController)

//edit event
router.put('/editevent/:id',jwt,eventController.editEventController)

//to get allevents
router.get('/allevents',jwt,eventController.getAllEventsController)

//delete
router.delete('/delete/:id',eventController.deleteEventController)

module.exports = router
