const Sequelize = require('sequelize');
const _ = require('lodash');
const faker = require('faker');

const conn = new Sequelize('user', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
const gender = ["Male", "Female"];
const User = conn.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    gender: { type: Sequelize.STRING },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

conn.sync({ force: false }).then(() => {
    console.log("Tables created.")
     _.times(10, () => {
         return User.create({
             name: faker.name.findName(),
             email: faker.internet.email(),
             gender: gender[Math.floor(Math.random() * 2)]
        })
    })
});


module.exports = conn;
