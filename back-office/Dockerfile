# Specify the base image to use
FROM node:alpine

# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package.json package.json ./
# COPY package-lock.json package-lock.json
# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

EXPOSE 3003

# Set the command to start the server
CMD [ "npm" , "run", "start"]