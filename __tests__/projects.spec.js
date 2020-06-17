const request = require("supertest");
const faker = require("faker");
const app = require("../src/server");

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

describe("Handle Repositories", () => {
  it("should be able to create a new repository", async () => {
    const response = await request(app)
      .post(`/repositories`)
      .send({
        title: faker.random.words,
        url: faker.internet.url,
        techs: [faker.random.words],
      });
    expect(response.status).toBe(200);
  });

  it("should be able to list the repositories", async () => {
    const response = await request(app).get("/repositories").send();
    expect(response.status).toBe(200);
  });

  it("should be able to update repository", async () => {
    const response = await request(app)
      .put(`/repositories/${repositories[0].id}`)
      .send({
        title: faker.random.words,
        url: faker.internet.url,
        techs: [faker.random.words],
      });
    expect(response.status).toBe(200);
  });

  it("should not be able to update a repository that does not exist", async () => {
    const response = await request(app)
      .put(`/repositories/1`)
      .send({
        title: faker.random.words,
        url: faker.internet.url,
        techs: [faker.random.words],
      });
    expect(response.status).toBe(400);
  });

  it("should not be able to update repository likes manually", async () => {
    const response = await request(app)
      .put(`/repositories/${repositories[0].id}`)
      .send({
        title: faker.random.words,
        url: faker.internet.url,
        techs: [faker.random.words],
      });
    expect(response.body.likes).toBe(repositories[0].likes);
  });

  it("should be able to delete the repository", async () => {
    const response = await request(app)
      .delete(`/repositories/${repositories[0].id}`)
      .send();
    expect(response.status).toBe(204);
  });

  it("should not be able to delete a repository that does not exist", async () => {
    const response = await request(app).delete(`/repositories/0`).send();
    expect(response.status).toBe(400);
  });
});
