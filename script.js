let grid = document.getElementById("grid");
let colorPicker = document.getElementById("colorPicker");
let gridSizeDisplay = document.getElementById("gridSize");
let isMouseDown = false;

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
    grid.deleteRow(grid.rows.length - 1);
    updateGridSize();
  }
}

function removeColumn() {
  for (let i = 0; i < grid.rows.length; i++) {
    if (grid.rows[i].cells.length > 0) {
      grid.rows[i].deleteCell(grid.rows[i].cells.length - 1);
    }
  }
  updateGridSize();
}

function colorCell() {
  this.style.backgroundColor = colorPicker.value;
}

function dragColor() {
  if (isMouseDown) {
    this.style.backgroundColor = colorPicker.value;
  }
}

function fillUncolored() {
  let cells = grid.getElementsByTagName("td");
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].style.backgroundColor === "") {
      cells[i].style.backgroundColor = colorPicker.value;
    }
  }
}

function fillAll() {
  let cells = grid.getElementsByTagName("td");
  for (let i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = colorPicker.value;
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
