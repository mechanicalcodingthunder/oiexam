function inter_act() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const select = dropdown.querySelector('.select');
        const caret = dropdown.querySelector('.caret');
        const menu = dropdown.querySelector('.menu');
        const options = dropdown.querySelectorAll('.menu li');
        const selected = dropdown.querySelector('.selected');
        const searchBox = dropdown.querySelector('.search-box').lastElementChild;
        // console.log(options)
        document.addEventListener('click', function (event) {
            if (event.target.closest(".dropdown")) {
                return
            }
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate')
            menu.classList.remove('menu-open');
        })
        select.addEventListener('click', () => {
            menu.scrollTop = 0;
            if (select.classList.contains('select-clicked')) {
                select.classList.remove('select-clicked');
                caret.classList.remove('caret-rotate')
                menu.classList.remove('menu-open');
                searchBox.value = "";
            } else {
                let currenactive = document.querySelector(".select-clicked");
                if (currenactive) {
                    currenactive.classList.remove("select-clicked");
                    currenactive.lastElementChild.classList.remove("caret-rotate")
                    currenactive.nextElementSibling.nextElementSibling.classList.remove('menu-open');
                }
                select.classList.toggle('select-clicked');
                caret.classList.toggle('caret-rotate');
                menu.classList.toggle('menu-open');
            }
            searchBox.value = "";
            filterList("");
            if (select.classList.contains('select-clicked')) {
                searchBox.focus();
            }
            // option_check(options);
        });

        searchBox.addEventListener("keyup", function (e) {
            filterList(e.target.value);
        });

        const filterList = (searchTerm) => {
            searchTerm = searchTerm.toLowerCase();
            options.forEach((option) => {
                let label = option.innerText.toLowerCase();
                if (label.indexOf(searchTerm) != -1) {
                    option.style.display = "block";
                } else {
                    option.style.display = "none";
                }
            });

        };
        // function option_check(options) {
        options.forEach(option => {
            option.addEventListener('click', () => {
                selected.innerText = option.innerText;
                select.classList.remove('select-clicked');
                caret.classList.remove('caret-rotate');
                menu.classList.remove('menu-open');
                searchBox.value = "";
                retrieve_data(selected.innerText, dropdown);
                options.forEach(option => {
                    option.classList.remove('active');
                });
                option.classList.add('active');
            });
        });
        // }

    });
}

const Inputs = document.querySelectorAll(".property input")
Inputs.forEach(Input => {
    // Input.addEventListener('input', () => {
        Input.addEventListener("keypress", (evt) => {
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode == 46) {
                //Check if the text already contains the . character
                if (Input.value.indexOf('.') != -1) {
                  evt.preventDefault();
                } else {
                  return true;
                }
            } else if(charCode == 45){
                if (Input.value.indexOf('-') != -1 || Input.selectionEnd > 0) {
                  evt.preventDefault();
                } else {
                  return true;
                }
            } else {
                if (charCode > 31 &&
                  (charCode < 48 || charCode > 57)){
                  evt.preventDefault();
                  } else if((Input.value.indexOf('.') != -1 && (Input.value.length-Input.value.indexOf('.'))>3)){
                evt.preventDefault();
            }
            }
            const dropdown = Input.parentElement.parentNode.previousElementSibling;
            const selected = dropdown.querySelector(".select>.selected");
            const options = dropdown.querySelectorAll(".menu li")
            selected.innerText = options[0].innerText;
            options.forEach(option => {
                option.classList.remove('active');
            });
            options[0].classList.add('active');
    })
})

function create_tooltip(limit) {
    const spanall = document.querySelectorAll(".property span");
    spanall.forEach(span => {
        const input = span.previousElementSibling;
        const species_type = input.parentElement.parentElement.previousElementSibling.id
        if (input.parentElement.className=="mobility"){
            span.innerText = "Suggested Range" + ' ' + '[' + limit[species_type][0] + ',' + limit[species_type][1] + ']';
        }else{
            span.innerText = "Suggested Range" + ' ' + '[' + limit[species_type][2] + ',' + limit[species_type][3] + ']';
        }
    })
}