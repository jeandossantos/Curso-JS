# a partir da raiz dos projetos modules01,02,03,04...
find -name *.test.js
find -name *.test.js -not -path '*node_modules**'

npm i ipt -g
cp -r ../../module01/aula05-tdd-part-3 .

find -name *.js -not -path '*node_modules**' | ipt

CONTENT="'use strict';"
find -name *.js -not -path '*node_modules**'  \
| ipt -o \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'
/g' {file}
