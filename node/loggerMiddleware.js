
const logger = (request, response, next) => {
  console.log(request.path)
  console.log(request.body)
  console.log(request.method)
  console.log("------")
  next()
}


module.exports = logger