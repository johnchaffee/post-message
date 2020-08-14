window.onload = function () {
	// Get references to the iframe windows
	var sidebar = document.getElementById('sidebar').contentWindow;
	var modal = document.getElementById('modal').contentWindow;
	// var popup;
	var popup = window.open('popup.html', 'foo', 'width=400px,height=500px,top=200,left=1720');
	var timeoutInterval = 0;

	// Get a reference to the buttons
	var sidebarBtn = document.getElementById('sendToIframe');
	var modalBtn = document.getElementById('sendToModal');
	var popupBtn = document.getElementById('sendToPopup');

	// Post message to Sidebar
	function updateSidebar(e) {
		e.preventDefault();
		console.log("e: " + JSON.stringify(e, null, 2));
		sidebar.postMessage('Message from Parent to Sidebar', 'http://localhost');
	}

	// Post message to Modal
	function openModal(e) {
		e.preventDefault();
		console.log("e: " + JSON.stringify(e, null, 2));
		modal.postMessage('Message from Parent to Modal', 'http://localhost');
	}

	// Post message to Popup
	function openPopup(e) {
		e.preventDefault();
		console.log("e: " + JSON.stringify(e, null, 2));
		if (popup) {
			// Popup already open. Display the message with no delay.
			console.log("popup === true");
		} else {
			// Popup not open. Open it and set a 200 milisecond delay before displaying message
			console.log("popup === false");
			popup = window.open('popup.html', 'foo', 'width=400px,height=500px,top=200,left=1720');
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
	sidebarBtn.addEventListener('click', updateSidebar);
	modalBtn.addEventListener('click', openModal);
	popupBtn.addEventListener('click', openPopup);
}