window.onload = function () {
  console.log("laoded");
  fetch_file();
};

function fetch_file() {
  const fil = document.querySelector(".selected").innerText;
  console.log(fil);
  const url = "./Results/" + fil;
  fetch(url + "/index.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("File not found");
      }
      return res.json();
    })
    .then((file) => {
      console.log(file);
      // read_file("output2.csv");
    })
    .catch((error) => {
      console.error("Error Fetching", error);
    });
}
const branch = {
  Civil: 0,
  Computer: 1,
  Electrical: 2,
  ECE: 3,
  FAA: 4,
  FD: 5,
  FT: 6,
  IC: 7,
  Mechanical: 8,
  "Med Eltx": 9,
  TD: 10,
  TP: 11,
  TT: 12,
};
function read_data(data, trgt) {
  init();
  let dat = [];
  data.forEach((element) => {
    let count = 0;
    // console.log(element);
    for (let row of element) {
      if (row === "220042700002") {
        dat.push(element);
        console.log(row);
        console.log("hell");
        break;
      } else if (count === 5) {
        break;
      } else {
        count = count + 1;
      }
    }
  });
  console.log(dat);
  let reu = data[branch[trgt]];
  console.log(reu);
  // console.log(reu.slice(0, 3).concat(reu.slice(-3)));
  document.getElementById("output").innerText = data[branch[trgt]];
}
function init() {
  document.getElementById("output").innerText = "";
}
function branch_select(e) {
  console.log(e);
  const selected = document.querySelector(".selected");
  selected.innerText = e.textContent;
  fetch_file();
  //   }
  // });
}
function read_file(input) {
  const dropdown = document.querySelector(".menu");
  let trgt = document.querySelector(".selected").innerText;
  dropdown.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      e.preventDefault();
      trgt = e.target.textContent;
    }
  });
  const input_file = input;
  Papa.parse(input_file, {
    header: false, // Since your file has irregular/multi-line headers
    download: true,
    skipEmptyLines: true,
    // newline: "\n", // Let PapaParse auto-detect newlines
    complete: function (results) {
      console.log(results.data);
      read_data(results.data, trgt);
    },
    error: function (error) {
      console.error("Error parsing CSV:", error);
    },
  });
}
