echo "Building application........................"
rm -rf node_modules dist
# docker stop $(docker ps -q)

docker build . --platform linux/amd64 -t namtechdocker/nestjs-database-report:1.1.1
docker push namtechdocker/nestjs-database-report:1.1.1
# docker run -d -p 1997:1997 namtechdocker/nestjs-database-report:1.1.0

# docker-compose up -d

