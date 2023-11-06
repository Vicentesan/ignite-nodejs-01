import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { BuildRoutPath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: BuildRoutPath("/users"),
    handler: (req, res) => {
      const { search } = req.query;

      const users = database.select(
        "users",
        search
          ? {
              name: search,
              email: search,
            }
          : null
      );

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: BuildRoutPath("/users"),
    handler: (req, res) => {
      const { name, email, age } = req.body;

      const user = {
        id: randomUUID(),
        name: name,
        email: email,
        age: age,
      };

      database.insert("users", user);

      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: BuildRoutPath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete("users", id);

      res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: BuildRoutPath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { name, email, age } = req.body;

      database.update("users", id, {
        name,
        email,
        age,
      });

      res.writeHead(204).end();
    },
  },
];
