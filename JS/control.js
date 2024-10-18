// Initialize button states using localStorage to persist across refreshes
let buttonStates = {
    B1: localStorage.getItem('B1') === '1' ? 1 : 0,
    B2: localStorage.getItem('B2') === '1' ? 1 : 0,
    B3: localStorage.getItem('B3') === '1' ? 1 : 0,
    B4: localStorage.getItem('B4') === '1' ? 1 : 0,
    B5: localStorage.getItem('B5') === '1' ? 1 : 0,
    B6: localStorage.getItem('B6') === '1' ? 1 : 0,
    B7: localStorage.getItem('B7') === '1' ? 1 : 0,
    B8: localStorage.getItem('B8') === '1' ? 1 : 0,
    B9: localStorage.getItem('B9') === '1' ? 1 : 0,
    B10: localStorage.getItem('B10') === '1' ? 1 : 0,
    B11: localStorage.getItem('B11') === '1' ? 1 : 0
};

// Function to save button states to localStorage
function saveButtonState() {
    for (let key in buttonStates) {
        localStorage.setItem(key, buttonStates[key]);
    }
}

// Function to publish the message for 'touch' topic
function publishTouch(retain = false) {
    const message = `B1=${buttonStates.B1}, B2=${buttonStates.B2}, B3=${buttonStates.B3}, B4=${buttonStates.B4}, B5=${buttonStates.B5}, B6=${buttonStates.B6}, B7=${buttonStates.B7}, B8=${buttonStates.B8}, B9=${buttonStates.B9}, B10=${buttonStates.B10}, B11=${buttonStates.B11}`;
    
    // Replace 'client' with your actual MQTT client instance
    client.send('touch', message, 0, retain); // '0' is the QoS, 'retain' is the retain flag
    
    console.log("Published to topic 'touch':", message);
}

// Function to publish the message for 'info' topic
// Function to publish the message for 'info' topic
function publishInfo(buttonId) {
    const message = `${buttonId}=1,Device_Name=${client.clientId}`;
    
    // Replace 'client' with your actual MQTT client instance
    client.send('info', message); // Send message to 'info' topic
    
    console.log("Published to topic 'info':", message);
}

// Handle button click for soap button
function btn_soap() {
    if (connection_status) {

        // Show the overlay
        showLoadingOverlay('.soap');

        // Disable the button visually
        document.querySelector('.soap').style.backgroundColor = 'gray';
        const soapImg = document.querySelector('#soap');
        soapImg.style.opacity = '0.5'; 
        soapImg.style.pointerEvents = 'none'; // Disable further clicks

        // Update the button state
        buttonStates.B1 = 1; 
        saveButtonState(); // Save state to localStorage
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B1'); // Publish to 'info' topic        

    } else {
        alert("MQTT not connected");
    }
}

// Handle button click for fabric button
function btn_fabric() {
    if (connection_status) {

        // Show the overlay
        showLoadingOverlay('.fabric');

        // Disable the button visually
        document.querySelector('.fabric').style.backgroundColor = 'gray';
        const fabricImg = document.querySelector('#fabric');
        fabricImg.style.opacity = '0.5'; 
        fabricImg.style.pointerEvents = 'none'; // Disable further clicks

        // Update the button state
        buttonStates.B2 = 1; 
        saveButtonState(); // Save state to localStorage
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B2'); // Publish to 'info' topic        

    } else {
        alert("MQTT not connected");
    }
}

function btn_ws_9kg1() {
    if (connection_status) {

        // Show the overlay
        showLoadingOverlay('.washing_9kg_1');

        // Disable the button visually
        document.querySelector('.washing_9kg_1').style.backgroundColor = 'gray';
        const washing_9kg_1Img = document.querySelector('#washing_9kg_1');
        washing_9kg_1Img.style.opacity = '0.5'; 
        washing_9kg_1Img.style.pointerEvents = 'none'; // Disable further clicks

        // Update the button state
        buttonStates.B3 = 1; 
        saveButtonState(); // Save state to localStorage
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B3'); // Publish to 'info' topic        

    } else {
        alert("MQTT not connected");
    }
}

function btn_ws_9kg2() {
    if (connection_status) {

        // Show the overlay
        showLoadingOverlay('.washing_9kg_2');

        // Disable the button visually
        document.querySelector('.washing_9kg_2').style.backgroundColor = 'gray';
        const washing_9kg_2Img = document.querySelector('#washing_9kg_2');
        washing_9kg_2Img.style.opacity = '0.5'; 
        washing_9kg_2Img.style.pointerEvents = 'none'; // Disable further clicks

        // Update the button state
        buttonStates.B4 = 1; 
        saveButtonState(); // Save state to localStorage
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B4'); // Publish to 'info' topic        

    } else {
        alert("MQTT not connected");
    }
}

function btn_ws_9kg3() {
    if (connection_status) {

        // Show the overlay
        showLoadingOverlay('.washing_9kg_3');

        // Disable the button visually
        document.querySelector('.washing_9kg_3').style.backgroundColor = 'gray';
        const washing_9kg_3Img = document.querySelector('#washing_9kg_3');
        washing_9kg_3Img.style.opacity = '0.5'; 
        washing_9kg_3Img.style.pointerEvents = 'none'; // Disable further clicks

        // Update the button state
        buttonStates.B5 = 1; 
        saveButtonState(); // Save state to localStorage
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B5'); // Publish to 'info' topic        

    } else {
        alert("MQTT not connected");
    }
}

