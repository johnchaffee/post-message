window.onload = function () {

	// --- SENDING MESSAGEES ---

	// Get references to the iframe windows
	var sidebar = document.getElementById('sidebar').contentWindow;
	var dialog = document.getElementById("dialog");
	var modal = document.getElementById('modal').contentWindow;
	var popup

	// Get a reference to the buttons
	var conv1Btn = document.getElementById('conv1');
	var conv2Btn = document.getElementById('conv2');
	var conv3Btn = document.getElementById('conv3');
	var modalBtn = document.getElementById('modalBtn');
	var popupBtn = document.getElementById('popupBtn');

	// Post message to Sidebar
	function postToSidebar(e) {
		e.preventDefault();
		console.log("this: " + this);
		console.log("this.id: " + this.id);
		console.log("e: " + JSON.stringify(e, null, 2));
		// TODO Replace "*" with targetWindow (e.g. "https://example.com")
		sidebar.postMessage('Message from Parent to Sidebar: ' + this.id, "*");
	}

	// Post message to Modal
	// TODO Warning: showModal is not supported on mobile
	// Replace this with something like bootsrap modal
	function postToModal(e) {
		e.preventDefault();
		console.log("e: " + JSON.stringify(e, null, 2));
		dialog.showModal();
		// TODO Replace "*" with targetWindow (e.g. "https://example.com")
		modal.postMessage('Message from Parent to Modal', "*");
	}

	// Post message to Popup
	function postToPopup(e) {
		e.preventDefault();
		console.log("e: " + JSON.stringify(e, null, 2));
		popup = window.open('popup.html', 'popup', 'width=300px,height=400px,top=200,left=600');
		popup.focus();

		// Post message after 300 milisecond timeout
		// There needs to be a slight delay to allow time for the popup window to open
		setTimeout(function () {
			// TODO Replace "*" with targetWindow (e.g. "https://example.com")
			popup.postMessage('Message from Parent to Popup', "*");
		}, 300);
	}

	// Add an event listener to execute function when button is clicked
	conv1Btn.addEventListener('click', postToSidebar);
	conv2Btn.addEventListener('click', postToSidebar);
	conv3Btn.addEventListener('click', postToSidebar);
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
		// if (e.origin !== "http://localhost") {
		// 	return;
		// } else {
		// 	// Update the div element to display the message.
		// 	messageEle.innerHTML += e.data + "\n";
		// }

		messageEle.innerHTML += e.data + "\n";

		// If message was sent from modal, close the modal dialog
		// There must be a better way to detect the message was received from modal
		// without doing a regex search but I'll figure it out later
		if (e.data.search(/modal/i)) {
			dialog.close();
		}
	}

	// Setup an event listener that calls receiveMessage() when the window receives a new MessageEvent.
	window.addEventListener('message', receiveMessage);

}