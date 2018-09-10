/* jshint esversion : 6 */
const express = require("express");
const app = express();
const database = require("./database");
const path = require('path');
// var bodyParser = require("body-parser"); // integré a express
const port = 5555;


app.use(express.static(__dirname + '/public', {
  extensions: ['html']
}));
app.use(express.json({extended: false}));

// APP CONFIG !!!
app.set("view engine", "ejs"); // CHECK THE DOC http://ejs.co/
app.set("views", __dirname + "/view"); //  précise à express le dossier des vues
// définition de ressources statiques...
app.use("/ejs", express.static(__dirname + "/node_modules/ejs"));
app.use(express.static(__dirname + "/public"));

// app.get('/', function(req, res) {
//    res.sendFile(path.join(__dirname + '/index.html'));
// });

app.post('/send-users', function(req, res) {
  console.log("Add user !");
  console.log(req.body);
  database.sendProduit(function (err, dataset) {
    res.send(dataset);
  }, req.body);
  });

  // app.post('/delete-user', function(req, res) {
  //   console.log("Delete users !");
  //   database.deleteUser(function (err, dataset) {
  //     res.send(dataset);
  //   }, req.body);
  //   });

app.get('/get-users', function(req, res) {
  console.log("Get users");
  const user = database.getProduit(function (err,users) {
    res.send(users);
    // res.render("index", {nom: "guillaume"});
  },req.body);
});

// ROUTES DES PAGES DE l"APPLICATION
app.get("/produit", function(req, res) {
  const user = database.getProduit(function (err,users) {
  res.render("produit", {users: users});
  console.log(users);
  // on passe un objet ({nom: "gui"}) à la vue, utilisable dans le template EJS
  },req.body);
});

app.listen(port, function () {
  console.log(`server waiting @ http://localhost:${port}`);
});
// /* jshint esversion : 6 */
// /*
//   LECTURES UTILES D'ICI FIN OCTOBRE
//     https://developer.mozilla.org/en-US/docs/Web/JavaScript
//     https://www.youtube.com/watch?v=YIoUjR24SMw&list=PL2B82A06C79ECE66E
//     https://laurent-audibert.developpez.com/Cours-UML/
//     https://git-scm.com/book/fr/v1/
//     // HTTP STATUS CODES + VERBS
//     https://restfulapi.net/http-status-codes/
//     https://www.restapitutorial.com/lessons/httpmethods.html
//     // PORTS
//     https://fr.wikipedia.org/wiki/Liste_de_ports_logiciels
//     https://www.youtube.com/watch?v=SWZ_4YBFBhs
//     https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website
// */
// const database = require("./database");
// // database.test();
// const express = require("express");
// const app = express();
// const path = require('path');
// const port = 5555;
// /** _______ */
// /** _______ */
// /** _______ */
//
// app.use(express.json({ extended: false })); // to support JSON-encoded bodies
// // app.use(express.urlencoded({ extended: false })); // to support URL-encoded bodies
// // app.use(express.multipart({ extended: true }));       // NEED DEPENDENCIE -> to support JSON-encoded bodies
//
// app.use(express.static(__dirname + '/public', {
//   extensions: ['html']
// }));
//
// // CONFIGURATION D'UNE ROUTE ( http://localhost:${port}/user )
// app.post('/user', (req, res) => {
//   // UTILISATION DU MODELE
//   database.createUser((err, info) => {
//     if (err) return res.status(500).send(err);
//     return res.status(200).send(info);
//   }, req.body); // post datas ici ...
// });
//
// // CONFIGURATION D'UNE NOUVELLE ROUTE
// app.get('/user/:id', (req, res) => {
//     // UTILISATION DU MODELE
//   database.getUser( (err, dataset) => {
//     res.send(dataset[0]);
//   }, req.params.id); // extrait l'id de la route demandée : )
// });
//
// // IDEM ...
// app.get('/user', (req, res) => {
//   database.getUser( (err, users) => {
//     if (err) return res.status(500).send(err);
//     return res.status(200).send(users);
//   }, null);
// });
//
// // ETC ...
// app.delete('/user', (req, res) => {
//   // console.log("laaaa");
//   // console.log(req.body.ids);
//   // return;
//   database.deleteUser((err, dataset) => {
//     if (err) return res.status(500).send(err);
//     return res.status(200).send(dataset);
//   }, req.body.ids); // tableau d'ids ici ...
// });
//
// app.patch('/user', (req, res) => {
//   database.editUser((err, dataset) => {
//     if (err) return res.status(500).send(err);
//     else return res.status(200).send(dataset);
//   }, req.body); // tableau d'ids ici ...
// });
//
// // NOTRE APPLICATION EXPRESS ECOUTE SUR LE PORT HTTP DEFINIT EN DEBUT DE FICHIER
// app.listen(port, () => {
//   console.log('Example app listening on port ' + port);
// });
