import express from "express";
import Country from "../models/Country.js";

const router = express.Router();
router.use(express.json());

//POST new country
router.post("/", async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Error. You must send a valid body.");
  }

  try {
    const country = new Country(req.body);
    await country.save();

    const responseCountry = await Country.findById(country._id.toString())
      .populate("wines", "name -_id")
      .populate("producers", "name -_id");

    res.send(responseCountry);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//GET list all countries
router.get("/", async (req, res) => {
  try {
    const countries = await Country.find()
      .populate("wines", "name -_id")
      .populate("producers", "name -_id");
    res.send(countries);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//GET single country info
router.get("/:id", async (req, res) => {
  try {
    const country = await Country.findOne({ _id: req.params.id })
      .populate("wines", "name -_id")
      .populate("producers", "name -_id");
    res.send(country);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//PATCH edit single country
router.patch("/:id", async (req, res) => {
  if (!req.body || !Object.keys(req.body).length) {
    res.status(400).send("You must enter a body with at least one property");
  }
  try {
    const country = await Country.findOne({ _id: req.params.id });
    Object.entries(req.body).forEach(([key, value]) => {
      if (key !== "-id") {
        country[key] = value;
      }
    });
    await country.save();
    res.send(country);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//DELETE delete single country
router.delete("/:id", async (req, res) => {
  try {
    await Country.findOneAndDelete({ _id: req.params.id });

    res.send("Country deleted successfully!");
  } catch (err) {
    res.status(404).send(err.message);
  }
});

export default router;
