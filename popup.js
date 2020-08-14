window.onload = function() {
	// Get a reference to the <div> on the page that will display the
	// message text.
    var messageEle = document.getElementById('message');
    console.log("messageEle: " + messageEle);

	// A function to process messages received by the window.
	function receiveMessage(e) {

		console.log("e: " + JSON.stringify(e, null, 2));
		console.log("e.origin: " + JSON.stringify(e.origin, null, 2));
		console.log("e.data: " + JSON.stringify(e.data, null, 2));

		// Check to make sure that this message came from the correct domain.
		if (e.origin !== "http://localhost") {
			return;
		} else {
            console.log("document.readyState: " + document.readyState);
            // Update the div element to display the message.
            switch (document.readyState) {
                case "loading":
                    // The document is still loading.
                    console.log("document.readyState === 'loading'");
                    break;
                case "interactive":
                    // The document has finished loading. We can now access the DOM elements.
                    // But sub-resources such as images, stylesheets and frames are still loading.
                    console.log("document.readyState === 'interactive'");
                    break;
                case "complete":
                    console.log("document.readyState === 'complete'");
                    // The page is fully loaded.
                    messageEle.innerHTML += "\nMessage Received: " + e.data;
                    break;
                }
		}
	}

	// Setup an event listener that calls receiveMessage() when the window
	// receives a new MessageEvent.
    console.log("addEventListener");
	window.addEventListener('message', receiveMessage);
}