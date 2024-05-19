---
title: "6minutes Tech Graphql"
type: "post"
date: 2024-05-19T08:35:31+07:00
description: "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools."
keywords: ["6minutes Tech Graphql"]
categories: ["cheatsheet", "6minutes-tech"]
tags: []
image: "/common/no-image.png"
---

# The REST API issues

1. Over fetching data

- Getting back more data than we need

> example.com/api/courses

```json
[
    {
        "id": 1,
        "title": "6 minutes tech graphql",
        "author": "nextjsvietnam",
        "thumbnail_url": "...",
        "video_url": "...",
        ...
    }
]
```

2. Under fetching data

> example.com/api/courses/1

> example.com/api/courses

```json
{
  "id": 1,
  "title": "6 minutes tech graphql",
  "thumbnail_url": "..."
}
```

# What is GraphQL?

- A query language for your api

```gql
Query{
    books {
        title,
        author {
            name,
            id,
            courses {
                id,
                title,
                thumbnail
            }
        }
        price
    }
}
```

- Single endpoint

> example.com/graphql

## Let's getting start with ExpressJS

In this tutorial, we'll install Apollo Server with ExpressJS. There is package on npm to allow us integrate apollo server with expressjs and middleware

> package.json

```json
{
  "name": "6minutes-tech-graphql",
  "version": "1.0.0",
  "description": "the 6 minutes tech graphql tutorial",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "nextjsvietnam",
  "license": "ISC",
  "dependencies": {
    "@apollo/server": "^4.10.4",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "graphql": "^16.8.1"
  }
}
```

```sh
npm install @apollo/server graphql express cors body-parser --save
```

```js
// index.js
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 1337;

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world",
  },
};

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}`);
```

```sh
# this command will run the main entry point define in your package.json and watch changes
npm run dev
```

And you will see this

![image](https://gist.github.com/assets/31009750/31adabb1-6062-4a6d-b2f4-3dbf9d065b05)

Okie, so already know what it is, the create a hello world graphql. Let's dive in deeper.

## The game review graphql api

The main components of GraphQL

![image](https://gist.github.com/assets/31009750/15bd6f0e-4230-4dfa-922d-45e611c3d8a7)

1. Schema

- Built-in types: Int, Float, String, Boolean, ID

```js
// schema.js
export const typeDefs = `#graphql
    type Game {
        id: ID! # not allow to be null
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }
    # it is mandatory, work as entry point
    # it works as a gateway keeper of your graph
    type Query {
        reviews: [Review]
        review(id: ID!): Review
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }
    # Mutation
    type Mutation {
        addGame(game: AddGameInput!): Game
        deleteGame(id: ID!): [Game]
        updateGame(id: ID!, updateGameDto: EditGameInput!): Game
    }
    input AddGameInput {
        title: String!
        platform: [String!]!
    }
    input EditGameInput {
        title: String
        platform: [String!]
    }
`;
// Int, Float, String, Boolean, ID
```

**Resolver**

```js
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

import { typeDefs } from "./schema.js";
import _db from "./_db.js";

const PORT = process.env.PORT || 1337;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    games: () => {
      return _db.games;
    },
    game: (_, args, context) => {
      const id = args.id;
      return _db.games.find((game) => game.id === id);
    },
    authors: () => {
      return _db.authors;
    },
    author: (_, args, context) => {
      const id = args.id;
      return _db.authors.find((author) => author.id === id);
    },
    reviews: () => {
      return _db.reviews;
    },
    review: (_, args, context) => {
      const id = args.id;
      return _db.reviews.find((review) => review.id === id);
    },
  },
  Game: {
    reviews: (parent, args, context) => {
      const gameId = parent.id;
      return _db.reviews.filter((review) => review.game_id === gameId);
    },
  },
  Author: {
    reviews: (parent, args, context) => {
      const authorId = parent.id;
      return _db.reviews.filter((review) => review.author_id === authorId);
    },
  },
  Review: {
    author: (parent, args, context) => {
      const authorId = parent.author_id;
      return _db.authors.find((author) => author.id === authorId);
    },
    game: (parent, args, context) => {
      const gameId = parent.game_id;
      return _db.games.find((game) => game.id === gameId);
    },
  },
  // Mutation
  Mutation: {
    deleteGame: (_, args) => {
      const gameId = args.id;
      _db.games = _db.games.filter((g) => g.id !== gameId);

      return _db.games;
    },
    addGame: (_, args) => {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      _db.games.push(game);

      return game;
    },
    updateGame: (_, args) => {
      _db.games = _db.games.map((game) => {
        if (game.id === args.id) {
          return {
            ...game,
            ...args.updateGameDto,
          };
        }
        return game;
      });

      return _db.games.find((game) => game.id === args.id);
    },
  },
};

