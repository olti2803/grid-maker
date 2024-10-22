let grid = document.getElementById("grid");
let colorPicker = document.getElementById("colorPicker");
let colorDropdown = document.getElementById("colorDropdown");
let gridSizeDisplay = document.getElementById("gridSize");
let isMouseDown = false;

// Set default option for color dropdown
document.addEventListener("DOMContentLoaded", function () {
  let defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Not selected";
  defaultOption.selected = true;
  defaultOption.disabled = true;
  colorDropdown.prepend(defaultOption);
});

// Sync color picker and dropdown values
colorPicker.addEventListener("input", function () {
  colorDropdown.value = colorPicker.value;
});

colorDropdown.addEventListener("change", function () {
  colorPicker.value = colorDropdown.value;
});

function updateGridSize() {
  let rows = grid.rows.length;
  let cols = rows > 0 ? grid.rows[0].cells.length : 0;
  gridSizeDisplay.textContent = `${rows}x${cols}`;
}

function addRow() {
  let row = grid.insertRow(); // Inserting a new row into the grid
  let cellCount = grid.rows.length > 1 ? grid.rows[0].cells.length : 1; // Check if grid has rows, otherwise create 1 cell

  for (let i = 0; i < cellCount; i++) {
    let cell = row.insertCell(); // Inserting a new cell into the row
    cell.addEventListener("mousedown", colorCell);
    cell.addEventListener("mouseover", dragColor); // Event listeners for cell coloring
  }

  updateGridSize(); // Updating the grid size after adding a row
}

function addColumn() {
  for (let i = 0; i < grid.rows.length; i++) {
    let cell = grid.rows[i].insertCell(); // Inserting a new cell in each row
    cell.addEventListener("mousedown", colorCell); // Color the cell on mouse down
    cell.addEventListener("mouseover", dragColor); // Allow drag-to-color functionality
  }
  updateGridSize(); // Update the grid size display
}

function removeRow() {
  if (grid.rows.length > 0) {
    grid.deleteRow(grid.rows.length - 1); // Remove the last row from the grid
    updateGridSize(); // Update the grid size display after removal
  }
}

function removeColumn() {
  for (let i = 0; i < grid.rows.length; i++) {
    if (grid.rows[i].cells.length > 0) {
      grid.rows[i].deleteCell(grid.rows[i].cells.length - 1); // Remove the last cell in each row
    }
  }
  updateGridSize(); // Update grid size after removal
}

// Function to get the selected color from either the picker or the dropdown
function getSelectedColor() {
  return colorPicker.value;
}

function colorCell() {
  this.style.backgroundColor = getSelectedColor(); // Use selected color from picker or dropdown, simple code
}

function dragColor() {
  if (isMouseDown) {
    this.style.backgroundColor = getSelectedColor(); // Use selected color while dragging
    //drag color is on mousedown unlike color cell which activates from fill functions
  }
}

function fillUncolored() {
  const cells = grid.getElementsByTagName("td");
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].style.backgroundColor === "") {
      cells[i].style.backgroundColor = getSelectedColor();
      cells[i].dataset.lastColored = Date.now(); // Add a timestamp for when the cell was colored
    }
  }
}

function fillAll() {
  const cells = grid.getElementsByTagName("td");
  for (let i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = getSelectedColor();
    cells[i].dataset.lastColored = Date.now(); // Add a timestamp for when the cell was colored
  }
}

function clearAll() {
  let cells = grid.getElementsByTagName("td");
  for (let i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = "";
  }
}

// Initialize with a 1x1 grid
addRow();

// Add event listeners for drag-to-color functionality
grid.addEventListener("mousedown", () => (isMouseDown = true));
grid.addEventListener("mouseup", () => (isMouseDown = false));
grid.addEventListener("mouseleave", () => (isMouseDown = false));
