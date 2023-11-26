# Gunakan image Node.js sebagai base image
FROM node:14

# Tentukan direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file lainnya ke direktori kerja
COPY . .

# Tentukan port yang akan digunakan oleh aplikasi
EXPOSE 80

# Jalankan aplikasi
CMD [ "node", "server.js" ]
