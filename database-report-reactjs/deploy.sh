echo "Building application........................"
rm -rf node_modules dist
docker build . --platform linux/amd64 -t namtechdocker/reactjs-database-report:1.1.1

docker push namtechdocker/reactjs-database-report:1.1.1
# docker-compose up -d
