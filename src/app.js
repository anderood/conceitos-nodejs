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
  const { title, url, techs } = request.body;

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
  const { title, url, techs, likes } = request.body;

  const position = repositories.findIndex(item => item.id == id);
  if(position == -1){
    return response.status(400).json({Error: 'Repositorie Not Found'});
  }

  items = {
    id: id,
    title: title,
    url: url,
    techs: techs,
    likes: repositories[position].likes
  }

  repositories[position] = items;
  response.json(repositories[position]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const position = repositories.findIndex(item => item.id == id);
  if(position == -1){
    return response.status(400).json({Error: 'Repositorie Not Found'});
  }
  repositories.splice(position);

  response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const position = repositories.findIndex(item => item.id == id);

  if(position == -1){
    return response.status(400).json({Error: 'Like Not Found'});
  }

  repositories[position].likes +=1;
  response.json(repositories[position]);

});

module.exports = app;
