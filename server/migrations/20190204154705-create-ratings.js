module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Rating', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()')
    },
    userId: {
      allowNull: false,
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'User',
        key: 'id',
        as: 'userId'
      },
    },
    articleId: {
      allowNull: false,
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Article',
        key: 'id',
        as: 'articleId'
      },
    },
    rating: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
  }),
  down: queryInterface => queryInterface.dropTable('Rating')
};
