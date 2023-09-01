var currentIndex = 2;
var bgList = ["bg1.jpg", "bg2.jpg", "bg3.jpg"];

function changeBackground(index) {
    currentIndex += index;
    if (currentIndex != 0 && currentIndex <= bgList.length) {
        document.getElementById("main-section").style.backgroundImage = "url('assets/" + bgList[currentIndex - 1] + "')";
    } else {
        currentIndex -= index;
    }
}
