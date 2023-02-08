function collapseNav() {
    if (screen.width > 750) {
        if (document.getElementById("collapse-sidebar").style.width != "42px") {
            document.getElementById("collapse-sidebar").style.width = "42px";
            document.getElementById("full-collapse-list").style.width = "0px";
            document.getElementById("full-collapse-list").style.height = "0px";
            
        } else {
            document.getElementById("collapse-sidebar").style.width = "100%";
            document.getElementById("full-collapse-list").style.width = "100%";
            document.getElementById("full-collapse-list").style.height = "100%";
        }
    } else {
        if (document.getElementById("collapse-sidebar").style.width != "42px") {
            document.getElementById("collapse-sidebar").style.width = "42px";
            document.getElementById("full-collapse-list").style.height = "0px";
            
        } else {
            document.getElementById("collapse-sidebar").style.width = "100%";
            document.getElementById("full-collapse-list").style.width = "100%";
            document.getElementById("full-collapse-list").style.height = "100%";
        }
    }
  }