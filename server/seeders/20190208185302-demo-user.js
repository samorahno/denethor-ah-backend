const bcrypt = require('bcrypt');

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync());

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('User', [{
      firstname: 'Adanne1',
      lastname: 'Egbuna2',
      username: 'testuser3',
      email: 'princess63@example.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}).then(() => queryInterface.bulkInsert('User', [{
      firstname: 'Chubi',
      lastname: 'Best',
      username: 'testuser1',
      email: 'chubi.best@example.com',
      password: hashPassword('password'),
      role: 'super-admin',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}));
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};
