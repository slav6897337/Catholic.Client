FROM node:18.17-alpine as build
WORKDIR /app
ARG REACT_APP_MAPS_KEY
ENV REACT_APP_MAPS_KEY=$REACT_APP_MAPS_KEY
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM node:14-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build .
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]