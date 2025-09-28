window.onload = function () {
    // fetch('../sample.json').then((res) => res.json()).then(data => {
    fetch('/data_recieve').then((res) => res.json()).then(data => {
        console.log(data);
        create_data(data);
        inter_act();
    });
    // fetch('/static/images').then((res) => res.blob()).then(blob => {
    //     console.log(blob);
    // })    
}


let obj;
function create_data(data) {
    obj = data;
    console.log(data);
    console.log(JSON.stringify(obj)[0])
    document.getElementsByClassName("data")[0].children[0].innerText = obj[4];
    document.getElementsByClassName("data")[0].children[1].innerText = obj[5];
}
