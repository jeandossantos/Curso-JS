import Http from 'http';

let count = 1;
async function handle(req, res) {
  count++;

  try {
    if (count % 2 === 0) {
      await Promise.reject('Error dentro do handler');
    }

    try {
      for await (const data of req) {
        if (count % 2 !== 0) {
          await Promise.reject('Error dentro do for');
        }
        res.end();
      }
    } catch (error) {
      console.log('An error has happened 1', error);
      res.writeHead(500);
      res.write(
        JSON.stringify({
          message: 'Internal server error',
        })
      );
      res.end();
    }
  } catch (error) {
    console.log('An error has happened ', error);
    res.writeHead(500);
    res.write(
      JSON.stringify({
        message: 'Internal server error',
      })
    );
    res.end();
  }
}

Http.createServer(handle).listen(3001, () =>
  console.log('Server listening on port 3001')
);
