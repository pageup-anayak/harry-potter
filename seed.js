const axios = require("axios");
const { addOrUpdateCharacter } = require("./dynamo");

const seedData = async () => {
  const url = "http://hp-api.onrender.com/api/characters";

  try {
    const res = await axios.get(url);
    console.log("fetching data", res);
    const characterPromises = res.data.map((character, i) => {
      addOrUpdateCharacter({ ...character, id: i + "" });
    });
    await Promise.all(characterPromises);
  } catch (err) {
    console.error(err);
  }
};

seedData();
