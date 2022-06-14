import http from 'http';
import {ADPDemo} from './demo.js'

//create a server object:
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  res.write('Demo: GET and POST' + '<br/>'); //write a response
  res.write('Please look in to the terminal output'); //write a response

  ADPDemo();
 
  
  res.end(); //end the response
}).listen(3000, function(){
 console.log("server start at port 3000"); //the server object listens on port 3000
});