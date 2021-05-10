var userid;
var uname;
const username = document.querySelector("#getUname");
const userscore = document.querySelector("#getScore");
const scoreList = document.querySelector("#user-score-list");

console.log(firebase);

auth.onAuthStateChanged((user) => {
  console.log(user.uid);
  db.collection("users")
    .doc(user.uid)
    .get()
    .then((doc) => {
      uname = doc.data().username;
      scr = doc.data().score;
      username.textContent = uname;
      userscore.textContent = scr;

      db.collection("scores")
        .limit(5)
        .where("username", "==", uname)
        .orderBy("timestamp", "desc")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let tr = document.createElement("tr");
            let uname = document.createElement("p");
            let game = document.createElement("p");
            let score = document.createElement("p");

            uname.textContent = doc.data().username;
            game.textContent = doc.data().game;
            score.textContent = doc.data().score;
            td1.appendChild(uname);
            td2.appendChild(game);
            td3.appendChild(score);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            scoreList.appendChild(tr);
          });
        });
    });
});
