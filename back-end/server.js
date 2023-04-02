#!/usr/bin/env node

const server = require("./app")

const port = process.env.PORT || 3001

if(!module.parent){
  const listener = server.listen(port, function () {
    console.log(`Server running on port: ${port}`)
  })
}

const close = () => {
  listener.close()
}

module.exports = {
  close: close,
}