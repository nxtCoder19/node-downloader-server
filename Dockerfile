# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /http_server_node

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# # Set the environment variable for the port number
# ENV PORT=3000

# # Expose the port that the application listens on
# EXPOSE $PORT

# Start the Node.js application
CMD [ "npm","start" ]

# # Set the image name
# LABEL name="my-node-app"

# # Set the Docker Hub username and password as build arguments
# ARG USERNAME=piyushacet
# ARG PASSWORD=Piyush@123

# # Log in to Docker Hub and push the image
# # RUN echo "$PASSWORD" | docker login --username $USERNAME --password-stdin
# RUN docker tag my-node-app $USERNAME/my-node-app:latest
# RUN docker push $USERNAME/my-node-app:latest
