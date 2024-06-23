class Typerwriter {
    constructor(el, options) {
        this.el = el;
        this.words = [...this.el.dataset.typewriter.split(",")];
        this.speed = options?.speed || 100;
        this.delay = options?.speed || 1000;
        this.repeat = options?.repeat;
        // this.initTyping();
    }

    wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    toggleTyping = () => this.el.classList.toggle("typing");

    async typewrite(word, is_last_word) {
        for (const letter of word.split('')) {
            this.el.textContent += letter;
            await this.wait(this.speed);
        }
        
        if(! is_last_word) {
            this.toggleTyping();
            await this.wait(this.delay);
            while(this.el.textContent.length !== 1) {
                this.el.textContent = this.el.textContent.slice(0, -1);
                await this.wait(this.speed);
            }
        }
        this.toggleTyping();
    }

    async initTyping() {
        
        await this.wait(this.delay*3);
        this.toggleTyping();
        for (const word of this.words) {
            if(word == this.words[this.words.length-1]) {
                await this.typewrite(word, true);
            } else {
                await this.typewrite(word, false);
            }
            
        }
        if (this.repeat) {
            await this.initTyping();
        }

    }
}

function startToHomepage() {
    // const initialWebpage = document.getElementsByClassName("initial-display")[0];
    // initialWebpage.parentNode.removeChild(initial-display);
    var about_section = document.getElementById("about-section");
    about_section.style.display = "flex";
    about_section.scrollIntoView()
}

function displayStartButton() {
    start_btn.style.opacity = 1;
}

async function initialViewAnimation(){
    await el1.initTyping();
    setTimeout(displayStartButton, 2000);
}

const start_btn = document.getElementById('start-btn');
const el1 = new Typerwriter(document.querySelector("[data-typewriter]"), {
    repeat: false,
});

var now = new Date();
var datetime = now.toLocaleString();
document.getElementById("current-date").innerHTML=datetime;

// const select=document.querySelector("select")
// const html=document.querySelector("html")

// function update(bgColor, textColor) {
//     html.style.backgroundColor=bgColor;
//     html.style.color=textColor;
// }

// select.addEventListener("change", () => select.value === "light"
//     ? update("#EAEAEA", "#08D9D6")
//     : update("#252A34", "#08D9D6")
// )

initialViewAnimation();
