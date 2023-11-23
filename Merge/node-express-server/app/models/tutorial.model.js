module.exports = (sequelize, Sequelize) => {
  const Noveny = sequelize.define("Noveny", {
    title: {
      type: Sequelize.STRING
    },
    tags: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    picture: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });


  return Noveny;
};