/*
* Apollo do the rest
games {
  title
}
*/

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server is ready at http://localhost:${PORT}`);
```

> \_db.js

```js
let games = [
  { id: "1", title: "Zelda, Tears of the Kingdom", platform: ["Switch"] },
  { id: "2", title: "Final Fantasy 7 Remake", platform: ["PS5", "Xbox"] },
  { id: "3", title: "Elden Ring", platform: ["PS5", "Xbox", "PC"] },
  { id: "4", title: "Mario Kart", platform: ["Switch"] },
  { id: "5", title: "Pokemon Scarlet", platform: ["PS5", "Xbox", "PC"] },
];

let authors = [
  { id: "1", name: "mario", verified: true },
  { id: "2", name: "yoshi", verified: false },
  { id: "3", name: "peach", verified: true },
];

let reviews = [
  { id: "1", rating: 9, content: "lorem ipsum", author_id: "1", game_id: "2" },
  { id: "2", rating: 10, content: "lorem ipsum", author_id: "2", game_id: "1" },
  { id: "3", rating: 7, content: "lorem ipsum", author_id: "3", game_id: "3" },
  { id: "4", rating: 5, content: "lorem ipsum", author_id: "2", game_id: "4" },
  { id: "5", rating: 8, content: "lorem ipsum", author_id: "2", game_id: "5" },
  { id: "6", rating: 7, content: "lorem ipsum", author_id: "1", game_id: "2" },
  { id: "7", rating: 10, content: "lorem ipsum", author_id: "3", game_id: "1" },
];

export default { games, authors, reviews };
```

## Analyze Details

1. Query

```gql
query Reviews {
  reviews {
    id
    rating
    content
  }
}
```

![image](https://gist.github.com/assets/31009750/ff226b47-4e2a-4f3c-9e4b-f69da87a2ec2)

2. Query with Variables

> Directly

```gql
query SingleReviewQuery {
  review(id: "1") {
    rating
    content
    author {
      name
      verified
    }
    game {
      title
      platform
      reviews {
        rating
      }
    }
  }
}
```

![image](https://gist.github.com/assets/31009750/78ef0feb-356e-4473-ae07-7d301d4017b1)

> With variables

```gql
query SingleReviewQuery($reviewId: ID!) {
  review(id: $reviewId) {
    rating
    content
    author {
      name
      verified
    }
    game {
      title
      platform
      reviews {
        rating
      }
    }
  }
}
```

![image](https://gist.github.com/assets/31009750/ba66b6b4-5e00-4d51-825e-e8340ee121e4)

3. Mutation

```gql
mutation CreateGameMutation($game: AddGameInput!) {
  addGame(game: $game) {
    id
    title
  }
}
```

```json
{
  "game": {
    "title": "Game 100",
    "platform": ["PC"]
  }
}
```

![image](https://gist.github.com/assets/31009750/d60119c1-6bf6-4f8a-be77-791ac17c5634)

## References

- [6 minutes tech graphql source code](https://github.com/nextjsvietnam/6minutes-tech-graphql)
  Tools for developing GraphQL on vscode

![image](https://gist.github.com/assets/31009750/e8bccae7-45e3-4ae4-a153-06a1857ca9ec)

GraphQL: Syntax Highlighting
