
async function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    const hash = atob(decodedText);
    const [name, email, drinkChoice] = decodedString.split('+').map(item => item.trim());

    const nameDisplay = document.getElementById('name');
    const drinkchoiceDisplay = document.getElementById('drinkchoice');

    nameDisplay.innerText = `Name: ${name}`;
    drinkChoiceDisplay.innerText = `Drink Choice: ${drinkChoice}`;

    
    html5QrcodeScanner.clear();
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