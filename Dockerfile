FROM node:14-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG REACT_APP_MAPS_KEY
ENV REACT_APP_MAPS_KEY=${REACT_APP_MAPS_KEY}
RUN npm run build
FROM node:14-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build .
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]