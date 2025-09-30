function read_file(input) {
  const input_file = input;
  console.log(input_file);
  Papa.parse(input_file, {
    header: false, // Since your file has irregular/multi-line headers
    download: true,
    skipEmptyLines: true,
    newline: "\n", // Let PapaParse auto-detect newlines
    complete: function (results) {
      console.log(results.data);
      document.getElementById("output").innerText = results.data[8];
    },
    error: function (error) {
      console.error("Error parsing CSV:", error);
    },
  });
}

document.querySelector("#close").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "none";
});

let obj;
function read_data(data) {
  obj = data;
}
