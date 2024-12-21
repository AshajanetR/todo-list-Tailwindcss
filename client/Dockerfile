# Use official Node.js image as base
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to work directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your app runs on
EXPOSE 5000

# Command to run your application
CMD ["npm", "start"]
