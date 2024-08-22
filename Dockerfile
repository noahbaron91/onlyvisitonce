FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./frontend/package.json /app/frontend/package.json
COPY ./backend/package.json /app/backend/package.json

# Install the dependencies
RUN cd frontend && npm install
RUN cd backend && npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build frontend to be served by backend
RUN cd frontend && npm run build

RUN cd backend && npm run build
RUN cd backend && npx prisma generate

# Expose the port that your app will run on
EXPOSE 8080

# Change to backend directory
WORKDIR /app/backend

# Define the command to run your app
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
