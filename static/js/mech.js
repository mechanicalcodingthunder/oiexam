window.onload = function () {
  console.log("laoded");
  fetch_file();
};
// Select the branch on click
let data_file = [];

function branch_select(e) {
  console.log(e);
  e.preventDefault;
  const selected = document.querySelector(".selected");
  selected.innerText = e.textContent;
  fetch_file();
}

function create_table() {
  const tbl =
    document.getElementsByClassName("table_container")[0].lastElementChild;
  const p_ele =
    document.getElementsByClassName("table_container")[0].firstElementChild;
  col = 5;
  if (tbl.childElementCount == 2) {
    if (tbl.classList.contains("hide")) {
      tbl.classList.toggle("hide");
    }
    tbd = tbl.children[1];
  } else {
    tbd = document.createElement("tbody");
    tbl.classList.toggle("hide");
  }
  if (tbd.childElementCount == 0) {
    p_ele.innerHTML = "Final Result";
  } else {
    p_ele.innerHTML = "Final Results";
  }
  const tr = document.createElement("tr");

  const obj = "hello";
  for (let j of obj) {
    const td = document.createElement("td");
    td.appendChild(document.createTextNode(j));
    tr.appendChild(td);
  }
  tbd.insertBefore(tr, tbd.firstChild);
  tbl.appendChild(tbd);
}

function delete_table() {
  const tbl = document.getElementById("table");
  tr1 = tbl.children[0].children[0];
  tr2 = tbl.children[0].children[1];
  while (tr1.hasChildNodes()) {
    tr1.removeChild(tr1.firstChild);
  }
  while (tr2.hasChildNodes()) {
    tr2.removeChild(tr2.firstChild);
  }
  if (tbl.previousElementSibling.classList.contains("hide")) {
    tbl.previousElementSibling.classList.remove("hide");
    tbl.classList.add("hide");
  }
}

function create_data(value) {
  let final_result = [];
  console.log(value);
  console.log(data_file);
  data_file.forEach((element) => {
    let f = read_data(element, value);
    if (f.length > 0) {
      final_result.push(f); // store if not empty
      // break;                 // stop loop if you want first match
    }
  });
  document.getElementById("output").innerText = final_result;
  console.log(final_result);
  create_table();
}

function showresult(evt) {
  const rollno = evt.target.previousElementSibling;
  console.log(rollno);
  if (rollno.value == "" || rollno.value.length < 12) {
    rollno.focus();
  } else {
    create_data(rollno.value);
  }
}
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
      console.log(file.Files);
      read_file(file.Files);
    })
    .catch((error) => {
      console.error("Error Fetching", error);
    });
}

function read_data(data, value) {
  let dat = [];
  data.forEach((element) => {
    let count = 0;
    console.log(element);
    for (let row of element) {
      if (row === value) {
        dat.push(element.slice(0, 3).concat(element.slice(-3)));
        console.log(dat);
        // // console.log("hell");
        // console.log(dat[0].slice(0, 3).concat(dat[0].slice(-3)));
        break;
      } else if (count === 5) {
        break;
      } else {
        count = count + 1;
      }
    }
  });
  return dat;
}
function init() {
  document.getElementById("output").innerText = "";
}

function read_file(input) {
  for (const input_file of input) {
    Papa.parse(input_file, {
      header: false, // Since your file has irregular/multi-line headers
      download: true,
      skipEmptyLines: true,
      // newline: "\n", // Let PapaParse auto-detect newlines
      complete: function (results) {
        data_file.push(results.data);
      },
      error: function (error) {
        console.error("Error parsing CSV:", error);
      },
    });
  }
}
create_table();
