const title = document.getElementById("title");
const input = document.getElementById("name");
const clickBtn = document.getElementById("clickBtn");
const dblBtn = document.getElementById("dblBtn");
const form = document.getElementById("myForm");
const parent = document.getElementById("parent");
const child = document.getElementById("child");

// Click
clickBtn.addEventListener("click", () => {
    console.log("Button Clicked");
    title.innerText = "Clicked";
});

// Double Click
dblBtn.addEventListener("dblclick", () => {
    console.log("Double Click");
});

// Input
input.addEventListener("input", (e) => {
    console.log("Input:", e.target.value);
});

// Change
input.addEventListener("change", (e) => {
    console.log("Change:", e.target.value);
});

// Focus
input.addEventListener("focus", () => {
    console.log("Focus");
});

// Blur
input.addEventListener("blur", () => {
    console.log("Blur");
});

// Key Down
document.addEventListener("keydown", (e) => {
    console.log("Key Down:", e.key);
});

// Key Up
document.addEventListener("keyup", (e) => {
    console.log("Key Up:", e.key);
});

// Mouse Over
clickBtn.addEventListener("mouseover", () => {
    console.log("Mouse Over");
});

// Mouse Out
clickBtn.addEventListener("mouseout", () => {
    console.log("Mouse Out");
});

// Submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Form Submitted");
});

// Parent
parent.addEventListener("click", () => {
    console.log("Parent Clicked");
});

// Child
child.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("Child Clicked");
});