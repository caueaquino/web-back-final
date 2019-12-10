const express = require('express');
const router = express.Router();
const CalendarController = require('../controller/CalendarController');
const auth = require('../util/auth');


router.get("/calendars", auth.optional, CalendarController.index);
router.get("/calendars/:id", auth.required, CalendarController.show);
router.post("/calendars", auth.optional, CalendarController.store);
router.delete("/calendars", auth.optional, CalendarController.delete);

module.exports = router;
