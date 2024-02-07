import mongoose from "mongoose";

const apiSchema = new mongoose.Schema({
  apiKey: {
    type: String,
    require: true,
  },
  apiName: {
    type: String,
    require: true,
  },
  apiType: {
    type: String,
    require: true,
    enum: [],
  },
  apiPurpose: {
    type: String,
    require: false,
  },
});

const apiModel = mongoose.model("apikey", apiSchema);
export default apiModel;
