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


    document.getElementById('welcome_user').textContent = `Welcome, ${activeUserObj.fullName}!`;
    document.getElementById('logout_butt').addEventListener('click', function(){
        localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
    });
    // get Clients
    async function fetchClients() {
        try{
            const response = await fetch('https://dummyjson.com/users?limit=20');

            if(!response.ok) throw new Error('Failed to fetch clients');

            const data = await response.json();
            
            //save user data
            const clients = data.users;
            console.log('კლიენტების მასივი:', clients);

            //fill table
            const tableBody = document.getElementById('clients_table_body');
            tableBody.innerHTML = '';

            clients.forEach(client => {
                // create new row for client new
                const row = document.createElement('tr');
                //Prepair the row
                row.innerHTML = `
        <td><img src="${client.image}" alt="${client.firstName}" width="40" height="40" style="border-radius: 50%;"></td>
        <td>${client.firstName} ${client.lastName}</td>
        <td>${client.email}</td>
        <td>${client.gender}</td>
        <td><button class="delete_btn" data-id="${client.id}" style="background-color: #d9534f; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Delete</button></td>
    `
    tableBody.appendChild(row);
            });
            //delete client with event delegation
            tableBody.addEventListener('click', function(event){
                //prove it's delete button
                if(event.target.classList.contains('delete_btn')){
                    //catch clientsId, which we want to remove
                    const clientId = event.target.getAttribute('data-id');
                    console.log(`Delete client with ID: ${clientId}`);

                    //find nearest row and delete 
                    const row = event.target.closest('tr');
                    if (row) {
                        row.remove();
                    }
                }
            })
            //add row to table
        } catch (error) {
            console.error('Error fetching clients:', error);
        } 

    }
    fetchClients();
}

