# Menggunakan base image node:alpine
FROM node:16-alpine

# Membuat directory app, setting working directory
WORKDIR /usr/src/app

# Copy file package.json dan yarn.lock (jika ada)
COPY package.json yarn.lock ./

# Copy folder prisma untuk konfigurasi
COPY prisma ./prisma/

# Copy file .env 
COPY .env ./

COPY . .

# Menginstal dependency
RUN yarn

# Inisialisasi prisma client
RUN npx prisma generate

# Expose port (for documentation)
EXPOSE 5000

# Run the app
CMD [ "yarn", "start"]