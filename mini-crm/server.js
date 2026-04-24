const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db/mongo");
const leadRoutes = require("./routes/leadRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
connectDB();
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "admin123") {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});
app.use("/leads", leadRoutes)
app.listen(5000, () => console.log("Server running on port 5000"));