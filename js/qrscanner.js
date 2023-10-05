
async function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    const decryptedText = atob(decodedText);
    // Split the decoded string into an array of components
    var components = decryptedText.split(' ');

    // Extract the name, email, and drink choice
    const name = components.slice(0, components.length - 2).join(' ');
    const email = components[components.length - 2];
    const drinkChoice = components[components.length - 1];

    const nameElement = document.getElementById('name');
    const drinkChoiceElement = document.getElementById('drinkchoice');
    nameElement.innerHTML = name;
    drinkChoiceElement.innerHTML = decodedText;
    
    console.log(name);
    console.log(drinkChoice);


    
  }
  
 async function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }
  
  let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: {width: 250, height: 250} },
    /* verbose= */ false);
html5QrcodeScanner.render(onScanSuccess, onScanFailure);