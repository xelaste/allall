# Specifies where to get the base image (Node v12 in our case) and creates a new container for it
FROM node:12

# Set working directory. Paths will be relative this WORKDIR.
WORKDIR /usr/src/app

ENV http_proxy http://genproxy:8080
ENV https_proxy http://genproxy:8080


# Copy source files from host computer to the container
COPY . .

RUN rm -fr node_modules/* coverage/* dist/* .git .vscode

RUN npm install


# Build the app
RUN npm run-script heroku-postbuild

# Specify port app runs on
EXPOSE 3000

# Run the app
CMD [ "npm", "start" ]