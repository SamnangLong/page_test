// Global variable for timeout
let lastClickedButton = null; // Track the last clicked button
let hideOverlayTimeout;
var connection_status = false;
var client;

setTimeout(function() {
    ConnectToMQTT();
}, 1000);

function ConnectToMQTT() {
    const randomClientNumber = Math.floor(Math.random() * 1000) + 1;
    const clientID = 'Device_Id' + randomClientNumber; // Generate unique user name
    const host = 'blithesome-chiropractor.cloudmqtt.com';
    const port = 443;

    client = new Paho.MQTT.Client(host, Number(port), clientID);
    
    // Set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // Connect the client
    client.connect({
        onSuccess: onConnect,
        useSSL: true,
        userName: 'rwufzabs',
        password: 'kVZNw5Tuj6e5',
        mqttVersion: 4
    });
}

// Function to subscribe to both topics and handle messages
function onConnect() {
    console.log("onConnect:");
    connection_status = true;

    // Subscribe to the touch and info topics
    const topic_Touch = 'touch';
    client.subscribe(topic_Touch); 

    console.log("Subscribed to topics: touch");
    
    // Subscribe to the touch and info topics
    const topic_Confirm = 'confirm';
    client.subscribe(topic_Confirm);
}



// Called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost: " + responseObject.errorMessage);
        alert("MQTT Connection Lost");
    }
}




// -----------------------------------------------------------------------
// --- Function to show the loading overlay
// -----------------------------------------------------------------------
// Function to show the loading overlay
function showLoadingOverlay(buttonClass) {
    lastClickedButton = buttonClass; // Track the button that was clicked
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'flex'; // Show the overlay
    startOverlayTimer(); // Start the timer for hiding the overlay
}

// Function to hide the loading overlay and reset the clicked button
function hideLoadingOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none'; // Hide the overlay
    console.log('Overlay hidden'); // Debugging log

    if (connection_status) {
        // Update the button state (reset it to 0 for the clicked button)
        if (lastClickedButton === '.soap') {
            buttonStates.B1 = 0; // Reset the button state
        } else if (lastClickedButton === '.fabric') {
            buttonStates.B2 = 0; // Reset the button state
        } else if (lastClickedButton === '.washing_9kg_1') {
            buttonStates.B3 = 0; // Reset the button state
        } else if (lastClickedButton === '.washing_9kg_2') {
            buttonStates.B4 = 0; // Reset the button state
        } else if (lastClickedButton === '.washing_9kg_3') {
            buttonStates.B5 = 0; // Reset the button state
        } else if (lastClickedButton === '.washing_12kg_1') {
            buttonStates.B6 = 0; // Reset the button state
        } else if (lastClickedButton === '.washing_12kg_2') {
            buttonStates.B7 = 0; // Reset the button state
        } else if (lastClickedButton === '.dryer_1') {
            buttonStates.B8 = 0; // Reset the button state
        } else if (lastClickedButton === '.dryer_2') {
            buttonStates.B9 = 0; // Reset the button state
        } else if (lastClickedButton === '.ironing_1') {
            buttonStates.B10 = 0; // Reset the button state
        } else if (lastClickedButton === '.ironing_2') {
            buttonStates.B11 = 0; // Reset the button state
        }

        saveButtonState(); // Save state to localStorage
        publishTouch(true); // Publish to MQTT with retain flag
    }
}

// Function to start the 30-second timeout for hiding the overlay
function startOverlayTimer() {
    clearTimeout(hideOverlayTimeout); // Clear any existing timeout
    hideOverlayTimeout = setTimeout(hideLoadingOverlay, 40000); // Set a 30-second timeout to hide the overlay
    console.log('30-second timer started'); // Debugging log
}

// Function to cancel the overlay timeout if a message arrives
function cancelOverlayTimer() {
    clearTimeout(hideOverlayTimeout); // Stop the 30-second timeout
    console.log('Overlay timer canceled'); // Debugging log
}




