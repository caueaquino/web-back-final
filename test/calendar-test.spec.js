const chai = require('chai');
const http = require('chai-http');
const subSet = require('chai-subset');

const app = require('../app');

chai.use(http);
chai.use(subSet);

const calendarPostSchema = {
    name: name => name,
    day: day => day,
    hour: hour => hour
}

const calendarSchema = {
    name: name => name,
    day: day => day,
    hour: hour => hour,
    creationDate: creation => creation
};


describe('Getting of Calendars data', async () => {
    it('getting and event from database - succesfully', () => {
        let sizeEvents = 0;
        chai.request(app)
            .get('/calendars')
            .end((err, res) => {
                sizeEvents = res.body.length;
                chai.expect(res.body.length).to.be.equal(sizeEvents);
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body[0]).to.containSubset(calendarSchema);
            });

        chai.request(app)
            .post('/calendars')
            .send({
                name: 'testeEvent1',
                day: '1',
                hour: '1:00'
            })
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body).to.containSubset(calendarPostSchema);
            });

        let eventData;
        chai.request(app)
            .get('/calendars')
            .end((err, res) => {
                calendarsSize = res.body.length;
                eventData = res.body[calendarSize-1]._id;
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body[0]).to.containSubset(calendarSchema);
                chai.expect(res.body.length).to.be.equal(calendarsSize+1);
                chai.expect(res.body[res.body.length-1].name).to.be.equal('testeEvent1');
                chai.expect(res.body[res.body.length-1].day).to.be.equal('1');
                chai.expect(res.body[res.body.length-1].hour).to.be.equal('1:00');
            });

        chai.request(app)
            .get('/calendars',  {id: eventData})
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body).containSubset(calendarSchema);
                chai.expect(res.body.name).to.be.equal('testeEvent1');
                chai.expect(res.body.day).to.be.equal('1');
                chai.expect(res.body.hour).to.be.equal('1:00');
                chai.expect(res.body._id).to.be.equal(eventData);
            });
    });

    it('getting and event from database - error 404', () => {
        chai.request(app)
            .get('/calenda')
            .end((err, res) => {
                chai.expect(res).to.have.status(404);
            });
    });
});

describe('Delete of Calendars event data', async () => {
    it('deleting an event from database - succesfully', () => {
        let deletedEvent;
        chai.request(app)
        .delete('/calendars')
        .send({
            name: 'testeEvent1',
            day: '1',
            hour: '1:00'
        })
        .end((err, res) => {
            chai.expect(err).to.be.null;
            chai.expect(res).to.have.status(201);
            chai.expect(res.body).to.containSubset(calendarPostSchema);
        });

        chai.request(app)
            .delete('/calendars')
            .end((err, res) => {
                calendarsSize = res.body.length;
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body[0]).to.containSubset(calendarSchema);
                chai.expect(res.body.length).to.be.equal(calendarsSize);
                deletedEvent = res.body[0]._id;
            });

        chai.request(app)
            .delete('/calendars', {id: deletedEvent})
            .end((err, res) => {
                chai.expect(res.body.data).to.be.equal(true);
            })
    });

    it('deleting an event from database without id param - error event id not fount', () => {
        chai.request(app)
            .delete('/calendars', {id: ''})
            .end((err, res) => {
                chai.expect(res.body.data).to.be.equal('event id not found');
            });

        chai.request(app)
        .delete('/calendars', {id: null})
        .end((err, res) => {
            chai.expect(res.body.data).to.be.equal('event id not found');
        });
    });

    it('deleting an event from database - error 404', () => {
        chai.request(app)
            .delete('/calend')
            .end((err,res) => {
                chai.expect(res).to.have.status(404);
            });
    });
});

    
describe('Cretion of Calendars data', async () => {

    it('creating and verifing events in database - sucessfully', () => {
        let calendarsSize;
        chai.request(app)
            .get('/calendars')
            .end((err, res) => {
                calendarsSize = res.body.length;
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body[0]).to.containSubset(calendarSchema);
                chai.expect(res.body.length).to.be.equal(calendarsSize);
            });

        chai.request(app)
            .post('/calendars')
            .send({
                name: 'testeEvent1',
                day: '1',
                hour: '1:00'
            })
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body).to.containSubset(calendarPostSchema);
            });

        chai.request(app)
            .get('/calendars')
            .end((err, res) => {
                calendarsSize = res.body.length;
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body[0]).to.containSubset(calendarSchema);
                chai.expect(res.body.length).to.be.equal(calendarsSize+1);
                chai.expect(res.body[res.body.length-1].name).to.be.equal('testeEvent1');
                chai.expect(res.body[res.body.length-1].day).to.be.equal('1');
                chai.expect(res.body[res.body.length-1].hour).to.be.equal('1:00');
            });

        chai.request(app)
            .post('/calendars')
            .send({
                name: 'testeEvent2',
                day: '2',
                hour: '2:00'
            })
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body).to.containSubset(calendarPostSchema);
            });

        chai.request(app)
            .get('/calendars')
            .end((err, res) => {
                calendarsSize = res.body.length;
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body[0]).to.containSubset(calendarSchema);
                chai.expect(res.body.length).to.be.equal(calendarsSize+2);
                chai.expect(res.body[res.body.length-1].name).to.be.equal('testeEvent2');
                chai.expect(res.body[res.body.length-1].day).to.be.equal('2');
                chai.expect(res.body[res.body.length-1].hour).to.be.equal('2:00');
            });

            chai.request(app)
            .post('/calendars')
            .send({
                name: 'testeEvent3',
                day: '3',
                hour: '3:00'
            })
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body).to.containSubset(calendarPostSchema);
            });

        chai.request(app)
            .get('/calendars')
            .end((err, res) => {
                calendarsSize = res.body.length;
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body[0]).to.containSubset(calendarSchema);
                chai.expect(res.body.length).to.be.equal(calendarsSize+3);
                chai.expect(res.body[res.body.length-1].name).to.be.equal('testeEvent3');
                chai.expect(res.body[res.body.length-1].day).to.be.equal('3');
                chai.expect(res.body[res.body.length-1].hour).to.be.equal('3:00');
            });
    });

    it('creating and event in database - error 404', () => {
        chai.request(app)
            .post('/calenda')
            .end((err, res) => {
                chai.expect(res).to.have.status(404);
            });
    });
});
