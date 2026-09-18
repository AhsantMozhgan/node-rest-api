# Node REST API

A small blog API built with Node, Express, and MongoDB. Two resources, posts and users. You can sign up and log in, passwords get hashed with bcrypt before they're stored, and a successful login hands you back a JWT. That token is what gates writing, anyone can read a post, but creating or deleting one needs a valid token attached to the request.

The main reason I built this was to actually implement auth properly instead of skipping it, which is what a lot of smaller practice projects tend to do.

## API Walkthrough / Sample Requests

Here's exactly what each request looks like and what it should return.

### 1. Signup

**POST** `/api/users/signup`

<img width="955" height="504" alt="Screenshot1-Signup" src="https://github.com/user-attachments/assets/f8ebc62c-0cf3-471e-b4b6-5bb024e0e493" />

### 2. Login

**POST** `/api/users/login`

same email/password used at signup:
<img width="953" height="404" alt="Screenshot2-Login" src="https://github.com/user-attachments/assets/1ff78271-d879-4292-ad24-531a07b1496c" />

### 3. Create a post (with a token)

**POST** `/api/posts`
Authorization tab → Bearer Token → paste the token from signup/login

<img width="949" height="469" alt="Screenshot3-Create a post (with a token)" src="https://github.com/user-attachments/assets/2422d54f-0d66-4587-b0cb-5410b3c2a4b5" />

### 4. Create a post without a token (blocked)

Same request as above, but with no Bearer token attached, shows the auth actually rejecting the request instead of just working when everything's correct.

<img width="1003" height="794" alt="Screenshot4-Create a post without a token (blocked)" src="https://github.com/user-attachments/assets/0a35ff81-9552-4707-b1cb-02e480bdec2e" />

### 5. Get a post by id

**GET** `/api/posts/<id>`
No auth needed.

<img width="953" height="468" alt="Screenshot5-Get a post by id" src="https://github.com/user-attachments/assets/970b84c8-5e50-414f-825d-64bb8da6af7a" />

### 6. Delete a post (with a token)

**DELETE** `/api/posts/<id>`
Authorization tab → Bearer Token

<img width="957" height="376" alt="Screenshot6-Delete a post (with a token)" src="https://github.com/user-attachments/assets/8a0e768b-3911-402c-9e25-e3c7ce4e4670" />

## What's in it

- signup/login, password hashed with bcrypt
- login returns a JWT
- create and delete posts, both need a valid token
- read a single post by id, open to anyone
- basic validation on post creation (title can't be empty, content needs a minimum length)

## Stack

Node, Express, MongoDB Atlas, Mongoose, bcryptjs, jsonwebtoken, express-validator, dotenv

## How it's laid out

Routes point to a controller, the controller does the actual work, models are the Mongoose schemas. There's a small `auth.js` middleware sitting in front of the post creation/delete routes, it checks the `Authorization` header for a valid token before the request is even allowed to reach the controller. Order matters here: the middleware is applied with `router.use(auth)` after the GET route but before the POST/DELETE ones, so reading a post stays open while writing one doesn't.

## Running it

```bash
git clone https://github.com/AhsantMozhgan/node-rest-api.git
cd node-rest-api
npm install
```

`MONGO_URI` can be a free MongoDB Atlas cluster or a local Mongo instance, doesn't matter the app just connects to whatever string's in there.

Then:

```bash
npm start
```

Runs on `localhost:5000`, unless you set a different port.

## Endpoints

**Users**

| Method | Endpoint | Body | Notes |
|--------|-----------|------|-------|
| GET | `/api/users` | — | list everyone |
| POST | `/api/users/signup` | `{ "email", "password" }` | hashes the password, returns the user + a token |
| POST | `/api/users/login` | `{ "email", "password" }` | returns a token if it matches |

**Posts**

| Method | Endpoint | Needs a token? | Body |
|--------|-----------|-----------------|------|
| GET | `/api/posts/:id` | no | — |
| POST | `/api/posts` | yes | `{ "title", "content" }` |
| DELETE | `/api/posts/:id` | yes | — |

For the protected ones, add this header: `Authorization: Bearer <token>`, using whatever token you got back from signup or login.

## Testing it

I've been using Postman for all of this. Sign up, grab the token out of the response, drop it into the Bearer token field under Authorization, then hit the post routes.

## Folder structure

```
node-rest-api/
├── app.js
├── models/
│   ├── posts.js
│   └── users.js
├── controllers/
│   ├── posts-controllers.js
│   └── users-controllers.js
├── routes/
│   ├── posts-routes.js
│   └── users-routes.js
└── middleware/
    └── auth.js
```

## Author

Mozhgan Ahsant
