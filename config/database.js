if(process.env.NODE_ENV === 'production'){
  module.exports = {mongoURI:'mongodb://lifa:lifaSean24@ds253889.mlab.com:53889/vidjot-prod'}
}else{
  module.exports = {mongoURI : 'mongodb://localhost/vidjot-dev'}
}