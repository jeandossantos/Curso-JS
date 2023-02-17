echo '$\n\n[requesting: normal request]'
curl -i localhost:3001 -X POST --data '{"name": "Vingador", "age": 80}'

echo '$\n\n[requesting: invalid request]'
curl -i localhost:3001 -X POST --data '{"name": "V", "age": 18}'

echo '$\n\n[requesting: connection error request]'
curl -i localhost:3001 -X POST --data '{ "connectionError": "error"}'