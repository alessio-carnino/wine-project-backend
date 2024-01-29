import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const wineSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
    trim: true,
  },
  producer: {
    type: SchemaTypes.ObjectId,
    // required: true,
    ref: "Producer",
  },
  year: {
    type: Number,
    required: true,
  },
  cover: {
    type: String,
    default: "https://source.unsplash.com/random/100×100/?winebottle",
  },
  country: {
    type: SchemaTypes.ObjectId,
    ref: "Country",
  },
  quantity_ml: Number,
});

// wineSchema.pre('save', async function(next){
//     if(){}
// })

const Wine = model("Wine", wineSchema);

export default Wine;
