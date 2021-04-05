module.exports = (error, request, response, next ) => { //middleware error
  console.log(error)
  console.log(error.name)
  if(error.name=== 'CastError') {
    response.status(400).send( { error : 'id uses is malformed'})
  } else {
    response.status(500).end()
  }
}