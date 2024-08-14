const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const routes = require("./routes");
const sequelize = require("./config/database"); // Importation de la configuration Sequelize
const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Remplace par l'URL de ton frontend
  }),
);

app.use(express.json());
app.use("/api", routes);

// Use the error handler
app.use(errorHandler);

sequelize
  .sync({ force: false }) // Utilise { force: true } pour recréer les tables à chaque démarrage (attention, cela supprime les données existantes)
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Unable to sync the database:", err);
  });

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
