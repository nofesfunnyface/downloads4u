// Firebase configuration (replace with your own config)
const firebaseConfig = {
  apiKey: "AIzaSyCWncRAJyIvUYPjatkErWQk6uosOu87mVQ",
  authDomain: "nofesfunnyface.firebaseapp.com",
  databaseURL: "https://nofesfunnyface-default-rtdb.firebaseio.com",
  projectId: "nofesfunnyface",
  storageBucket: "nofesfunnyface.appspot.com",
  messagingSenderId: "969631855125",
  appId: "1:969631855125:web:5fca6e0b298fd4a6c9941c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase Realtime Database reference
const database = firebase.database();
const messagesRef = database.ref('messages');

// Helper function to create and append a new message element
function createMessageElement(username, message) {
  const messageElement = document.createElement('div');
  messageElement.className = 'message';
  messageElement.innerHTML = `<strong>${username}:</strong> ${message}`;
  return messageElement;
}

// Function to handle the "Enter!" button click event
function handleEnterClick() {
  const usernameInput = document.getElementById('username-input');
  const username = usernameInput.value.trim();

  // Check if the username is already taken
  if (username === '') {
    document.getElementById('status').textContent = 'Please enter a username.';
  } else if (document.querySelector(`.message strong:contains("${username}")`)) {
    document.getElementById('status').textContent = 'Username is already taken.';
  } else {
    document.getElementById('status').textContent = '';

    // Show the chat interface
    document.getElementById('username-container').style.display = 'none';
    document.getElementById('chat-container').style.display = 'block';

    // Listen for new messages
    messagesRef.on('child_added', (snapshot) => {
      const { username, message } = snapshot.val();
      const messageElement = createMessageElement(username, message);
      document.getElementById('chat-messages').appendChild(messageElement);
    });
  }

  usernameInput.value = '';
}

// Function to handle the "Send" button click event
function handleSendClick() {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();

  if (message !== '') {
    // Create a new message object
    const username = document.getElementById('username-input').value.trim();
    const newMessage = {
      username: username,
      message: message
    };

    // Save the new message to Firebase Realtime Database
    messagesRef.push(newMessage);

    // Clear the message input
    messageInput.value = '';
  }
}

// Add event listeners to the buttons
document.getElementById('enter-button').addEventListener('click', handleEnterClick);
document.getElementById('send-button').addEventListener('click', handleSendClick);
