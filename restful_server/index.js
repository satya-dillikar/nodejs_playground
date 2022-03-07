var express = require('express');
var app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


var fs = require("fs");

// class event {
//    constructor(id, title, desc) {
//        this.ID = id
//        this.Title = title
//        this.Description = desc
//    }
// }


var events = [
	{
		ID:          "1",
		Title:       "Introduction to Golang",
		Description: "Come join us for a chance to learn how golang works and get to eventually try it out",
	},
	{
		ID:          "2",
		Title:       "Python",
		Description: "get to eventually try it out",
	},
	{
		ID:          "3",
		Title:       "Introduction to Javascript",
		Description: "Come join us try it out",
	},      
]

// router.HandleFunc("/", homeLink)
app.get('/', function (req, res) {
   text = "Welcome home!"
   res.end( text);
})

// router.HandleFunc("/event", createEvent).Methods("POST")
app.post('/event', function (req, res) {
   //createEvent
   newEvent = req.body
   console.log("received newEvent %j", newEvent)
   events.push(newEvent)
   res.end( JSON.stringify(newEvent));
})

// router.HandleFunc("/events", getAllEvents).Methods("GET")
app.get('/events', function (req, res) {
   //getAllEvents
   console.log( events );
   res.end( JSON.stringify(events));
})

// router.HandleFunc("/events/{id}", getOneEvent).Methods("GET")
app.get('/events/:id', function (req, res) {
   //getOneEvent
   let eventID=req.params.id
   data =""
   for (singleEvent of events) {
        if (singleEvent.ID == eventID) {
           console.log(singleEvent)
           data =JSON.stringify(singleEvent)
           break
        }
    }
   res.end(data);
})

// router.HandleFunc("/events/{id}", updateEvent).Methods("PATCH")
app.patch('/events/:id', function (req, res) {
   //updateEvent
   let eventID=req.params.id
   updatedEvent =req.body
   console.log("received eventId %d updatedEvent %j", eventID, updatedEvent)
   a_len = events.length
   data =""
   for (i=0; i <a_len; i++) {
      if (events[i].ID == eventID) {
         console.log(events[i])
         data =JSON.stringify(events[i])
			events[i].Title = updatedEvent.Title
			events[i].Description = updatedEvent.Description         
         console.log("The event with ID %d has been updated successfully", eventID)
         break
      }
   }
   res.end(data);
})

// router.HandleFunc("/events/{id}", deleteEvent).Methods("DELETE")
app.delete('/events/:id', function (req, res) {
   let eventID=req.params.id
   data =""
   console.log("received eventId %d", eventID)
   a_len = events.length   
   for (i=0; i <a_len; i++) {
      if (events[i].ID == eventID) {
         console.log(events[i])
         data =JSON.stringify(events[i])     
         events.splice(i,1)
         console.log("The event with ID %d has been deleted successfully", eventID)
         break
      }
   }   
   res.end(data);
})

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

var server = app.listen(port, function (err) {
   if (err) console.log(err);
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})