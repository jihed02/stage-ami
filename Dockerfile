FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force
RUN npm install 
#RUN npx ngcc --properties es2023 browser module main --first-only --creative-ivy-entry-points
COPY . . 
RUN npm run build 
FROM nginx:stable
COPY --from=build /app/dist/ami_front /usr/share/nginx/html
EXPOSE 80
