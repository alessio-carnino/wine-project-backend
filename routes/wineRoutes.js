import express from "express";
import Wine from "../models/Wine.js";

const router = express.Router();
router.use(express.json());

//POST new wine
router.post("/", async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Error. You must send a valid body.");
  }

  try {
    const wine = new Wine(req.body);
    await wine.save();

    const responseWine = await Wine.findById(wine._id.toString())
      .populate("producer", "name -_id")
      .populate("country", "name -_id");

    res.send(responseWine);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//GET list all wines
router.get("/", async (req, res) => {
  try {
    const wines = await Wine.find()
      .populate("producer", "name -_id")
      .populate("country", "name -_id");
    res.send(wines);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//GET single wine info
router.get("/:id", async (req, res) => {
  try {
    const wine = await Wine.findOne({ _id: req.params.id })
      .populate("producer", "name -_id")
      .populate("country", "name -_id");
    res.send(wine);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//PATCH edit single wine
router.patch("/:id", async (req, res) => {
  if (!req.body || !Object.keys(req.body).length) {
    res.status(400).send("You must enter a body with at least one property");
  }
  try {
    const wine = await Wine.findOne({ _id: req.params.id });
    Object.entries(req.body).forEach(([key, value]) => {
      if (key !== "-id") {
        wine[key] = value;
      }
    });
    await wine.save();
    res.send(wine);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//DELETE delete single wine
router.delete("/:id", async (req, res) => {
  try {
    await Wine.findOneAndDelete({ _id: req.params.id });
    res.send("Wine deleted successfully!");
  } catch (err) {
    res.status(404).send(err.message);
  }
});

export default router;
