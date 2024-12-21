# Use the official Node.js 14 image as base
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from the current directory to the working directory
COPY . .

# Expose port 5000
EXPOSE 5000

# Command to run the application
CMD ["node", "index.js"]
