let grid = document.getElementById("grid");
let colorSelect = document.getElementById("colorSelect");

function addRow() {
  let row = grid.insertRow();
  for (let i = 0; i < grid.rows[0].cells.length || i < 1; i++) {
    let cell = row.insertCell();
    cell.onclick = function () {
      this.style.backgroundColor = colorSelect.value;
    };
  }
}

function addColumn() {
  for (let i = 0; i < grid.rows.length; i++) {
    let cell = grid.rows[i].insertCell();
    cell.onclick = function () {
      this.style.backgroundColor = colorSelect.value;
    };
  }
}

function removeRow() {
  if (grid.rows.length > 0) {
    grid.deleteRow(grid.rows.length - 1);
  }
}

function removeColumn() {
  for (let i = 0; i < grid.rows.length; i++) {
    if (grid.rows[i].cells.length > 0) {
      grid.rows[i].deleteCell(grid.rows[i].cells.length - 1);
    }
  }
}

function fillUncolored() {
  let cells = grid.getElementsByTagName("td");
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].style.backgroundColor === "") {
      cells[i].style.backgroundColor = colorSelect.value;
    }
  }
}

function fillAll() {
  let cells = grid.getElementsByTagName("td");
  for (let i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = colorSelect.value;
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
