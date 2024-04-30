const express = require("express");
const {
  getCharacters,
  getCharacterById,
  addOrUpdateCharacter,
} = require("./dynamo");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from server");
});

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/characters", async (req, res) => {
  console.log("hitting characters");
  try {
    const characters = await getCharacters();
    res.json(characters);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.get("/characters/:id", async (req, res) => {
  console.log("hitting get particular character");
  const id = req.params.id;
  try {
    const character = await getCharacterById(id);
    res.json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      err: "Something went wrong",
    });
  }
});

app.post("/characters", async (req, res) => {
  const character = req.body;

  try {
    const newCharacter = await addOrUpdateCharacter(character);
    res.json(newCharacter);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      err: "Something went wrong",
    });
  }
});

app.put("/characters/:id", async (req, res) => {
  const character = req.body;
  const { id } = req.params;
  character.id = id;
  try {
    const updatedCharacter = await addOrUpdateCharacter(character);
    res.json(updatedCharacter);
  } catch (error) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.delete("/characters/:id", async (req, res) => {});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
