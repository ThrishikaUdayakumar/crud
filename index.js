const myform = document.getElementById('my-form');
const nameInput = document.getElementById('fname');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const userList = document.getElementById('userList');

myform.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value
    };

    axios.post("https://crudcrud.com/api/9b699f262f0b4720bba9642ccb22012e/Data", data)
        .then((response) => {
            console.log('Data sent successfully:', response.data);
            nameInput.value = '';
            emailInput.value = '';
            phoneInput.value = '';
            getrequest();
        })
        .catch((error) => {
            console.error('Error sending data:', error);
        });
});

function getrequest() {
    axios.get("https://crudcrud.com/api/9b699f262f0b4720bba9642ccb22012e/Data")
        .then((response) => {
            const users = response.data;
            userList.innerHTML = '';

            users.forEach((user) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>
                        <button class="edit-button" data-id="${user._id}">Edit</button>
                        <button class="delete-button" data-id="${user._id}">Delete</button>
                    </td>
                `;

                const editButton = row.querySelector('.edit-button');
                editButton.addEventListener('click', () => handleEdit(user._id));

                const deleteButton = row.querySelector('.delete-button');
                deleteButton.addEventListener('click', () => handleDelete(user._id));

                userList.appendChild(row);
            });
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

function handleEdit(userId) {
    console.log(userId);
}

function handleDelete(userId) {
    axios.delete(`https://crudcrud.com/api/9b699f262f0b4720bba9642ccb22012e/Data/${userId}`)
        .then(() => {
            console.log('User deleted successfully');
            getrequest();
        })
        .catch((error) => {
            console.error('Error deleting user:', error);
        });
}

getrequest();