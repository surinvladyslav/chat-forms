NPM := $(shell which npm)

docker-up:
	sudo docker-compose up -d

docker-down:
	sudo docker-compose down