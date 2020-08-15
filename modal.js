window.onload = function () {

	// --- SENDING MESSAGEES ---

	// Get a reference to the parent window
	var parentWindow = window.parent;

	// Get a reference to the buttons
	var parentBtn = document.getElementById('parentBtn');

	// Post message to Parent
	function postToParent(e) {
		e.preventDefault();
		console.log("e: " + JSON.stringify(e, null, 2));
		// TODO Replace "*" with targetWindow (e.g. "https://example.com")
		parentWindow.postMessage('Message from Modal to Parent', "*");
	}

	// Add an event listener to execute function when button is clicked
	parentBtn.addEventListener('click', postToParent);


	// --- RECEIVING MESSAGEES ---

	// Get a reference to the <div> on the page that will display the message text.
	var messageEle = document.getElementById('message');

	// A function to process messages received by the window.
	function receiveMessage(e) {

		console.log("e: " + JSON.stringify(e, null, 2));
		console.log("e.origin: " + JSON.stringify(e.origin, null, 2));
		console.log("e.data: " + JSON.stringify(e.data, null, 2));

		// // Check to make sure that this message came from the correct domain.
		// if (e.origin !== "http://localhost") {
		// 	return;
		// } else {
		// 	// Update the div element to display the message.
		// 	messageEle.innerHTML += e.data + "<br>";
		// }

		// TODO Uncomment section above and enter correct domain for approved sender 
		// then delete the line below 
		messageEle.innerHTML += e.data + "<br>";

	}

	// Setup an event listener that calls receiveMessage() when the window
	// receives a new MessageEvent.
	window.addEventListener('message', receiveMessage);
}
