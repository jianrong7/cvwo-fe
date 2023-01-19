# Gossip with Go (Frontend) [22/23 CVWO Winter Assignment]

A web forum built with React and Golang.

You can find the live version of the project [here](https://d3mj3t330xelda.cloudfront.net).
You can find the backend [here](https://3.1.102.180.nip.io) and its repository [here](https://github.com/jianrong7/cvwo-be).

## Submission Details

**Name:** Loh Jian Rong

**Matric No.:** A0252735A

[Mid-Assignment Writeup](https://docs.google.com/document/d/1-RYiu5qhJFxY_yzrtO3-t6H8u4rrveW-IbFkb_v6Nwo/edit?usp=sharing)

[Final Writeup PDF](LohJianRong_A0252735A_FinalWriteup.pdf)

[Final Writeup](https://docs.google.com/document/d/1ue6fdsfiKC5K_nJlri1ayKpaXh7ntIB6A7QUhmDAi1E/edit?usp=sharing)

## Getting started on your local machine

1. Clone the reponsitory.

```
$ git clone git@github.com:jianrong7/cvwo-fe.git
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

This app is deployed to an AWS S3 bucket. In order to enable HTTPS, I used AWS Cloudfront as a CDN. As I do not have a custom domain and I do not want to pay for one, I just used the given AWS domain.

## [User Manual](https://imgur.com/a/UAjL8q6)
