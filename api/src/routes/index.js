require("dotenv").config();
const { Router } = require("express");
const axios = require("axios").default;
const {API_KEY} = process.env
const { Recipe, Diet } = require("../db");
const Sequelize = require("sequelize");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const dietTypes = [
  "gluten free",
  "ketogenic",
  "vegetarian",
  "lacto ovo vegetarian",
  "ovo-vegetarian",
  "vegan",
  "pescetarian",
  "paleolithic",
  "primal",
  "low fodmap",
  "whole 30",
  "dairy free",
];

const RecipeFormater = function (
  id,
  name,
  hscore,
  image,
  diets,
  dishType,
  score
) {
  let obj = {
    id: id,
    name: name,
    image: image,
    healthscore: hscore,
    diets: diets,
    dishType: dishType,
    score: score,
  };

  return obj;
};
router.get("/recipes", async function (req, res) {
  try {
    let { name } = req.query;
    let response;
    console.log(name);
    name
      ? (response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}&addRecipeInformation=true&number=100`
        ))
      : (response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
        ));

    if (!response.data.results) throw new Error("No existen resultados");
    let recipes = response.data.results.map((recipe) =>
      RecipeFormater(
        recipe.id,
        recipe.title,
        recipe.healthScore,
        recipe.image,
        recipe.diets,
        recipe.dishTypes,
        recipe.spoonacularScore
      )
    );

    let recipeDB;
    if (name) {
      recipeDB = await Recipe.findAll({
        where: {
          name: name,
        },
        include: {
          model: Diet,
        },
      });
    } else {
      recipeDB = await Recipe.findAll({
        include: {
          model: Diet,
        },
      });
    }

    if (recipes.length > 0 && recipeDB.length > 0) {
      recipes = [...recipes, ...recipeDB];
    } else if (recipes.length === 0 && recipeDB.length > 0) {
      recipes = [...recipeDB];
    }

    res.send(recipes);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.get("/recipes/:id", async function (req, res) {
  try {
    let item;
    let { id } = req.params;
    if (id.includes("-")) {
      item = await Recipe.findAll({
        where: {
          id: id,
        },
        include: {
          model: Diet,
        },
      });

      return res.send(item);
    }
    item = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );

    let data = item.data;

    const dietList = [...data.diets];
    data.vegetarian && dietList.push("vegetarian");
    data.vegan && dietList.push("vegan");
    data.glutenFree && dietList.push("gluten free");

    let filtered = [...new Set(dietList)];

    let stepsFormated = [];

    data.analyzedInstructions.map((item) => {
      let nested = [];
      item.steps.map((step) => {
        nested.push([step.number, step.step]);
      });
      stepsFormated.push([item.name, nested]);
      return nested;
    });

    const text = data.summary.replace(/<[^>]+>/g, "");

    let obj = {
      name: data.title,
      image: data.image,
      id: data.id,
      dish_summary: text,
      dishTypes: data.dishTypes,
      score: data.spoonacularScore ? data.spoonacularScore : 10,
      diets: filtered,
      healthScore: data.healthScore,
      steps: stepsFormated,
    };

    res.send(obj);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

async function types() {
  try {
    let types = await Diet.findAll();
    if (types.length === 0) {
      const createTypes = dietTypes.map(
        async (diet) => await Diet.create({ name: diet })
      );

      types = await Promise.all(createTypes);
    }
    return types;
  } catch (err) {
    return err;
  }
}

router.get("/types", async function (req, res) {
  try {
    res.send(await types());
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.post("/recipe", async (req, res) => {
  let { name, dish_summary, score, healthScore, steps, diets, image } =
    req.body;

  let newRecipe = {
    name,
    dish_summary,
    score,
    healthscore: healthScore,
    steps,
    image,
  };

  try {
    let recipeC = await Recipe.create({
      ...newRecipe,
    });

    console.log(diets)
    diets.map(async (e) => {
      let id_diet = await Diet.findAll({ where: { name: e } });
      await recipeC.addDiet(id_diet);
    });

    res.status(201).json("newRecipe");
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: error.message });
  }
});

module.exports = router;
