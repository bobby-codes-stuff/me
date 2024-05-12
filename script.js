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

initialViewAnimation();
