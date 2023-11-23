const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const corsOptions = {
  origin: '*'
};
app.use(cors());




// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Backend port 8080." });
});

require("./app/routes/turorial.routes")(app);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log('Full path for serving uploads:', path.join(__dirname, 'uploads'));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
