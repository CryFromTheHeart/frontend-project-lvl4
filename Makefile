start-backend:
	npx start-server -p 5001 -s ./my-app/build
start-frontend:
	make -C my-app start
start:
	make start-backend & make start-frontend
deploy:
	git push heroku main