const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  const repo = {
    id: uuid(),
    title: title,
    url: url,
    techs: [...techs],
    likes: 0
  }

  repositories.push(repo);
  response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const items = {
    id,
    title,
    url,
    techs, 
  }

  const position = repositories.findIndex(item => item.id == id);
  repositories[position] = items;
  response.json(repositories[position]);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const position = repositories.findIndex(item => item.id == id)
  repositories.splice(position);

  response.json(repositories);
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
