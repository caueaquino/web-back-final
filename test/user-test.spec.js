const chai = require('chai');
const http = require('chai-http');
const subSet = require('chai-subset');

const app = require('../app');

chai.use(http);
chai.use(subSet);

const userSchema = {
    name: name => name,
    password: password => password
};

describe('Listing Users data', async () => {
    it('Listing users - successfully', () => {
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
                name: 'user1',
                password: 'password1'
            })
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body).to.containSubset(userSchema);
                chai.expect(res.body.name).to.be.equal('user1');
            });

        chai.request(app)
            .get('/users')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(201);
                chai.expect(res.body[0]).to.containSubset(userSchema);
                chai.expect(res.body.length).to.be.equal(usersSize + 1);
                chai.expect(res.body[res.body.length - 1].name).to.be.equal('testeNode1');
            });
    });

    it('listing users - error 404', () => {
        chai.request(app)
            .get('/usrs')
            .end((err, res) => {
                chai.expect(res).to.have.status(404);
            });
    });
});

describe('Creation of Users data', async () => {

    it('creating user in database - successfully', () => {
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
                chai.expect(res.body.length).to.be.equal(usersSize + 1);
                chai.expect(res.body[res.body.length - 1].name).to.be.equal('testeNode1');
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
                chai.expect(res.body.length).to.be.equal(usersSize + 2);
                chai.expect(res.body[res.body.length - 1].name).to.be.equal('testeNode2');
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
                chai.expect(res.body.length).to.be.equal(usersSize + 3);
                chai.expect(res.body[res.body.length - 1].name).to.be.equal('testeNode3');
            });
    });

    it('creating user in database - empty fields', () => {
        chai.request(app)
            .post('/users')
            .end((err, res) => {
                chai.expect(res.data).to.be.equal('saving error');
            });
    })

    it('creating user in database - error 404', () => {
        chai.request(app)
            .post('/user')
            .end((err, res) => {
                chai.expect(res).to.have.status(404);
            })
    });
});