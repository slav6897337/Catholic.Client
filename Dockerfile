FROM node:current-alpine3.17
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]