.PHONY: dev build prod stop restart logs status clean lint typecheck verify

dev:
	npm run dev

build:
	npm run build

prod: build
	pm2 startOrReload ecosystem.config.cjs
	pm2 save

stop:
	pm2 stop vart-solucoes-website

restart:
	pm2 restart vart-solucoes-website

logs:
	pm2 logs vart-solucoes-website

status:
	pm2 status

clean:
	pm2 delete vart-solucoes-website

lint:
	npm run lint

typecheck:
	npm run typecheck

verify:
	npm run verify
