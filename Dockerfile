FROM node:16.11.1-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
# COPY yarn.lock ./
RUN yarn

# add app
COPY . ./
RUN yarn build

FROM amazon/aws-cli

COPY --from=build /app/build .

CMD ["s3", "sync", "./", "s3://cvwo-fe"]