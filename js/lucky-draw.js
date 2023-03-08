// Google Sheets API endpoint and spreadsheet ID
const endpoint = "https://sheets.googleapis.com/v4/spreadsheets";
const spreadsheetId = "1G_pVMtefWo9suQ_Wd6hZDwNyMj7HDfrk8b_o3Fmf01g";

// Get references to HTML elements
const container = document.getElementById("lucky-draw-container");
const text = document.getElementById("luckydrawtitle");
const button = document.getElementById("lucky-draw-button");

// Function to randomly select a name from the list
function selectName(names) {
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}

// Function to display the selected name and stop the animation
function displayWinner(winner) {
  container.textContent = winner;
  const container = document.querySelector('.fireworks')
  const fireworks = new Fireworks.default(container)
  fireworks.start()
  clearInterval(intervalId);
  alert(`Congratulations, ${winner}!`);
}

// Add event listener to the button
button.addEventListener("click", function() {
  // Get the list of names from the Google Sheets API
  fetch(`${endpoint}/${spreadsheetId}/values/Sheet1!A:A?key=AIzaSyBSrtdDcns09WVCQDc08ifOHryZPSpcX5k`)
    .then(response => response.json())
    .then(data => {
      const names = data.values.flat().slice(1); // Remove the header row and flatten the array
      let remainingNames = names.slice(); // Make a copy of the original list
      let intervalMs = 100; // Initial animation speed (in milliseconds)
      let counter = 50;
      button.style = "display: none;"
      let intervalId = setInterval(function() {
        if (remainingNames.length > 1 && counter != 0) {
          // Select a name and remove it from the list of remaining names
          const indexToRemove = Math.floor(Math.random() * remainingNames.length);
          const removedName = remainingNames.splice(indexToRemove, 1)[0];
          container.textContent = removedName;
          text.textContent = counter;
          counter -= 1;
        } else {
          // Only one name left, display it and stop the animation
          text.textContent = "Congratulations";
          
          displayWinner(remainingNames[indexToRemove]);
        }
      }, intervalMs);
    })
    .catch(error => {
      console.error(error);
      alert("Error getting names from Google Sheets.");
    });
});