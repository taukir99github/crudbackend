const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

const schemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", schemaData);

// Read api

app.get("/", async (req, res) => {
  const data = await userModel.find();
  res.json({ success: true, data: data });
});

// create api and save data in db

app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = await userModel(req.body);
  await data.save();

  res.send({ success: true, message: "save data", data: data });
});

//update api

app.put("/update", async (req, res) => {
  console.log(req.body);
  const { _id, ...rest } = req.body;
  const data = await userModel.updateOne({ _id: _id }, rest);

  res.send({ success: true, message: "save is updating", data: data });
});

//delete api

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await userModel.deleteOne({ _id: id });

  res.send({ success: true, message: "Want to delete ?", data: data });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/crudoperation")
  .then(() => console.log("db connect"))
  .catch((err) => console.log(error));

app.listen(PORT, () => console.log("server is running"));
