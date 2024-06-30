hljs.highlightAll();
hljs.configure({ ignoreUnescapedHTML: true });
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const App = Vue.createApp({
    data() {
        return {
            showpage: false,
            menushow: false,
            cardtop: 100,
            barlocal: 0,
        };
    },
    created() {
        let that = this;
        window.addEventListener("load", () => {
            that.showpage = true;
            document.getElementById("loading").style.opacity = 0;
            document.getElementById("loading").style.visibility = "hidden";
        });
    },
    mounted() {
        if (document.getElementById("home-head"))
            document.getElementById("menu").className += " menu-color";
        window.addEventListener("scroll", this.handleScroll, true);
        let codes = document.getElementsByTagName("pre");
        let copying = false;
        for (let code of codes) {
            const lang =
                code?.firstChild.className.split(/\s+/).filter(x => {
                    return x != "sourceCode";
                })[0] || "text";
            let content = document.createElement("div");
            content.classList.add("code-content");
            content.innerHTML = code.innerHTML;
            let language = document.createElement("div");
            language.classList.add("language");
            language.innerHTML = lang;
            let copycode = document.createElement("div");
            copycode.classList.add("copycode");
            copycode.innerHTML =
                '<i class="fa-solid fa-copy"></i><i class="fa-solid fa-clone"></i>';
            copycode.addEventListener("click", async () => {
                if (copying) return;
                copying = true;
                copycode.classList.add("copied");
                await navigator.clipboard.writeText(this.parentElement.firstChild.innerText);
                await sleep(1000);
                copycode.classList.remove("copied");
                copying = false;
            });
            code.innerHTML = "";
            code.append(content, language, copycode);
        }
    },
    methods: {
        home_click() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
            });
        },
        handleScroll() {
            let newlocal = document.documentElement.scrollTop;
            let menu = document.getElementById("menu");
            let wrap = document.getElementById("home-posts-wrap");
            let footer = document.getElementById("footer");
            let that = this;
            if (this.barlocal < newlocal) {
                menu.className = "hidden-menu";
                that.menushow = false;
            } else menu.className = "show-menu";
            if (wrap) {
                if (newlocal <= window.innerHeight - 100) menu.className += " menu-color";
                if (newlocal <= 400) {
                    wrap.style.top = -newlocal / 5 + "px";
                    footer.style.top = 150 - newlocal / 5 + "px";
                } else if (wrap.style.top != "-80px" || footer.style.top != "70px") {
                    wrap.style.top = "-80px";
                    footer.style.top = "70px";
                }
            }
            this.barlocal = newlocal;
        },
    },
});
App.mount("#layout");
