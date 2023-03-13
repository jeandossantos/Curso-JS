URL=localhost:3001
npx autocannon $URL -m POST \
    --warmup [-c 1 -d 3] \
    --connections 500 \
    --pipelines 10 \
    --renderStatusCodes

# cat log.txt | grep 60069 | wc -l