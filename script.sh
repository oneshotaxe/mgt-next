cd ./backend
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o apiserver .

cd ../frontend
npm run build

cd ..
docker-compose up -d --build
