const mongoose = require("mongoose");
const Calendar = require("../model/CalendarModel");

class CalendarController {
    async index(req, res) {
        const calendars = await Calendar.find();
        return res.json(calendars);
    }
    async show(req, res) {
        const calendars = await Calendar.findById(req.params.id);
        return res.json(calendars);
    }
    async store(req, res) {
        const calendars = await Calendar.create(req.body);
        return res.json(calendars);
    }
}

module.exports = new CalendarController();