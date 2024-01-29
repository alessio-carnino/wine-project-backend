import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const producerSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
    trim: true,
  },
  cover: {
    type: String,
    default: "https://source.unsplash.com/random/100×100/?logo",
  },
  since_year: Number,
  to_year: Number,
  country: {
    type: SchemaTypes.ObjectId,
    ref: "Country",
  },
  wines: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Wine",
      default: [],
    },
  ],
});

const Producer = model("Producer", producerSchema);

export default Producer;
