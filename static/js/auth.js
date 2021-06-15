//listen for state change
auth.onAuthStateChanged(user => {
    console.log(user)
    if (user) {
        setupUI(user);
    }
    else {
        setupUI();
    }
})
//logout menu for normal navbar
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('user signed out')
    });
    window.location.href = "index.html";
})

//logout menu for mobile navbar
const logout1 = document.querySelector('#logout1');
logout1.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('user signed out')
    });
    window.location.href = "index.html";
})

