# Se formos utilizar algum, framework de javascript/typescript pro front (exemplo: React), depois que tivermos o esqueleto da aplicação é só remover as partes comentadas. Caso contrário, será necessário montar o Dockerfile conforme a stack escolhida.

FROM node:22-slim as build

WORKDIR /app
# COPY package*.json ./
# RUN npm install

# COPY . .
# RUN npm run build

FROM nginx:alpine
# COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80