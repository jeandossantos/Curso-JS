import http from 'node:http';

// curl -i "http://localhost:3001?discount=15&salary=3000"
function netSalary({ discount, salary }) {
  const percent = discount / 100;
  const cost = percent * salary;

  const result = salary - cost;

  return result;
}

http
  .createServer(function (req, res) {
    const url = req.url.replace('/', '');
    const params = new URLSearchParams(url);
    const data = Object.fromEntries(params);
    const result = netSalary(data);

    res.end(`O seu salário final é: ${result}`);
  })
  .listen(3001, () => console.log('Server listening on port 3001'));
