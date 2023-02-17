echo '$\n\n[requesting: normal request]'
curl -i localhost:3001 -X POST --data '{"name": "Vingador", "age": 80}'

echo '$\n\n[requesting: wrong age request]'
curl -i localhost:3001 -X POST --data '{"name": "Vingador", "age": 18}'

echo '$\n\n[requesting: wrong name request]'
curl -i localhost:3001 -X POST --data '{"name": "V", "age": 70}'


echo '$\n\n[requesting: connection error request]'
curl -i localhost:3001 -X POST --data '{ "connectionError": "error"}'