function btn_ws_12kg1() {
    if (connection_status) {

        // Show the overlay
        showLoadingOverlay('.washing_12kg_1');

        // Disable the button visually
        document.querySelector('.washing_12kg_1').style.backgroundColor = 'gray';
        const washing_12kg_1Img = document.querySelector('#washing_12kg_1');
        washing_12kg_1Img.style.opacity = '0.5'; 
        washing_12kg_1Img.style.pointerEvents = 'none'; // Disable further clicks

        // Update the button state
        buttonStates.B6 = 1; 
        saveButtonState(); // Save state to localStorage
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B6'); // Publish to 'info' topic        

    } else {
        alert("MQTT not connected");
    }
}


function btn_ws_12kg2() {
    if (connection_status) {

        // Show the overlay
        showLoadingOverlay('.washing_12kg_2');

        // Disable the button visually
        document.querySelector('.washing_12kg_2').style.backgroundColor = 'gray';
        const washing_12kg_2Img = document.querySelector('#washing_12kg_2');
        washing_12kg_2Img.style.opacity = '0.5'; 
        washing_12kg_2Img.style.pointerEvents = 'none'; // Disable further clicks

        // Update the button state
        buttonStates.B7 = 1; 
        saveButtonState(); // Save state to localStorage
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B7'); // Publish to 'info' topic        

    } else {
        alert("MQTT not connected");
    }
}

function btn_dryer1() {
    if (connection_status) {

        // Show the overlay
        showLoadingOverlay('.dryer_1');

        // Disable the button visually
        document.querySelector('.dryer_1').style.backgroundColor = 'gray';
        const dryer_1Img = document.querySelector('#dryer_1');
        dryer_1Img.style.opacity = '0.5'; 
        dryer_1Img.style.pointerEvents = 'none'; // Disable further clicks

        // Update the button state
        buttonStates.B8 = 1; 
        saveButtonState(); // Save state to localStorage
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B8'); // Publish to 'info' topic        

    } else {
        alert("MQTT not connected");
    }
}

function btn_dryer2() {
    if (connection_status) {

        // Show the overlay
        showLoadingOverlay('.dryer_2');

        // Disable the button visually
        document.querySelector('.dryer_2').style.backgroundColor = 'gray';
        const dryer_2Img = document.querySelector('#dryer_2');
        dryer_2Img.style.opacity = '0.5'; 
        dryer_2Img.style.pointerEvents = 'none'; // Disable further clicks

        // Update the button state
        buttonStates.B9 = 1; 
        saveButtonState(); // Save state to localStorage
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B9'); // Publish to 'info' topic        

    } else {
        alert("MQTT not connected");
    }
}


function btn_ironing1() {
    if (connection_status) {

        // Show the overlay
        showLoadingOverlay('.ironing_1');

        // Disable the button visually
        document.querySelector('.ironing_1').style.backgroundColor = 'gray';
        const ironing_1Img = document.querySelector('#ironing_1');
        ironing_1Img.style.opacity = '0.5'; 
        ironing_1Img.style.pointerEvents = 'none'; // Disable further clicks

        // Update the button state
        buttonStates.B10 = 1; 
        saveButtonState(); // Save state to localStorage
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B10'); // Publish to 'info' topic        

    } else {
        alert("MQTT not connected");
    }
}


function btn_ironing2() {
    if (connection_status) {

        // Show the overlay
        showLoadingOverlay('.ironing_2');

        // Disable the button visually
        document.querySelector('.ironing_2').style.backgroundColor = 'gray';
        const ironing_2Img = document.querySelector('#ironing_2');
        ironing_2Img.style.opacity = '0.5'; 
        ironing_2Img.style.pointerEvents = 'none'; // Disable further clicks

        // Update the button state
        buttonStates.B11 = 1; 
        saveButtonState(); // Save state to localStorage
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B11'); // Publish to 'info' topic        

    } else {
        alert("MQTT not connected");
    }
}

// Similar functions for other buttons can be added (e.g., btn_ws_9kg1, btn_ws_9kg2, etc.)

// Function to restore the state of buttons on page load
function restoreButtonState() {
    for (let key in buttonStates) {
        if (buttonStates[key] === 1) {
            const buttonClass = `.${key.toLowerCase()}`;
            const buttonImg = document.querySelector(`#${key.toLowerCase()}`);
            
            // Visually disable the button
            // document.querySelector(buttonClass).style.backgroundColor = 'gray';
            if (buttonImg) {
                buttonImg.style.opacity = '0.5'; // Reduce opacity to indicate it's disabled
                buttonImg.style.pointerEvents = 'none'; // Prevent further clicks
            }
        }
    }
}

// Call the restore function on page load to update button visuals
window.onload = function() {
    restoreButtonState();
};






function resetButton() {
    if (connection_status) {
        

        // Update the button state
        buttonStates.B1 = 0; 
        buttonStates.B2 = 0;
        buttonStates.B3 = 0;
        buttonStates.B4 = 0;
        buttonStates.B5 = 0;
        buttonStates.B6 = 0;
        buttonStates.B7 = 0;
        buttonStates.B8 = 0;
        buttonStates.B9 = 0;
        buttonStates.B10 = 0;
        buttonStates.B11 = 0;

        saveButtonState(); // Save state to localStorage
        publishTouch(true); // Publish to MQTT with retain flag
        publishInfo('B'); 
    } else {
        alert("HELLO");
    }
}

