window.onload = function() {
	// Get a reference to the <div> on the page that will display the
	// message text.
	var messageEle = document.getElementById('message');

	// A function to process messages received by the window.
	function receiveMessage(e) {

		console.log("e: " + JSON.stringify(e, null, 2));
		console.log("e.origin: " + JSON.stringify(e.origin, null, 2));
		console.log("e.data: " + JSON.stringify(e.data, null, 2));

		// Check to make sure that this message came from the correct domain.
		if (e.origin !== "http://localhost") {
			return;
		} else {
			// Update the div element to display the message.
			messageEle.innerHTML += "\nMessage Received: " + e.data;
		}

	}

	// Setup an event listener that calls receiveMessage() when the window
	// receives a new MessageEvent.
	window.addEventListener('message', receiveMessage);
}
