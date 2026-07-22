//get active user text
const activeUserText = localStorage.getItem('currentUser');

//if user is not logged in
if(!activeUserText){
    alert("Please log in first!");
    window.location.href ='index.html';
} 


else {
    const activeUserObj = JSON.parse(activeUserText);
    console.log(activeUserObj);

    document.getElementById('welcome_user').textContent = `Welcome, ${activeUserObj.fullName}!`;
    
    document.getElementById('logout_butt').addEventListener('click', function(){
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });

    // Create global variables that will be visible for filtering
    let allClients = []; 
    const tableBody = document.getElementById('clients_table_body');

    // drow function
    function renderClients(clientsList) {
        tableBody.innerHTML = '';

        clientsList.forEach(client => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${client.image}" alt="${client.firstName}" width="40" height="40" style="border-radius: 50%;"></td>
                <td>${client.firstName} ${client.lastName}</td>
                <td>${client.email}</td>
                <td>${client.gender}</td>
                <td><button class="delete_btn" data-id="${client.id}" style="background-color: #d9534f; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Delete</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    function filterClients(){
        const searchText = document.getElementById('search_input').value.toLowerCase();
        const selectedGender = document.getElementById('gender_filter').value;
        const filteredClients = allClients.filter(client => {

        const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
        const matchesSearch = fullName.includes(searchText);
        
        const matchesGender = selectedGender ==='all' || client.gender === selectedGender;

        return matchesSearch && matchesGender;
        });
        renderClients(filteredClients);
    }


    document.getElementById('search_input').addEventListener('input', filterClients);
    document.getElementById('gender_filter').addEventListener('change', filterClients)
    // 
    async function fetchClients() {
        try {
            const response = await fetch('https://dummyjson.com/users?limit=20');
            if(!response.ok) throw new Error('Failed to fetch clients');

            const data = await response.json();
            
            // save data in global masive
            allClients = data.users;
            console.log('კლიენტების მასივი:', allClients);

            // draw a table
            renderClients(allClients);

        } catch (error) {
            console.error('Error fetching clients:', error);
        } 
    }

    // delete client
    tableBody.addEventListener('click', function(event){
        if(event.target.classList.contains('delete_btn')){
            const clientId = event.target.getAttribute('data-id');
            console.log(`Delete client with ID: ${clientId}`);

            const row = event.target.closest('tr');
            if (row) {
                row.remove();
                

                allClients = allClients.filter(c => c.id != clientId);
            }
        }
    });

    //run function
    fetchClients();
};