const menu = document.getElementById("menu");
const sidenavbar = document.getElementById("sidenav-bar");
const closemenu = document.getElementsByClassName("close-menu")[0];

menu.addEventListener("click", () => {
    sidenavbar.classList.toggle("show");
});

closemenu.addEventListener("click", () => {
    sidenavbar.classList.toggle("show");
});


const sidenavclose = document.getElementsByClassName("sidenav-close")[0];
const secondrynav = document.getElementsByClassName("secondry-nav")[0];
const closebar = document.getElementById("close-menu");

sidenavclose.addEventListener("click", ()=>{
    secondrynav.classList.toggle("show")
    
});

closebar.addEventListener("click", ()=>{
    secondrynav.classList.toggle("show")
    console.log("hi");
    
})

