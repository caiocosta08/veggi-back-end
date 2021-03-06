const express = require('express');
const chalk = require('chalk');
const { execSQL } = require('../database');
// const User = require('../models/user.model');

const router = express.Router();

router.get("/", async (req, res) => {
  console.log(chalk.bgMagenta('[ get /users/ - users.controller ]'));
  console.log(chalk.magenta(JSON.stringify(req.body)));
  try {

    let users = await execSQL('SELECT * FROM users');

    console.log(chalk.bgBlue('QUERY AT ', new Date()))
    console.log('users ->', users)

    // Retorna os dados do usuário e o new token para ser usado na próxima requisição
    return res.send({
      users
    });
  } catch (error) {
    res.status(400).send({ error: error })
  }
});

router.post("/add", async (req, res) => {
  console.log(chalk.bgMagenta('[ post /users/ - users.controller ]'));
  console.log(chalk.magenta(JSON.stringify(req.body)));
  try {

    let { name, email, post, level, status } = req?.body;
    // let newUser = new User(name, email);
    if (!name || !email || !post || !level || !status) return res.status(400).send({error: "Informações pendentes. Você deve passar o objeto com os campos {name, email, post, level, status}"})

    let users = await execSQL("INSERT INTO users (name, email, post, level, status) VALUES ('" + name + "' , '" + email + "' , '" + post + "' , '" + level + "' , '" + status + "')");

    console.log(chalk.bgBlue('QUERY AT ', new Date()))
    console.log('users ->', users)

    if (users) {
      users = await execSQL("SELECT * FROM users");
    }

    // Retorna os dados do usuário e o new token para ser usado na próxima requisição
    return res.send({
      users
    });
  } catch (error) {
    res.status(400).send({ error: error })
  }
});

router.post("/update", async (req, res) => {
  console.log(chalk.bgMagenta('[ post /users/update - users.controller ]'));
  console.log(chalk.magenta(JSON.stringify(req.body)));
  try {

    let { id, name, email } = req?.body;

    let users = await execSQL("UPDATE users SET name='" + name + "', email='" + email + "' WHERE id='" + id + "'");

    console.log(chalk.bgBlue('QUERY AT ', new Date()))
    console.log('users ->', users)

    if (users) {
      users = await execSQL("SELECT * FROM users");
    }

    // Retorna os dados do usuário e o new token para ser usado na próxima requisição
    return res.send({
      users
    });
  } catch (error) {
    res.status(400).send({ error: error })
  }
});

router.post("/delete", async (req, res) => {
  console.log(chalk.bgMagenta('[ post /users/delete - users.controller ]'));
  console.log(chalk.magenta(JSON.stringify(req.body)));
  try {

    let { id } = req?.body;

    let status = await execSQL("DELETE FROM users WHERE id='" + id + "' LIMIT 1 ");
    if (!status) return res.status(400).send({ error: "Não foi possível excluir o usuário", error_code: "001" });
    else if (status) status = true;

    return res.send({
      status
    });
  } catch (error) {
    res.status(400).send({ error: error })
  }
});

module.exports = (app) => app.use("/users", router);