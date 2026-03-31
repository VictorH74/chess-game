IMAGE := chess-game

.PHONY: install dev build preview docker-build docker-run docker-dev

install:
	npm install

dev: install
	npm run dev

build: install
	npm run build

preview: install
	npm run preview

docker-build:
	docker build -t $(IMAGE) .

docker-run:
	docker run --rm -p 8080:80 $(IMAGE)

docker-dev:
	docker run --rm -it \
	  -p 5173:5173 \
	  -v "$$PWD":/app \
	  -w /app \
	  node:18-alpine \
	  sh -c "npm install && npm run dev -- --host 0.0.0.0"
