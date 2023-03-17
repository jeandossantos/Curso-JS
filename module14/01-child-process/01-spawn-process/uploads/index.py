# python3 index.py '{"filepath": "my-data.csv", "url": "http://localhost:3001"}'
import sys
import json
from urllib import request

def main():
    item = json.loads(sys.argv[1])
    url = item.get('url')
    filepath = item.get('filepath')
    data = open(filepath, 'rb').read()
    req = request.Request(url, data)
    response = request.urlopen(req).read().decode('utf-8')
    print(response)


if __name__ == '__main__':
    main()