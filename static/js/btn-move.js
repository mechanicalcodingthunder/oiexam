function Cationic_read(data) {
    const MoveBTn = document.querySelector(".movebtn");
    // console.log('hh')
    // inter_act();
    MoveBTn.classList.add("rightbtn");
    MoveBTn.innerHTML = "Cationic";
    clear_div();
    clear_result();
    update_slider();
    const el = document.getElementsByClassName("outcome")[0]
    el.innerHTML = ""
    const limit = {
        "le": ["20.0", "85.0", "6.0", "14.0"],
        "te": ["20.0", "85.0", "4.0", "14.0"],
        "bg": ["-85.0", "-20.0", "4.0", "10.0"],
        "analyte": ["20.0", "85.0", "4.0", "14.0"],
    }
    create_doc(data[MoveBTn.innerHTML + ' ' + 'ITP']);
    create_tooltip(limit);

}

function Anionic_read(data) {
    const MoveBTn = document.querySelector(".movebtn");
    MoveBTn.classList.remove("rightbtn");
    // console.log(data);

    MoveBTn.innerHTML = "Anionic"
    clear_div();
    clear_result();
    update_slider();
    const el = document.getElementsByClassName("outcome")[0]
    el.innerHTML = ""
    const limit = {
        "le": ["-85.0", "-20.0", "-2.0", "8.0"],
        "te": ["-85.0", "-20.0", "-2.0", "10.0"],
        "bg": ["20.0", "85.0", "4.0", "10.0"],
        "analyte": ["-85.0", "-20.0", "-2.0", "10.0"],
    }
    create_doc(data[MoveBTn.innerHTML + ' ' + 'ITP']);
    create_tooltip(limit);

};

function clear_div() {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector(".menu")
        const selectd = dropdown.querySelector('.selected');
        while (menu.childNodes.length > 2) {
            menu.removeChild(menu.lastChild);
        };
        menu.firstElementChild.classList.add("active")
        selectd.innerHTML = "Custom";
    })
}

function update_slider(){
    const input = document.getElementById("bg_le_conc_ratio");
    input.value = "2.0";
}