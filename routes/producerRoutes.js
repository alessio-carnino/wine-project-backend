import express from "express";
import Producer from "../models/Producer.js";

const router = express.Router();
router.use(express.json());

//POST new producer
router.post("/", async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Error. You must send a valid body.");
  }

  try {
    const producer = new Producer(req.body);
    await producer.save();

    const responseProducer = await Producer.findById(producer._id.toString())
      .populate("wines", "name -_id")
      .populate("country", "name -_id");

    res.send(responseProducer);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//GET list all producers
router.get("/", async (req, res) => {
  try {
    const producers = await Producer.find()
      .populate("wines", "name -_id")
      .populate("country", "name -_id");
    res.send(producers);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//GET single producer info
router.get("/:id", async (req, res) => {
  try {
    const producer = await Producer.findOne({ _id: req.params.id })
      .populate("wines", "name -_id")
      .populate("country", "name -_id");
    res.send(producer);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//PATCH edit single producer
router.patch("/:id", async (req, res) => {
  if (!req.body || !Object.keys(req.body).length) {
    res.status(400).send("You must enter a body with at least one property");
  }
  try {
    const producer = await Producer.findOne({ _id: req.params.id });
    Object.entries(req.body).forEach(([key, value]) => {
      if (key !== "-id") {
        producer[key] = value;
      }
    });
    await producer.save();
    res.send(producer);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//DELETE delete single producer
router.delete("/:id", async (req, res) => {
  try {
    await Producer.findOneAndDelete({ _id: req.params.id });

    res.send("Producer deleted successfully!");
  } catch (err) {
    res.status(404).send(err.message);
  }
});

export default router;
