//get active uset text
const activeUserText = localStorage.getItem('currentUser');

//if user is not logged in
if(!activeUserText){
    alert("Please log in first!");
    window.location.href ='index.html';
} 
else {
    //text becomes JS objects
    const activeUserObj = JSON.parse(activeUserText);
    console.log('activeUserObj');


    document.getElementById('welcome_user').textContent = `Welcome, ${activeUserObj.fullName}!`;
    document.getElementById('logout_butt').addEventListener('click', function(){
        localStorage.removeItem('currentUser');
            window.localStorage.href = 'index.html'
    })
}

