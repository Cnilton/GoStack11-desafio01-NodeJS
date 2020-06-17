const request = require("supertest");
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

describe("Register Like", () => {
  it("should be able to give a like to the repository", async () => {
    const response = await request(app)
      .post(`/repositories/${repositories[0].id}/like`)
      .send({});
    expect(response.status).toBe(200);
  });

  it("should not be able to like a repository that does not exist", async () => {
    const response = await request(app).post("/repositories/0/like").send({});
    expect(response.status).toBe(400);
  });
});

// describe("Register Like", () => {
//   it("should bla bla bla", () => {});
// });
