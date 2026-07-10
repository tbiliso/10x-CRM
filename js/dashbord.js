//get active uset text
const activeUserText = localStorage.getItem('currentUser');

//if user is not logged in
if(!activeUserText){
    alert("Please log in first!");
    window.location.href ='index.html';
} else {
    //text becomes JS objects
    const activeUserObj = JSON.parse(activeUserText);
    console.log('activeUserObj');
}