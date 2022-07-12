start-backend:
	npx start-server -p 5001
start-frontend:
	make -C my-app start
start:
	make start-backend & make start-frontend
deploy:
	git push heroku main
install:
	npm ci
	make -C my-app install