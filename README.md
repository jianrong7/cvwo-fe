# Gossip with Go (Frontend) [22/23 CVWO Winter Assignment]

A web forum built with React and Golang.

You can find the live version of the project [here](https://3.1.102.180.nip.io/).
You can find the frontend [here](https://cvwo-fe.s3.ap-southeast-1.amazonaws.com/index.html) and its repository [here](https://github.com/jianrong7/cvwo-fe).

## Submission Details

**Name:** Loh Jian Rong

**Matric No.:** A0252735A

[Mid-Assignment Writeup](https://docs.google.com/document/d/1-RYiu5qhJFxY_yzrtO3-t6H8u4rrveW-IbFkb_v6Nwo/edit?usp=sharing)

## Getting started on your local machine

1. Clone the reponsitory.

```
$ git clone git@github.com:jianrong7/cvwo-be.git
```

2. Install project dependencies.

```
$ yarn
```

3. Create a .env file to point to the backend. For now, you only need to set the value for `REACT_APP_API_URL`.

```
<!-- If you are using the public backend. -->
$ REACT_APP_API_URL=https://3.1.102.180.nip.io

<!-- If you have cloned the backend and started it up on your local machine. -->
$ REACT_APP_API_URL=http://localhost:3000
```

4. Start the server. (Default is on port 8080)

```
$ yarn start
```

## Tools/Technologies used

- React.js with TypeScript
- Redux for global state management
- React Query for requests to the server
- Axios for HTTP Client
- React Hook Form for form validation
- Zod for schema validation
- MUI for Component library
- TipTap for Rich Text Editor
- React Router for routing

## Project Structure

```sh
Dockerfile     # To dockerize container.
src
├── api        # HTTP Client and Service layer to communicate with server.
├── app        # Boilerplate for Redux store.
├── components # React components for each page.
├── modules    # Redux slices and types.
├── pages      # Individual pages in application.
└── utils      # Custom hooks and miscellaneous utility functions.
```

## Deployment

This app is deployed to an AWS S3 bucket. As I do not have a custom domain and I do not want to pay for one, I just used to given AWS domain.

## Reflections

Updated as at 25 Dec 2022.

I have been enjoying building this application. Having some experience working with React and Redux at 99.co, I was quite confident about the frontend. However, I think integrating TypeScript has been a relative joy and I think I will continue using it in the future. The learning curve is still gentle enough for me to pick up on the go as I built the project.

Since this project was to maximise my learning, I decided to learn something that I thought would be more popular in the real-world. Therefore, I decided to use Golang for my backend. I was excited for it because it is my first time using a compiled language to build a backend application as I have been mostly using interpreted languages like Node.js and Python.

I think the hardest part was designing the database schema. Fortunately, this is a new project and I can easily nuke the existing database to replace them. If I handle databases with existing data in the future, I will need to know how to handle them as well.

I have not dealt with deployment on AWS yet, so I think that will be another challenge. However, I am excited for that and I hope to do that soon once I finish my plan without the stretch goals. Only after the site is live, I will begin work on the stretch goals.

## Feature ideas so I don't forget

- [x] Update/Delete for Posts/Comments
- [x] Login should have a remember me checkbox
- [x] Search function for homepage
- [x] Ratings system/model
- [x] Fix the sorting system on homepage
- [x] URL Search Params
- [x] Generate post with ChatGPT/OpenAI
- [x] Sorting system for comments
- [x] User page -> Offers customisation to profile
- [ ] Image hosting for posts
