IMAGE_URL="https://www.pngarts.com/files/3/Predator-PNG-Image.png"
IMAGE_BACKGROUND_URL="https://i.pinimg.com/originals/99/1c/7b/991c7b93bfad2537d9b2334166c05c1e.jpg"
curl "http://localhost:3001/joinImages?image=$IMAGE_URL&background=$IMAGE_BACKGROUND_URL"

npx autocannon --renderStatusCodes -c500 "http://localhost:3001/joinImages?image=$IMAGE_URL&background=$IMAGE_BACKGROUND_URL"

# http://localhost:3001/joinImages?image=https://tryhardguides.com/wp-content/uploads/2021/08/predator-featured.png&background=https://i.pinimg.com/originals/99/1c/7b/991c7b93bfad2537d9b2334166c05c1e.jpg