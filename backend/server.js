const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.json({ message: "Backend." });
});

require('./app/routes/auth.routes')(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
const Role = db.role;
db.mongoose
    .connect(`mongodb://localhost:27017/kalkulator`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Berhasil koneksi MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });
