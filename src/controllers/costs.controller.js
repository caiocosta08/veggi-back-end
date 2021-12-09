const express = require('express');
const chalk = require('chalk');
const { execSQL } = require('../database');
// const User = require('../models/user.model');

const router = express.Router();

router.get("/", async (req, res) => {
  console.log(chalk.bgMagenta('[ get /costs/ - costs.controller ]'));
  console.log(chalk.magenta(JSON.stringify(req.body)));
  try {

    let costs = await execSQL('SELECT * FROM costs');

    console.log(chalk.bgBlue('QUERY AT ', new Date()))
    console.log('costs ->', costs)

    // Retorna os dados do usuário e o new token para ser usado na próxima requisição
    return res.send({
      costs
    });
  } catch (error) {
    res.status(400).send({ error: error })
  }
});

router.post("/add", async (req, res) => {
  console.log(chalk.bgMagenta('[ post /costs/ - costs.controller ]'));
  console.log(chalk.magenta(JSON.stringify(req.body)));
  try {

    let { value, description, date, id_responsible, recipient } = req?.body;
    // let newUser = new User(name, email);
    if (!value || !description || !date || !id_responsible || !recipient) return res.status(400).send({ error: "Informações pendentes. Você deve passar o objeto com os campos {value, description, date, id_responsible, recipient}" })

    let costs = await execSQL("INSERT INTO costs (value, description, date, id_responsible, recipient) VALUES ('" + value + "' , '" + description + "' , '" + date + "' , '" + id_responsible + "' , '" + recipient + "')");

    console.log(chalk.bgBlue('QUERY AT ', new Date()))
    console.log('costs ->', costs)

    if (costs) {
      costs = await execSQL("SELECT * FROM costs");
    }

    // Retorna os dados do usuário e o new token para ser usado na próxima requisição
    return res.send({
      costs
    });
  } catch (error) {
    res.status(400).send({ error: error })
  }
});

router.post("/update", async (req, res) => {
  console.log(chalk.bgMagenta('[ post /costs/update - costs.controller ]'));
  console.log(chalk.magenta(JSON.stringify(req.body)));
  try {

    let { id, name, email } = req?.body;

    let costs = await execSQL("UPDATE costs SET name='" + name + "', email='" + email + "' WHERE id='" + id + "'");

    console.log(chalk.bgBlue('QUERY AT ', new Date()))
    console.log('costs ->', costs)

    if (costs) {
      costs = await execSQL("SELECT * FROM costs");
    }

    // Retorna os dados do usuário e o new token para ser usado na próxima requisição
    return res.send({
      costs
    });
  } catch (error) {
    res.status(400).send({ error: error })
  }
});

router.post("/delete", async (req, res) => {
  console.log(chalk.bgMagenta('[ post /costs/delete - costs.controller ]'));
  console.log(chalk.magenta(JSON.stringify(req.body)));
  try {

    let { id } = req?.body;

    let status = await execSQL("DELETE FROM costs WHERE id='" + id + "' LIMIT 1 ");
    if (!status) return res.status(400).send({ error: "Não foi possível excluir o usuário", error_code: "001" });
    else if (status) status = true;

    return res.send({
      status
    });
  } catch (error) {
    res.status(400).send({ error: error })
  }
});

module.exports = (app) => app.use("/costs", router);