var counter = 0;

function showCarousel() {
    // Note this is just for presentation purposes for "adding an image"
    setTimeout(()=> {
        document.getElementById("hide-me").style.visibility = "visible";
        document.getElementById("hide-me-2").style.visibility = "visible";
     }
     ,3500);
}

function collapseSidebarHeader() {
    if (counter % 2 == 0) {
        counter = 1;
        document.getElementById('properties-mgr-title').style.width = "100%";
    } else {
        counter = 0;
        document.getElementById('properties-mgr-title').style.width = "0";
    }
}