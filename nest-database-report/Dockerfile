FROM node:18.13.0

# Cài đặt các dependencies cần thiết
RUN apt-get update && apt-get install -y \
    mariadb-client \
    wget \
    gnupg2 \
    apt-transport-https \
    curl \
    ca-certificates

# Cài đặt SingleStore Client bằng cách thay thế
RUN curl -sL 'https://release.memsql.com/release-aug2018.gpg' | gpg --dearmor -o /usr/share/keyrings/memsql-archive-keyring.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/memsql-archive-keyring.gpg] https://release.memsql.com/production/debian memsql main" | tee /etc/apt/sources.list.d/memsql.list \
    && apt-get update \
    && apt-get install -y singlestore-client

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy các file cần thiết từ máy chủ vào container
COPY ["package.json", "./"]  
# Copy file package.json trước để tận dụng cache trong Docker
COPY . .  
# Copy tất cả các file còn lại vào container

# Cài đặt các phụ thuộc của dự án
RUN npm install -f  
# Cài đặt lại tất cả các phụ thuộc

# Biên dịch ứng dụng (nếu cần, ví dụ như TypeScript hoặc quá trình build khác)
RUN npm run build

# Lệnh để chạy ứng dụng khi container khởi động
CMD ["npm", "run", "start:dev"]
