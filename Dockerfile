# Instale as dependências
FROM node:16 AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Construa o aplicativo
FROM node:16 AS builder
WORKDIR /app
COPY . .
COPY .env.example .env
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# Crie a imagem final
FROM node:16
WORKDIR /app
COPY --from=builder /app .
EXPOSE 5173
ENV PORT=${PORT}
CMD ["yarn", "dev", "--host"]
