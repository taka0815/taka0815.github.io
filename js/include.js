document.addEventListener("DOMContentLoaded", function () {

    // header読み込み
    fetch("./_parts/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
        });

    // footer読み込み
    fetch("./_parts/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });

});
