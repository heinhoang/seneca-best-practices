// To use use, run `node microservice.js`
// then go to `http://localhost:10101/act?role=math&cmd=sum&left=1&right=2`
// or open other cmder and type `curl -d '{"role":"math","cmd":"sum","left":1,"right":2}' http://localhost:10101/act`
require('seneca')()
    .use('math-plugin')
    .listen(); // starts a microservice process that listens on port 10101 for HTTP requests