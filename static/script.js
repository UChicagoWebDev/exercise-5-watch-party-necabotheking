/* For index.html */

// TODO: If a user clicks to create a chat, create an auth key for them
// and save it. Redirect the user to /chat/<chat_id>
// function createChat() {

// }

/* For chat.html */

function postMessage(e) {
  const roomId = window.location.pathname.split('/').pop();
  const newMessage = document.getElementById("messageBox").value;

  fetch(`/api/rooms/${roomId}/messages`,
  {
    method: 'POST',
    headers: {
      'Content-type':'application/json',
      'api_key': WATCH_PARTY_API_KEY,
      'id': WATCH_PARTY_USER_ID
    },
    body:JSON.stringify({ newMessage } )
  }).then(response => response.json())
  .then(getMessages())
}


function getMessages() {
  let ChatDiv = document.getElementById("messages");
  ChatDiv.innerHTML = "";
  const roomId = window.location.pathname.split('/').pop();
  fetch(`/api/rooms/${roomId}/messages`)
    .then(response => response.json())
    .then(messages => {displayMessages(messages)}
    )}


function startMessagePolling() {
  setInterval(getMessages, 100)
}

// Displays the chat messages for an individual room
function displayMessages(messages) {
  let ChatDiv = document.getElementById("messages");
  ChatDiv.innerHTML = ""; 

  messages.forEach(single_message => {
    let messageElement = document.createElement("message");

    let authorElement = document.createElement("author");
    authorElement.textContent = single_message.name;

    let contentElement = document.createElement("content");
    contentElement.textContent = single_message.body;

    // Append author and content elements to the message element
    messageElement.appendChild(authorElement);
    messageElement.appendChild(contentElement);

    // Append the message element to the chat container
    ChatDiv.appendChild(messageElement);
  });
}

// Allows the user to edit a room name on click
function allowUserEdit(e) {
  document.querySelector('.edit').classList.remove('hide');
  document.querySelector('.display').classList.add('hide');
}

// Updates the room name
function updateRoomName(e) {
  const roomId = window.location.pathname.split('/').pop();
  const newName = document.getElementById('roomNameInput').value;

  fetch(`/api/rooms/${roomId}`, {
    method: 'POST',
    headers: {
      'Content-type':'application/json',
      'api_key': WATCH_PARTY_API_KEY,
      'id': WATCH_PARTY_USER_ID
    },
    body: JSON.stringify({ newName })
  })
  .then(response => response.json())
  // Updates the new name
  document.querySelector('.roomName').textContent = newName;
      
    // Remove Edit Form
    document.querySelector('.edit').classList.add('hide');
    document.querySelector('.display').classList.remove('hide');
}

// Updates the user's password
function updatePassword(e) {
  const newPassword = document.getElementById('passwordInput').value;
  console.log(newPassword)

  fetch('/api/profile/pass',{
    method: 'POST',
    headers: {
      'Content-type':'application/json',
      'api_key': WATCH_PARTY_API_KEY,
      'id': WATCH_PARTY_USER_ID
    },
    body: JSON.stringify({ newPassword })
  }).then(response => response.json())
}

// Updates the user's username
function updateUserName(e) {
  const newUserName = document.getElementById('usernameInput').value;

  fetch('/api/profile/name',{
    method: 'POST',
    headers: {
      'Content-type':'application/json',
      'api_key': WATCH_PARTY_API_KEY,
      'id': WATCH_PARTY_USER_ID
    },
    body: JSON.stringify({ newUserName })
  }).then(response => response.json())
}

function updateRoomName() {
  return;
}
