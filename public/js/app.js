const app = (function app() {
  "use strict";
 var list, tableau;



 const doAjax = function doAjax(url, method, callback, data) {
   try {
     const xhr = new XMLHttpRequest();
     xhr.open(method, url);
     xhr.setRequestHeader('Content-Type', 'application/json'); // on paramètre un peu l'entête de notre requête
     data = data ? JSON.stringify(data) : null;
     if (method.toLowerCase() === "post") {
       if (!data) throw new Error("bad call");
     }
     // on attend le retour de l'appel AJAX
     xhr.onload = evt => callback(evt.target.response || evt.srcElement.response);
     console.log(data);
     xhr.send(data);
   } catch(err) { console.error(err); }
 };



  const getUsers = function getUsers(){
    const url = " http://localhost:5555/get-users";
    doAjax(url, "GET", function(res) {
      console.log(JSON.parse(res));
      userstoList(JSON.parse(res));
    });
  };


  const sendUsers = function sendUsers(e){
    e.preventDefault();
    var Nom = document.getElementById("inpNomP").value;
    var Prix = document.getElementById("inpprixP").value;
    var Marque = document.getElementById("inpMarqueP").value;
    // console.log(inputName+inputLastName+inputEmail);

    const url = " http://localhost:5555/send-users";
     doAjax(url, "POST", function(res){
       // console.log(JSON.parse(JSON.stringify(res)));
       // userstoList(JSON.parse(res));
     },{nom_produit:Nom,prix_produit:Prix,marque_produit:Marque});

     // getUsers();
  }



  // const createTrP = function createTr(produit) {
  //   var tr = document.createElement("tr");
  //   tr.className='row';
  //   tableau.appendChild(tr);
  //   tr.appendChild(createTdPId);
  // }

  // const createTdPId = function createTdPId(produit) {
  //   var td = document.createElement("td");
  //   td.className='col';
  //   tr.appendChild(td);
  //   return td.textContent = produit.id_produit;
  // }

  // const createTdPNom = function createTdPNom(produit) {
  //   var td = document.createElement("td");
  //   td.className='col';
  //   tr.appendChild(td);
  //   td.textContent = produit.nom;
  // }

  // const createTdPPrix = function createTdPPrix(produit) {
  //   var td = document.createElement("td");
  //   td.className='col';
  //   tr.appendChild(td);
  //   td.textContent = produit.prix;
  // }

  // const createTdPMarque = function createTdPMarque(produit) {
  //     var td = document.createElement("td");
  //     td.className='col';
  //     tr.appendChild(td);
  //     td.textContent = produit.id+" / "+produit.lastname+" / "+produit.email;
  // }

const userstoList = function userstoList(produitsBdd) {
    // console.log(createTrP);
    console.log(produitsBdd);
    produitsBdd.forEach(function (e) {
      // createTrP(e);
    });
  }

  function lienP() {
  	alert("ici Produit");
  	location.href="http://localhost:5555/produit";
  }



  const start = function start() {
    tableau = document.getElementById('tableau');
    document.getElementById("btnIdex").onclick = function () {
      getUsers;
      lienP();
    }
    document.getElementById("sendUser").onclick = sendUsers;
  };

  window.addEventListener("DOMContentLoaded",start);
}());
