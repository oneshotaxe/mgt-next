cd ./backend
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o apiserver .

cd ../frontend
npm run build

cd ..
docker-compose -p mgt_prod -f docker-compose.yml up -d --build
