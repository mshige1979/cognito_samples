# Use the Node.js v22 image
FROM node:22

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install the dependencies
RUN npm install
