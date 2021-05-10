const scoreList = document.querySelector('#score-list')
console.log(firebase)
const lt = document.querySelector('#leader-tb')

// THIS IS USED AS AN AUTO UPADATE. 
db.collection("users")
    .orderBy('score', 'desc')
    .limit(10)
    .onSnapshot(snapshot => {
        setUpLeader(snapshot.docs)
    });


// FETCHES USER DATA FROM SCORES TABLE BY USING THE USERS UNIQUE TOKEN
const setUpLeader = (data) => {
    let ht = "";
    data.forEach((doc) => {
        const lead = doc.data();
        const leads = `
        <tr>
        <td><p class="indigo-text text-lighten-2 center">${lead.username}</p></td>
        <td><p class="indigo-text text-lighten-2 center">${lead.score}</p></td>
        </tr>`;
        ht += leads;
        console.log(lead.username)
    })
    lt.innerHTML = ht
}

// THIS UPDATES THE RECENT SCORES SECTION
db.collection("scores")
    .orderBy('score', 'desc')
    .limit(10)
    .onSnapshot(snapshot => {
        setUpscore(snapshot.docs)
    })

const setUpscore = (data) => {
    let tb_html = "";
    data.forEach((doc) => {
        const guide = doc.data();
        const row =
            `<tr>
            <td><p>${guide.username}</p></td>
            <td><p>${guide.game}</p></td>
            <td><p>${guide.score}</p></td>
            </tr>`;
        tb_html += row;
        console.log(guide.username)
    })
    scoreList.innerHTML = tb_html;
}




