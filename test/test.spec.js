const chai = require('chai');
const http = require('chai-http');
const subSet = require('chai-subset');

const app = require('../app');

// const UserController = require('../controller/UserController');
// const CalendarController = require('../controller/CalendarController');

chai.use(http);
chai.use(subSet);

const userSchema = {
    name: name => name,
    password: password => password
};

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

describe('Integration tests user and calendars', async () => {
        
    it('/users - GET - POST', () => {
        let usersSize;
        chai.request(app)
            .get('/users')
            .end((err, res) => {
                usersSize = res.body.length;
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body[0]).to.containSubset(userSchema);
                chai.expect(res.body.length).to.be.equal(usersSize);
            });

        chai.request(app)
            .post('/users')
            .send({
                name: 'testeNode1',
                password: 'teste123'
            })
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body).to.containSubset(userSchema);
                chai.expect(res.body.name).to.be.equal('testeNode1');
            });

        chai.request(app)
            .get('/users')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body[0]).to.containSubset(userSchema);
                chai.expect(res.body.length).to.be.equal(usersSize+1);
                chai.expect(res.body[res.body.length-1].name).to.be.equal('testeNode1');
            });

        chai.request(app)
            .post('/users')
            .send({
                name: 'testeNode2',
                password: 'teste123'
            })
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body).to.containSubset(userSchema);
                chai.expect(res.body.name).to.be.equal('testeNode2');
            });

        chai.request(app)
            .get('/users')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body[0]).to.containSubset(userSchema);
                chai.expect(res.body.length).to.be.equal(usersSize+2);
                chai.expect(res.body[res.body.length-1].name).to.be.equal('testeNode2');
            });

        chai.request(app)
            .post('/users')
            .send({
                name: 'testeNode3',
                password: 'teste123'
            })
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body).to.containSubset(userSchema);
                chai.expect(res.body.name).to.be.equal('testeNode3');
            });

        chai.request(app)
            .get('/users')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body[0]).to.containSubset(userSchema);
                chai.expect(res.body.length).to.be.equal(usersSize+3);
                chai.expect(res.body[res.body.length-1].name).to.be.equal('testeNode3');
            });
    });


    it('/calendars - GET - POST', () => {
        let usersSize;
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
                chai.expect(res.body.length).to.be.equal(calendarsSize+1);
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
                chai.expect(res.body.length).to.be.equal(calendarsSize+1);
                chai.expect(res.body[res.body.length-1].name).to.be.equal('testeEvent3');
                chai.expect(res.body[res.body.length-1].day).to.be.equal('3');
                chai.expect(res.body[res.body.length-1].hour).to.be.equal('3:00');
            });
    });
});


// describe('Unit tests user and calendars', () => {

//     it('addCalendar', () => {
//         const postUser = {
//             name: 'nameTest',
//             password: '123'
//         };
//         UserController.register({postUser});

//         chai.expect(postUser.name).to.be.equals('nameTest');
//     });

//     it('addCalendar', () => {
//         const postCalendar = {
//             name: 'eventTest',
//             day: '1',
//             hour: '1:00'
//         };
//         CalendarController.store(postCalendar);

//         chai.expect(postCalendar.name).to.be.equals('eventTest');
//     });

//     it('getCalendars', async () => {
//         const calendars = [{
//             name: 'test1',
//             day: '1',
//             hour: '1'
//         }, {
//             name: 'test2',
//             day: '2',
//             hour: '2'
//         }];

//         CalendarController.store(calendars[0]);
//         CalendarController.store(calendars[1]);

//         CalendarController.index().data;

//         chai.expect(calendars[0].name).to.be.equals('test1');
//         chai.expect(calendars[1].name).to.be.equals('test2');
//         chai.expect(calendars.length).to.be.equals(2);
//     });
// });