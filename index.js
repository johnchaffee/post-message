window.onload = function () {

	// --- SENDING MESSAGEES ---

	// Get references to the iframe windows
	var sidebar = document.getElementById('sidebar').contentWindow;
	var modal = document.getElementById('modal').contentWindow;
	var popup = window.open('popup.html', 'popup', 'width=400px,height=500px,top=200,left=1720');
	var timeoutInterval = 0;

	// Get a reference to the buttons
	var sidebarBtn = document.getElementById('sidebarBtn');
	var modalBtn = document.getElementById('modalBtn');
	var popupBtn = document.getElementById('popupBtn');

	// Post message to Sidebar
	function postToSidebar(e) {
		e.preventDefault();
		console.log("e: " + JSON.stringify(e, null, 2));
		sidebar.postMessage('Message from Parent to Sidebar', 'http://localhost');
	}

	// Post message to Modal
	function postToModal(e) {
		e.preventDefault();
		console.log("e: " + JSON.stringify(e, null, 2));
		modal.postMessage('Message from Parent to Modal', 'http://localhost');
	}

	// Post message to Popup
	function postToPopup(e) {
		e.preventDefault();
		console.log("e: " + JSON.stringify(e, null, 2));
		if (popup) {
			// Popup exists. Display the message with no delay.
			console.log("popup === true");
		} else {
			// Popup does not exist. Open it and set a 200 milisecond delay before displaying message.
			console.log("popup === false");
			popup = window.open('popup.html', 'popup', 'width=400px,height=500px,top=200,left=1720');
			timeoutInterval = 200;
		}
		popup.focus();

		// Post message after timeoutInterval
		// There needs to be a slight delay if the popup window is new
		setTimeout(function () {
			popup.postMessage('Message from Parent to Popup', 'http://localhost');
		}, timeoutInterval);
	}

	// Add an event listener to execute function when button is clicked
	sidebarBtn.addEventListener('click', postToSidebar);
	modalBtn.addEventListener('click', postToModal);
	popupBtn.addEventListener('click', postToPopup);


	// --- RECEIVING MESSAGEES ---

	// Get a reference to the <div> on the page that will display the message text.
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
			messageEle.innerHTML += e.data + "\n";
		}

	}

	// Setup an event listener that calls receiveMessage() when the window receives a new MessageEvent.
	window.addEventListener('message', receiveMessage);

}