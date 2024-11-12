const express = require("express");

const app = express();

// When we do not return anything the request goes on a infinite loop in the postman and in browsers after certain time they get timed out
// app.get("/user", (req, res) => {});

// Output : Handling the route user 1!! in console and 1st Response will be provided since after sending the response using res.send nothing is executed in JS
// app.use(
//   "/user",
//   (req, res) => {
//     console.log("Handling the route user 1!!");
//     res.send("1st Response");
//   },
//   (req, res) => {
//     console.log("Handling the route user 2!!");
//     res.send("2nd Response");
//   }
// );

// Output : Prints Handling the route user 1!! in console and goes into infinite loop as there is no response is sent back express will not understand it needs to go to the next route handler without specifying the next keyword
// app.use(
//   "/user",
//   (req, res) => {
//     console.log("Handling the route user 1!!");
//   },
//   (req, res) => {
//     console.log("Handling the route user 2!!");
//     res.send("2nd Response");
//   }
// );

// Output : Prints Handling the route user 1!! in console and sice next is given it moves to the 2nd request handler and prints Handling the route user 2!! and returns the 2nd Response
// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("Handling the route user 1!!");
//     next();
//   },
//   (req, res) => {
//     console.log("Handling the route user 2!!");
//     res.send("2nd Response");
//   }
// );

// Output : Prints Handling the route user 1!! in console and returns 1st Response and since next is there and JS executes line by line it goes to the next route handler prints Handling the route user 2!! in console and throws error since we are trying to send 2nd time response to the same API /user
// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("Handling the route user 1!!");
//     res.send("1st Response");
//     next();
//   },
//   (req, res) => {
//     console.log("Handling the route user 2!!");
//     res.send("2nd Response");
//   }
// );

// Output: Handling the route user 1!! and 1st Response since we have a return in the first request handler itslef it will not move down the pipe
// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("Handling the route user 1!!");
//     res.send("1st Response");
//   },
//   (req, res) => {
//     console.log("Handling the route user 1!!");
//     res.send("2nd Response");
//   },
//   (req, res) => {
//     console.log("Handling the route user 3!!");
//     res.send("3nd Response");
//   },
//   (req, res) => {
//     console.log("Handling the route user 4!!");
//     res.send("4th Response");
//   },
//   (req, res) => {
//     console.log("Handling the route user 5!!");
//     res.send("5th Response");
//   }
// );

// Output : Handling the route user 1!!, Handling the route user 2!!, Handling the route user 3!!, Handling the route user 4!!, Handling the route user 5!! will be printed in the console and 5th Response will be returned since till 4th one we do not have return and only have next
// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("Handling the route user 1!!");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the route user 1!!");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the route user 3!!");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the route user 4!!");
//     next();
//   },
//   (req, res) => {
//     console.log("Handling the route user 5!!");
//     res.send("5th Response");
//   }
// );

// Output : Handling the route user 1!!, Handling the route user 2!!, Handling the route user 3!!, Handling the route user 4!!, Handling the route user 5!! and an error will be thrown since the 5th request handler as next() express expects a request handler but when it does not find one it throws an error
// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("Handling the route user 1!!");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the route user 1!!");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the route user 3!!");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the route user 4!!");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the route user 5!!");
//     next();
//   }
// );

// We can map all the request handlers inside a single array like below even we can wrap any two or three request handlers and it will work fine
// app.use("/user", [
//   (req, res, next) => {
//     console.log("Handling the route user 1!!");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the route user 1!!");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the route user 3!!");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the route user 4!!");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the route user 5!!");
//     res.send("5th Response");
//   },
// ]);

app.use(
  "/user",
  [
    (req, res, next) => {
      console.log("Handling the route user 1!!");
      next();
    },
    (req, res, next) => {
      console.log("Handling the route user 1!!");
      next();
    },
  ],
  [
    (req, res, next) => {
      console.log("Handling the route user 3!!");
      next();
    },
    (req, res, next) => {
      console.log("Handling the route user 4!!");
      next();
    },
    (req, res, next) => {
      console.log("Handling the route user 5!!");
      res.send("5th Response");
    },
  ]
);

app.listen(7777, () => {
  console.log("Application Successfully started on port 7777");
});
