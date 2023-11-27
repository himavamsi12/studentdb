const express = require("express");
const path = require("path");
const cors = require("cors");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(cors());

app.use(express.json());

const dbPath = path.join(__dirname, "studentschema.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/", async (request, response) => {
	const getBooksQuery = `
	  SELECT
		*
	  FROM
      studentschema;`;
	const booksArray = await db.all(getBooksQuery);
	response.send(booksArray);
  });

  app.get("/dean", async (request, response) => {
    const getBooksQuery = `
      SELECT
      *
      FROM
        deanschema;`;
    const booksArray = await db.all(getBooksQuery);
    response.send(booksArray);
    });


    app.get("/session", async (request, response) => {
      const getBooksQuery = `
        SELECT
        *
        FROM
          sessionschema;`;
      const booksArray = await db.all(getBooksQuery);
      response.send(booksArray);
      });