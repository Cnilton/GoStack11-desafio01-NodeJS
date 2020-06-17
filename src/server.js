const express = require("express");
const { uuid, isUuid } = require("uuidv4");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [
  {
    id: "a5d7aa64-8ef7-4446-8e7c-ec17d575cb67",
    title: "Desafio Node.js",
    url:
      "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs",
    techs: ["Node.js", "ReactJS", "React-Native"],
    likes: 10,
  },
];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repositório não encontrado." });
  }
  //   const repository = {
  //     title,
  //     url,
  //     techs,
  //   };
  repositories[repositoryIndex] = {
    ...repositories[repositoryIndex],
    title,
    url,
    techs,
  };
  return response.json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repositório não encontrado." });
  }
  repositories.splice(repositoryIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repositório não encontrado." });
  }
  //   const repository = {
  //     title,
  //     url,
  //     techs,
  //   };
  repositories[repositoryIndex] = {
    ...repositories[repositoryIndex],
    likes: repositories[repositoryIndex].likes + 1,
  };
  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
