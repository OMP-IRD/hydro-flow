.PHONY:docker-build-latest

all: run

run: docker-build-hyfaa docker-run-hyfaa

docker-build-hyfaa:
	docker build -f apps/hyfaa/Dockerfile -t pigeosolutions/hyfaa-frontend:latest .

docker-run-hyfaa:
	docker run -p 5001:80 pigeosolutions/hyfaa-frontend:latest
