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

// Initialize with a 1x1 grid
addRow();
