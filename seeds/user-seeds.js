const { User } = require('../models');

const userData = [
    {
        username: 'avnipatel1',
        password: 'password1'
    },
    {
        username: 'avnipatel2',
        password: 'password2'
    },
    {
        username: 'avnipatel3',
        password: 'password3'
    },
    {
        username: 'avnipatel4',
        password: 'password4'
    },
    {
        username: 'avnipatel5',
        password: 'password5'
    },
];

// const seedUsers = () => User.bulkCreate(userData);
const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
});

module.exports = seedUsers;