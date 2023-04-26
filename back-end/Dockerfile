FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

CMD [ "npm", "start" ]