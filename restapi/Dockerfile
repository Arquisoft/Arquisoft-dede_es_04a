FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/Arquisoft/dede_es4a
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ARG DATABASE_URL="database"
ENV DATABASE_URL=$DATABASE_URL

ARG CLOUDINARY_URL="cloudinary"
ENV CLOUDINARY_URL=$CLOUDINARY_URL

ARG SECRET="jwt"
ENV SECRET=$SECRET

CMD [ "npm", "start" ]