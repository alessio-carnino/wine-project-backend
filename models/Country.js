import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const countrySchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
    trim: true,
  },
  wines: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Wine",
      default: [],
    },
  ],
  producers: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Producer",
      default: [],
    },
  ],
});

const Country = model("Country", countrySchema);

export default Country;
