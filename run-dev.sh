# build docker image
docker build -f Dockerfile.development -t metrofare-dev-img .

# run docker container
docker run --name metrofare-dev-cont \
-v ${PWD}:/home/node \
-v node_modules:/home/node/node_modules \
-p 3000:3000 \
metrofare-dev-img