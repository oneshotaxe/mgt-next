FROM golang:1.19-alpine AS builder
RUN apk add build-base

WORKDIR /build

COPY go.mod go.sum ./
RUN go mod download

COPY . .

ENV GOOS=linux GOARCH=amd64
RUN go build -ldflags="-s -w" -o apiserver .

CMD ["./apiserver"]
