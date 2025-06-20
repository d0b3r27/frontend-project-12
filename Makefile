lint-frontend:
	make -C frontend lint

install:
	npm ci

start:
	npm start

build:
	rm -rf frontend/dist
	npm run build

start-backend:
	npx @hexlet/chat-server

start-frontend:
	make -C frontend dev

dev:
	make start-backend & make start-frontend

lint:
	npx eslint --ext js,jsx \
	--config ./frontend/.eslintrc.yml \
	--ignore-path ./frontend/.eslintignore \
	./frontend