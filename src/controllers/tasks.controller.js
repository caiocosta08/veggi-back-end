const express = require('express');
const chalk = require('chalk');
const { execSQL } = require('../database');

const router = express.Router();

router.get("/", async (req, res) => {
  console.log(chalk.bgMagenta('[ get /tasks/ - tasks.controller ]'));
  console.log(chalk.magenta(JSON.stringify(req.body)));
  try {

    let tasks = await execSQL('SELECT * FROM tasks');

    console.log(chalk.bgBlue('QUERY AT ', new Date()))
    console.log('tasks ->', tasks)

    // Retorna os dados do usuário e o new token para ser usado na próxima requisição
    return res.send({
      tasks
    });
  } catch (error) {
    res.status(400).send({ error: error })
  }
});

router.post("/add", async (req, res) => {
  console.log(chalk.bgMagenta('[ post /tasks/add - tasks.controller ]'));
  console.log(chalk.magenta(JSON.stringify(req.body)));
  try {

    let { id_user, description, state } = req?.body;

    let tasks = await execSQL("INSERT INTO tasks (id_user, description, state) VALUES ('" + id_user + "','" + description + "','" + state + "')");

    console.log(chalk.bgBlue('QUERY AT ', new Date()))
    console.log('tasks ->', tasks)

    if (tasks) {
      tasks = await execSQL("SELECT * FROM tasks WHERE id_user='" + id_user + "'");
    }

    // Retorna os dados do usuário e o new token para ser usado na próxima requisição
    return res.send({
      tasks
    });
  } catch (error) {
    res.status(400).send({ error: error })
  }
});

router.post("/update", async (req, res) => {
  console.log(chalk.bgMagenta('[ post /tasks/update - tasks.controller ]'));
  console.log(chalk.magenta(JSON.stringify(req.body)));
  try {

    let { id, id_user, description, state } = req?.body;

    let tasks = await execSQL("UPDATE tasks SET description='" + description + "', state='" + state + "' WHERE id='" + id + "' ");

    console.log(chalk.bgBlue('QUERY AT ', new Date()))
    console.log('tasks ->', tasks)

    if (tasks) {
      tasks = await execSQL("SELECT * FROM tasks WHERE id_user='" + id_user + "'");
    }

    // Retorna os dados do usuário e o new token para ser usado na próxima requisição
    return res.send({
      tasks
    });
  } catch (error) {
    res.status(400).send({ error: error })
  }
});

router.post("/get_all_by_id_user", async (req, res) => {
  console.log(chalk.bgMagenta('[ post /tasks/get_all_by_id_user - tasks.controller ]'));
  console.log(chalk.magenta(JSON.stringify(req.body)));
  try {

    let tasks = await execSQL("SELECT * FROM tasks WHERE id_user='" + req?.body?.id_user + "' ");

    console.log(chalk.bgBlue('QUERY AT ', new Date()))
    console.log('tasks ->', tasks)

    // Retorna os dados do usuário e o new token para ser usado na próxima requisição
    return res.send({
      tasks
    });
  } catch (error) {
    res.status(400).send({ error: error })
  }
});

router.post("/delete", async (req, res) => {
  console.log(chalk.bgMagenta('[ post /tasks/delete - tasks.controller ]'));
  console.log(chalk.magenta(JSON.stringify(req.body)));
  try {

    let { id_task } = req?.body;

    let status = await execSQL("DELETE FROM tasks WHERE id='" + id_task + "' LIMIT 1 ");
    if (!status) return res.status(400).send({ error: "Não foi possível excluir o usuário", error_code: "001" });
    else if (status) status = true;

    return res.send({
      status
    });
  } catch (error) {
    res.status(400).send({ error: error })
  }
});

module.exports = (app) => app.use("/tasks", router);