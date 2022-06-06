const axios = require("axios");
const { Diet, Recipe } = require("../db");
const { API_KEY } = process.env; 

  //  const respuesta =  require("../../respuesta.json") // Si la API NO Funciona

const getDiets = async (req, res) => { 
  try { 
    const dietas = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );

    // let dietas = respuesta; // Si la API NO Funciona

    const types = await dietas.data.results.map((t) => t.diets);  

    // const types = await dietas['results'].map((t) => t.diets);  // Si la API NO Funciona


    const diets = types.flat();
    const typeDiets = [...new Set(diets),"vegetarian"]; 
    typeDiets.forEach(async (d) => {
      await Diet.findOrCreate({ 
        where: { name: d }, 
      });
    });
    const allDiets = await Diet.findAll();
    return allDiets;
  } catch (error) {
    console.log(error); 
  }
};

const dietas = async (req, res) => {
  try {
    const d = await Diet.findAll();
    res.send(d);
  } catch (e) {
    res.status(404).send({msg:"error"})
  }
}; 
module.exports = {
  getDiets,
  dietas,
};