// Called when a message arrives
function onMessageArrived(message) {
    console.log("onMessageArrived: " + message.payloadString);

    // Example message: "B1=1, Device_Id222" or "B2=1, Device_Id222"
    const [button_info, device_id] = message.payloadString.split(','); // Split the payload by comma
    const device_name = device_id ? device_id.split('=')[1] : ''; // Extract the device name (ID) part

    // Parse the button state (e.g., "B2=1")
    const [button, state] = button_info.trim().split('='); // Split the button part by '='

    // Create an object to store the button state
    let buttonMap = {};
    buttonMap[button] = parseInt(state); // Store the button value (convert to integer)

    console.log(buttonMap); // Example output: { B2: 1 }
    console.log("Device ID: " + device_name); // Example output: "Device ID: 53"






    // ------------------------------------------------ 
    // --- TOPIC "TOUCH" 
    // ------------------------------------------------ 
    if (message.destinationName === 'touch') {
        // Check for each button's state and visually update the UI
        //----- BUTTON SOAP ----- //
        if (buttonMap['B1'] === 1) {
             // Visually disable the button
             document.querySelector('.soap').style.backgroundColor = 'gray';
             document.querySelector('#de_soap1').innerHTML = 'ម៉ាស៊ីនរវល់';
             const soapImg = document.querySelector('#soap');
             
             // Simulate disabling the image
             soapImg.style.opacity = '0.5'; 
             soapImg.style.pointerEvents = 'none'; 
        } else if(buttonMap['B1'] === 0) {
            // Visually disable the button
            document.querySelector('.soap').style.backgroundColor = '';
            const soapImg = document.querySelector('#soap');
            
            // Simulate disabling the image
            soapImg.style.opacity = ''; 
            soapImg.style.pointerEvents = ''; 
        }

        //----- BUTTON FABRIC ----- //
        if (buttonMap['B2'] === 1) {
            // Visually disable the button
            document.querySelector('.fabric').style.backgroundColor = 'gray';
            document.querySelector('#de_fabric1').innerHTML = 'ម៉ាស៊ីនរវល់';
            const fabricImg = document.querySelector('#fabric');
            
            // Simulate disabling the image
            fabricImg.style.opacity = '0.5'; 
            fabricImg.style.pointerEvents = 'none'; 
        } else if(buttonMap['B2'] === 0) {
            // Visually disable the button
            document.querySelector('.fabric').style.backgroundColor = '';
            const fabricImg = document.querySelector('#fabric');
            
            // Simulate disabling the image
            fabricImg.style.opacity = ''; 
            fabricImg.style.pointerEvents = ''; 
        }

        //----- BUTTON WASHING 9KG 1 ----- //
        if (buttonMap['B3'] === 1) {
            // Visually disable the button
            document.querySelector('.washing_9kg_1').style.backgroundColor = 'gray';
            document.querySelector('#de_wash9kg1').innerHTML = 'ម៉ាស៊ីនរវល់';
            const washing_9kg_1Img = document.querySelector('#washing_9kg_1');
            
            // Simulate disabling the image
            washing_9kg_1Img.style.opacity = '0.5'; 
            washing_9kg_1Img.style.pointerEvents = 'none';   
        } else if(buttonMap['B3'] === 0) {
            // Visually disable the button
            document.querySelector('.washing_9kg_1').style.backgroundColor = '';
            const washing_9kg_1Img = document.querySelector('#washing_9kg_1');
            
            // Simulate disabling the image
            washing_9kg_1Img.style.opacity = ''; 
            washing_9kg_1Img.style.pointerEvents = ''; 
        }

        //----- BUTTON WASHING 9KG 2 ----- //
        if (buttonMap['B4'] === 1) {
            // Visually disable the button
            document.querySelector('.washing_9kg_2').style.backgroundColor = 'gray';
            document.querySelector('#de_wash9kg2').innerHTML = 'ម៉ាស៊ីនរវល់';
            const washing_9kg_2Img = document.querySelector('#washing_9kg_2');
            
            // Simulate disabling the image
            washing_9kg_2Img.style.opacity = '0.5'; 
            washing_9kg_2Img.style.pointerEvents = 'none';  
        } else if(buttonMap['B4'] === 0) {
            // Visually disable the button
            document.querySelector('.washing_9kg_2').style.backgroundColor = '';
            const washing_9kg_2Img = document.querySelector('#washing_9kg_2');
            
            // Simulate disabling the image
            washing_9kg_2Img.style.opacity = ''; 
            washing_9kg_2Img.style.pointerEvents = '';    
        }

        //----- BUTTON WASHING 9KG 3 ----- //
        if (buttonMap['B5'] === 1) {
            // Visually disable the button
            document.querySelector('.washing_9kg_3').style.backgroundColor = 'gray';
            document.querySelector('#de_wash9kg3').innerHTML = 'ម៉ាស៊ីនរវល់';
            const washing_9kg_3Img = document.querySelector('#washing_9kg_3');
            
            // Simulate disabling the image
            washing_9kg_3Img.style.opacity = '0.5'; 
            washing_9kg_3Img.style.pointerEvents = 'none'; 
        } else if(buttonMap['B5'] === 0) {
            // Visually disable the button
            document.querySelector('.washing_9kg_3').style.backgroundColor = '';
            const washing_9kg_3Img = document.querySelector('#washing_9kg_3');
            
            // Simulate disabling the image
            washing_9kg_3Img.style.opacity = ''; 
            washing_9kg_3Img.style.pointerEvents = ''; 
        }

        //----- BUTTON WASHING 12KG 1 ----- //
        if (buttonMap['B6'] === 1) {
            // Visually disable the button
            document.querySelector('.washing_12kg_1').style.backgroundColor = 'gray';
            document.querySelector('#de_wash12kg1').innerHTML = 'ម៉ាស៊ីនរវល់';
            const washing_12kg_1Img = document.querySelector('#washing_12kg_1');
            
            // Simulate disabling the image
            washing_12kg_1Img.style.opacity = '0.5'; 
            washing_12kg_1Img.style.pointerEvents = 'none'; 
        } else if(buttonMap['B6'] === 0) {
            // Visually disable the button
            document.querySelector('.washing_12kg_1').style.backgroundColor = '';
            const washing_12kg_1Img = document.querySelector('#washing_12kg_1');
            
            // Simulate disabling the image
            washing_12kg_1Img.style.opacity = ''; 
            washing_12kg_1Img.style.pointerEvents = ''; 
        }

        //----- BUTTON WASHING 12KG 2 ----- //
        if (buttonMap['B7'] === 1) {
            // Visually disable the button
            document.querySelector('.washing_12kg_2').style.backgroundColor = 'gray';
            document.querySelector('#de_wash12kg2').innerHTML = 'ម៉ាស៊ីនរវល់';
            const washing_12kg_2Img = document.querySelector('#washing_12kg_2');
            
            // Simulate disabling the image
            washing_12kg_2Img.style.opacity = '0.5'; 
            washing_12kg_2Img.style.pointerEvents = 'none';  
        } else if(buttonMap['B7'] === 0) {
            // Visually disable the button
            document.querySelector('.washing_12kg_2').style.backgroundColor = '';
            const washing_12kg_2Img = document.querySelector('#washing_12kg_2');
            
            // Simulate disabling the image
            washing_12kg_2Img.style.opacity = ''; 
            washing_12kg_2Img.style.pointerEvents = '';  
        }

        //----- BUTTON DRYER 1 ----- //
        if (buttonMap['B8'] === 1) {
            // Visually disable the button
            document.querySelector('.dryer_1').style.backgroundColor = 'gray';
            document.querySelector('#de_dryer1').innerHTML = 'ម៉ាស៊ីនរវល់';
            const dryer_1Img = document.querySelector('#dryer_1');
            
            // Simulate disabling the image
            dryer_1Img.style.opacity = '0.5'; 
            dryer_1Img.style.pointerEvents = 'none';     
        } else if(buttonMap['B8'] === 0) {
            // Visually disable the button
            document.querySelector('.dryer_1').style.backgroundColor = '';
            const dryer_1Img = document.querySelector('#dryer_1');
            
            // Simulate disabling the image
            dryer_1Img.style.opacity = ''; 
            dryer_1Img.style.pointerEvents = '';  
        }

        //----- BUTTON DRYER 2 ----- //
        if (buttonMap['B9'] === 1) {
            // Visually disable the button
            document.querySelector('.dryer_2').style.backgroundColor = 'gray';
            document.querySelector('#de_dryer2').innerHTML = 'ម៉ាស៊ីនរវល់';
            const dryer_2Img = document.querySelector('#dryer_2');
            
            // Simulate disabling the image
            dryer_2Img.style.opacity = '0.5'; 
            dryer_2Img.style.pointerEvents = 'none';  
        } else if(buttonMap['B9'] === 0) {
            // Visually disable the button
            document.querySelector('.dryer_2').style.backgroundColor = '';
            const dryer_2Img = document.querySelector('#dryer_2');
            
            // Simulate disabling the image
            dryer_2Img.style.opacity = ''; 
            dryer_2Img.style.pointerEvents = ''; 
        }

        //----- BUTTON IRONNING 1 ----- //
        if (buttonMap['B10'] === 1) {
            // Visually disable the button
            document.querySelector('.ironing_1').style.backgroundColor = 'gray';
            document.querySelector('#de_ironing1').innerHTML = 'ម៉ាស៊ីនរវល់';
            const ironing_1Img = document.querySelector('#ironing_1');
            
            // Simulate disabling the image
            ironing_1Img.style.opacity = '0.5'; 
            ironing_1Img.style.pointerEvents = 'none'; 
        } else if(buttonMap['B10'] === 0) {
            // Visually disable the button
            document.querySelector('.ironing_1').style.backgroundColor = '';
            const ironing_1Img = document.querySelector('#ironing_1');
            
            // Simulate disabling the image
            ironing_1Img.style.opacity = ''; 
            ironing_1Img.style.pointerEvents = ''; 
        }

        //----- BUTTON IRONNING  ----- //
        if (buttonMap['B11'] === 1) {
            // Visually disable the button
            document.querySelector('.ironing_2').style.backgroundColor = 'gray';
            document.querySelector('#de_ironing2').innerHTML = 'ម៉ាស៊ីនរវល់';
            const ironing_2Img = document.querySelector('#ironing_2');
            
            // Simulate disabling the image
            ironing_2Img.style.opacity = '0.5'; 
            ironing_2Img.style.pointerEvents = 'none';   
        } else if(buttonMap['B11'] === 0) {
            // Visually disable the button
            document.querySelector('.ironing_2').style.backgroundColor = '';
            const ironing_2Img = document.querySelector('#ironing_2');
            
            // Simulate disabling the image
            ironing_2Img.style.opacity = ''; 
            ironing_2Img.style.pointerEvents = '';  
        }
    }   
    
    
    
    // ------------------------------------------------ 
    // --- TOPIC "CONFIRM" 
    // ------------------------------------------------ 
    else if (message.destinationName === 'confirm') {

        // Cancel the hide overlay timeout
        cancelOverlayTimer(); 


        //----- BUTTON SOAP ----- //
        if (buttonMap['B1'] === 1  && device_name === client.clientId) {
            // Visually disable the button
        //    document.querySelector('.soap').style.backgroundColor = 'green';
           document.querySelector('#de_soap1').innerHTML = 'ម៉ាស៊ីនរវល់'; // Machine is busy (in Khmer)
           document.querySelector('#de_soap1').style.color = 'white';

           const soapImg = document.querySelector('#soap');
           // Simulate disabling the image
           soapImg.style.opacity = '0.5'; 
           soapImg.style.pointerEvents = 'none'; 

           // Redirect to the specified link
           window.location.href = 'https://link.payway.com.kh/ABAPAYCT301883W';
        }   
        
        
        
        else if (buttonMap['B2'] === 1  && device_name === client.clientId) {
            // Visually disable the button
        //    document.querySelector('.fabric').style.backgroundColor = 'green';
           document.querySelector('#de_fabric1').innerHTML = 'ម៉ាស៊ីនរវល់'; // Machine is busy (in Khmer)
           document.querySelector('#de_fabric1').style.color = 'white';

           const fabricImg = document.querySelector('#fabric');
           // Simulate disabling the image
           fabricImg.style.opacity = '0.5'; 
           fabricImg.style.pointerEvents = 'none'; 

           // Redirect to the specified link
           window.location.href = 'https://link.payway.com.kh/ABAPAYCT301883W';
        }
        
        
        else if (buttonMap['B3'] === 1  && device_name === client.clientId) {
            // Visually disable the button
        //    document.querySelector('.washing_9kg_1').style.backgroundColor = 'green';
           document.querySelector('#de_wash9kg1').innerHTML = 'ម៉ាស៊ីនរវល់'; // Machine is busy (in Khmer)
           document.querySelector('#de_wash9kg1').style.color = 'white';

           const washing_9kg_1Img = document.querySelector('#washing_9kg_1');
           // Simulate disabling the image
           washing_9kg_1Img.style.opacity = '0.5'; 
           washing_9kg_1Img.style.pointerEvents = 'none'; 

           // Redirect to the specified link
           window.location.href = 'https://link.payway.com.kh/ABAPAYCT301883W';
        }
        

        else if (buttonMap['B4'] === 1  && device_name === client.clientId) {
            // Visually disable the button
        //    document.querySelector('.washing_9kg_2').style.backgroundColor = 'green';
           document.querySelector('#de_wash9kg2').innerHTML = 'ម៉ាស៊ីនរវល់'; // Machine is busy (in Khmer)
           document.querySelector('#de_wash9kg2').style.color = 'white';

           const washing_9kg_2Img = document.querySelector('#washing_9kg_2');
           // Simulate disabling the image
           washing_9kg_2Img.style.opacity = '0.5'; 
           washing_9kg_2Img.style.pointerEvents = 'none'; 

           // Redirect to the specified link
           window.location.href = 'https://link.payway.com.kh/ABAPAYCT301883W';
        }
        
        
        else if (buttonMap['B5'] === 1  && device_name === client.clientId) {
            // Visually disable the button
        //    document.querySelector('.washing_9kg_3').style.backgroundColor = 'green';
           document.querySelector('#de_wash9kg3').innerHTML = 'ម៉ាស៊ីនរវល់'; // Machine is busy (in Khmer)
           document.querySelector('#de_wash9kg3').style.color = 'white';

           const washing_9kg_3Img = document.querySelector('#washing_9kg_3');
           // Simulate disabling the image
           washing_9kg_3Img.style.opacity = '0.5'; 
           washing_9kg_3Img.style.pointerEvents = 'none'; 

           // Redirect to the specified link
           window.location.href = 'https://link.payway.com.kh/ABAPAYCT301883W';
        }
        
        
        else if (buttonMap['B6'] === 1  && device_name === client.clientId) {
            // Visually disable the button
        //    document.querySelector('.washing_12kg_1').style.backgroundColor = 'green';
           document.querySelector('#de_wash12kg1').innerHTML = 'ម៉ាស៊ីនរវល់'; // Machine is busy (in Khmer)
           document.querySelector('#de_wash12kg1').style.color = 'white';

           const washing_12kg_1Img = document.querySelector('#washing_12kg_1');
           // Simulate disabling the image
           washing_12kg_1Img.style.opacity = '0.5'; 
           washing_12kg_1Img.style.pointerEvents = 'none'; 

           // Redirect to the specified link
           window.location.href = 'https://link.payway.com.kh/ABAPAYCT301883W';
        }
        
        
        else if (buttonMap['B7'] === 1  && device_name === client.clientId) {
            // Visually disable the button
        //    document.querySelector('.washing_12kg_2').style.backgroundColor = 'green';
           document.querySelector('#de_wash12kg2').innerHTML = 'ម៉ាស៊ីនរវល់'; // Machine is busy (in Khmer)
           document.querySelector('#de_wash12kg2').style.color = 'white';

           const washing_12kg_2Img = document.querySelector('#washing_12kg_2');
           // Simulate disabling the image
           washing_12kg_2Img.style.opacity = '0.5'; 
           washing_12kg_2Img.style.pointerEvents = 'none'; 

           // Redirect to the specified link
           window.location.href = 'https://link.payway.com.kh/ABAPAYCT301883W';
        }
        
        
        else if (buttonMap['B8'] === 1  && device_name === client.clientId) {
            // Visually disable the button
        //    document.querySelector('.dryer_1').style.backgroundColor = 'green';
           document.querySelector('#de_dryer1').innerHTML = 'ម៉ាស៊ីនរវល់'; // Machine is busy (in Khmer)
           document.querySelector('#de_dryer1').style.color = 'white';

           const dryer_1Img = document.querySelector('#dryer_1');
           // Simulate disabling the image
           dryer_1Img.style.opacity = '0.5'; 
           dryer_1Img.style.pointerEvents = 'none'; 

           // Redirect to the specified link
           window.location.href = 'https://link.payway.com.kh/ABAPAYCT301883W';
        }
        
        
        else if (buttonMap['B9'] === 1  && device_name === client.clientId) {
            // Visually disable the button
        //    document.querySelector('.dryer_2').style.backgroundColor = 'green';
           document.querySelector('#de_dryer2').innerHTML = 'ម៉ាស៊ីនរវល់'; // Machine is busy (in Khmer)
           document.querySelector('#de_dryer2').style.color = 'white';

           const dryer_2Img = document.querySelector('#dryer_2');
           // Simulate disabling the image
           dryer_2Img.style.opacity = '0.5'; 
           dryer_2Img.style.pointerEvents = 'none'; 

           // Redirect to the specified link
           window.location.href = 'https://link.payway.com.kh/ABAPAYCT301883W';
        }


        else if (buttonMap['B10'] === 1  && device_name === client.clientId) {
            // Visually disable the button
        //    document.querySelector('.ironing_1').style.backgroundColor = 'green';
           document.querySelector('#de_ironing1').innerHTML = 'ម៉ាស៊ីនរវល់'; // Machine is busy (in Khmer)
           document.querySelector('#de_ironing1').style.color = 'white';

           const ironing_1Img = document.querySelector('#ironing_1');
           // Simulate disabling the image
           ironing_1Img.style.opacity = '0.5'; 
           ironing_1Img.style.pointerEvents = 'none'; 

           // Redirect to the specified link
           window.location.href = 'https://link.payway.com.kh/ABAPAYCT301883W';
        }
        
        
        else if (buttonMap['B11'] === 1  && device_name === client.clientId) {
            // Visually disable the button
        //    document.querySelector('.ironing_2').style.backgroundColor = 'green';
           document.querySelector('#de_ironing2').innerHTML = 'ម៉ាស៊ីនរវល់'; // Machine is busy (in Khmer)
           document.querySelector('#de_ironing2').style.color = 'white';

           const ironing_2Img = document.querySelector('#ironing_2');
           // Simulate disabling the image
           ironing_2Img.style.opacity = '0.5'; 
           ironing_2Img.style.pointerEvents = 'none'; 

           // Redirect to the specified link
           window.location.href = 'https://link.payway.com.kh/ABAPAYCT301883W';
        }



        

        
        
        

    }
}


















