
# next-prisma-postit

Small project with newest version of Next.js and Prisma DB (connected to PostgreSQL).
This was a project with a tutorial cause I haven't got enough skills to work with Prisma and Tanstack query.


## Acknowledgements

 - [Course](https://www.youtube.com/watch?v=4xduSsxa5Os)


## API Reference

#### Authentication

```http
  GET /api/auth/[...nextauth]
```

Routes covered by [next-auth](https://next-auth.js.org/)

#### Get all posts

```http
  GET /api/posts/get-posts
```

#### Get own posts *(auth)*

```http
  GET /api/posts/get-my-posts
```

#### Delete own post *(auth)*

```http
  DELETE /api/posts/delete-post
```

#### Add post *(auth)*

```http
  POST /api/posts/add-post
```

#### Add comment *(auth)*

```http
  POST /api/posts/add-comment
```

#### Get post by id 

```http
  POST /api/posts/[id]
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of post to fetch |


## Demo

**[Live preview](https://postit.pacio.dev)**
## Deployment

```bash
yarn build
```

## Installation

Firstly you need to setup environmental variables in `.env` and `.env.local` files.
You have template in `.env.example` and `.env.local.example`

and then

```bash
yarn
```

## Lessons Learned

I learned how to cooperate with Prisma db connected with PostgreSQL.
## Screenshots

![Image of website](https://i.imgur.com/9zPCH9x.png)

![Image of /dashboard](https://i.imgur.com/pHTNF0k.png)

![Image of /post/$id](https://i.imgur.com/lN4DoyL.png)
## Run Locally

Clone the project

```bash
git clone https://github.com/paciodev/next-prisma-postit
```

Go to the project directory

```bash
cd nxet-prisma-postit
```

Install dependencies

```bash
yarn
```

Start the server

```bash
yarn dev
```


## Support

For support, email postit@pacio.dev.


## Tech Stack

**Client:** React, TailwindCSS, react-hot-toast, react-timeago, axios

**Server:** Next.js, Prisma, PostgreSQL, next-auth, @tanstack/react-query

