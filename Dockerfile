FROM node:20.11.0-alpine

WORKDIR /app

# Copy package.json and package-lock.json separately
COPY package.json package-lock.json ./

# Install npm dependencies only if package.json or package-lock.json has changed
RUN npm install -g typescript

# Copy the rest of the application code
COPY . .

# Run TypeScript compilation
RUN npm run build

# Install application dependencies
RUN npm install --only=production

CMD ["npm", "start"]

EXPOSE 3500
