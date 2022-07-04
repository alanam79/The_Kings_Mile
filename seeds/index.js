const sequelize = require("../config/connection");
const seedBooks = require("./bookData");

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedBooks();

    process.exit(0);
};

seedAll();