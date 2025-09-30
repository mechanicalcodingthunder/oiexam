function read_file(input) {
    const input_file = input;
    console.log(input_file)
    // fetch(input_file).then((res) => res.text()).then(blob => readXlsxFile(blob)).then((rows) => read_data(rows));
    fetch(input_file).then((res) => res.text()).then(text => { const rows = text.split("\n");
        console.log(rows)
      })
      .catch(err => console.error("Error loading CSV:", err));
    document.querySelector(".popup").style.display = "block";

}

document.querySelector("#close").addEventListener("click", function () {
    document.querySelector(".popup").style.display = "none";
});

let obj
function read_data(data) {
    obj = data;
}
