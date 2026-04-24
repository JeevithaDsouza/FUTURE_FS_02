// routes/leadRoutes.js

const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// ➕ Add Lead
router.post("/", async (req, res) => {
    try {
        const lead = new Lead(req.body);
        await lead.save();
        res.json(lead);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📄 Get All Leads
router.get("/", async (req, res) => {
    try {
        const leads = await Lead.find();
        res.json(leads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✏️ Update Lead Status
router.put("/:id", async (req, res) => {
    try {
        const updated = await Lead.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ❌ Delete Lead
router.delete("/:id", async (req, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;