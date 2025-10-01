window.onload = function () {
  console.log('Loaded')
}

const branch = {
  "Civil": 0, "Computer": 1, "Electrical": 2, "ECE": 3, "FAA": 4, "FD": 5,
  "FT": 6, "IC": 7, "Mechanical": 8, "Med Eltx": 9, "TD": 10, "TP": 11, "TT": 12,
}
function read_data(data, trgt) {
  init();
  console.log(branch[trgt])
  document.getElementById("output").innerText = data[branch[trgt]];
}
function init() {
  document.getElementById("output").innerText = "";
}
function read_file(input) {
  const dropdown = document.querySelector(".menu");
  let trgt = "Mechanical"
  dropdown.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      e.preventDefault();
      trgt = e.target.textContent;
    }
  })
  const input_file =input;
  Papa.parse(input_file, {
    header: false, // Since your file has irregular/multi-line headers
    download: true,
    skipEmptyLines: true,
    // newline: "\n", // Let PapaParse auto-detect newlines
    complete: function (results) {
      console.log(results.data);
      read_data(results.data, trgt)
    },
    error: function (error) {
      console.error("Error parsing CSV:", error);
    },
  })
}
read_file("output2.csv")