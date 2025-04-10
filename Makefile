lint-frontend:
	make -C frontend lint

install:
	npm ci

start:
	npm start

build:
	rm -rf frontend/dist
	npm run build