const express = require("express");

const app = express();

// -> Node runs the code from top to bottom hence the order of routes matter
// -> /hello matches all the things that start with /hello/123/xyz or /hello/xyz but it does not handle /hello123. It will be the same logic for all the other routers
// -> If we keep / at the top nothing after that matches like /hello or /test and / request handler alone will be executed

app.get("/user", (req, res) => {
  // req.query is used to retreive the query params from the request
  // For /user?userId=100 it logs { userId: '100' }
  // For /user?userId=100&password="muthu" it logs { userId: '100', password: '"muthu"' }
  console.log(req.query);
  res.send({ firstName: "Muthu Annamalai", lastName: "Venkatachalam" });
});

app.get("/user/:userId", (req, res) => {
  // used to retreive the path params from the request
  // For /user?100 it logs { userId: '100' }
  console.log(req.params);
  res.send({ firstName: "Muthu Annamalai", lastName: "Venkatachalam" });
});

app.get("/user/:userId/:name/:password", (req, res) => {
  // used to retreive the path params from the request
  // For /user/100/Muthu/abc@123 it logs { userId: '100', name: 'Muthu', password: 'abc@123' }
  console.log(req.params);
  res.send({ firstName: "Muthu Annamalai", lastName: "Venkatachalam" });
});

app.post("/user", (req, res) => {
  // logic to save data in DB
  res.send("Data successfully saved to DB");
});

app.put("/user", (req, res) => {
  // logic to update data in DB
  res.send("Data successfully updated in DB");
});

app.patch("/user", (req, res) => {
  // logic to path the data in DB
  res.send("Data successfully patched in the DB");
});

app.delete("/user", (req, res) => {
  // logic to delete the data in DB
  res.send("Data successfully deleted in the DB");
});

// ? makes b optional so now this route will match for abc or only ab
app.get("/ab?c", (req, res) => {
  res.send("Hello");
});

// + allows us to add as many y after x so the route matches for /xyz or /xyyyyyyz like that
app.get("/xy+z", (req, res) => {
  res.send("Hello!!");
});

// * allows us to add anything in between ef and gh so it matches for /abcd or /efMuthugh like that
app.get("/ef*gh", (req, res) => {
  res.send("Hello!");
});

// ? makes kl optional so it will work for /ijklm or /ijm but will not work /ijlm
// The sequence kl is optional, but if present, it must appear exactly as kl and not in any other way this is the reason why /ijlm does not work
app.get("/ij(kl)?m", (req, res) => {
  res.send("Hello!");
});

// + allows us to add as many bc after a so the route matches for /abcd or /abcbcbcd like that
app.get("/a(bc)+d", (req, res) => {
  res.send("Hello!");
});

// Below regex works if a is there else would not work
app.get(/a/, (req, res) => {
  res.send("Hello from regex a!");
});

// Below regex works if anything in start and end with fly
app.get(/.*fly$/, (req, res) => {
  res.send("Hello from regex fly!");
});

// Will match all the HTTP method API calls so for any request coming with GET, POST, PUT, PATCH or DELETE to /test it returns only Hello from Test
app.use("/test", (req, res) => {
  res.end("Hello from Test");
});

app.listen(7777, () => {
  console.log("Application Successfully started on port 7777");
});
