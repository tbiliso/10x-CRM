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
    console.log(activeUserObj);


    // document.getElementById('welcome_user').textContent = `Welcome, ${activeUserObj.fullName}!`;
    document.getElementById('logout_butt').addEventListener('click', function(){
        localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
    });
    // get countryes
    async function fetchCountries() {
        try{
            const response = await fetch('https://date.nager.at/api/v3/AvailableCountries');

            if(!response.ok) throw new Error('Failed to fetch countries');

            const countriesData = await response.json();
            //აქ ჩემთვის ვამოწმებ მოაქვს თუ არა
            console.log('ქვეყნების მასივი:', countriesData);
        } catch (error) {
            console.error('Error fetching countries:', error);
        } 

    }
    fetchCountries();
}

