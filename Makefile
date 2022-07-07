start-frontend:
	make -C my-app start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

deploy:
	git push heroku main