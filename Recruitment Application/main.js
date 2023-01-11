

class Device {

    static get isMobile(){
        document.write(navigator.userAgent)
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }

    static permission(type){
        navigator.permissions.query({name:type}).then( result => {
            return result.state
        })

    }}


class WindowManager{

    constructor() {
        this.setup()
        this.tab_change_num = 0
        this.pointer_conter = null
    }

    setup(){
        this.visibilityChangedDetector()
        this.pointerDetector()
        this.windowSizeTracker()
    }

    windowSizeTracker(){

        window.addEventListener('resize', (e) => {

            widthRation = window.outerWidth/window.screen.width;
            heightRation = window.outerHeight/window.screen.height;


            })}

    pointerDetector(){

        document.addEventListener('pointerleave', (e) => {
            if(widthRation<0.9){
                this.pointer_conter++;
                pointerHandler(this.pointer_conter, this.tab_change_num, true);

            }



        });

        document.addEventListener('pointerover', (event) => {
            pointerHandler(this.pointer_conter, this.tab_change_num, false);

        })}

    visibilityChangedDetector() {
        //  this event fires when ever the user changes the tab*
        document.addEventListener("visibilitychange", event => {
            if (document.visibilityState === "visible") {
                this.tab_change_num++
                pointerHandler(this.pointer_conter, this.tab_change_num, true)
            }
        })



    }

}


class EventBlocker{ // this class block some of the browser features
    constructor() {
        this.setup();
    }

    setup(){
        // this.googleTranslateBlocker();
        // this.clipboardEventCapture();
        this.textOperationDisable()
        this.pagePrintBlocker();
        this.rightClickEventCapture();
    }


    googleTranslateBlocker(mode=true) {
        // blocking Google translator
        let value="yes";
        if(!mode){
            value="no";
            document.getElementById("disable-translation-btn").classList.add("hide")
            document.getElementById("enable-translation-btn").classList.remove("hide")
        }else {
            document.getElementById("disable-translation-btn").classList.remove("hide")
            document.getElementById("enable-translation-btn").classList.add("hide")
        }

        let htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.setAttribute("translate", value);
    }

    rightClickEventCapture(target="right-click-block"){

        // blocking right click for any element that has the class name *right-click-img-block*
        let elements = document.getElementsByClassName(target);
        for (const elm of elements) {
            elm.addEventListener('contextmenu',  e =>{
                notificationAlert("Right Click")
                e.preventDefault()}, false);
        }

    }

    textOperationDisable(mode){

        if(mode){



        }else{


        }

        }

    clipboardEventCapture(mode){
        let copy_elm = document.getElementsByClassName("no_copy");

        // blocking copy and drag features for any elements that has the class name *no_copy*

        if(mode){
            document.getElementById("btn-copy-off").classList.remove("hide")
            document.getElementById("btn-copy-on").classList.add("hide")
            for (const ele of copy_elm) {
                ele.addEventListener('copy', disable, true);
                ele.addEventListener('dragstart',  disable, true);
            }


        }else {
            document.getElementById("btn-copy-off").classList.add("hide")
            document.getElementById("btn-copy-on").classList.remove("hide")

            for (const ele of copy_elm) {
                ele.removeEventListener('copy', disable, true);
                ele.removeEventListener('dragstart',  disable, true);
            }}

    }

    pagePrintBlocker(){
        function hideContent(){
            bodyElem.setAttribute("class", "hide");
        }

        function restoreContent(){
            bodyElem.removeAttribute("class")
        }


        let bodyElem = document.getElementsByTagName("body")[0]
        window.addEventListener('beforeprint', hideContent);

        window.addEventListener('afterprint', restoreContent);

    }

}


function notificationAlert(operation) {
// temp function to handle and receive the events and show an alert
    if (operation=="Copy" || operation=="Drag"){
        document.getElementById("no_copy").classList.add("copy-warning")
        setTimeout(()=>{document.getElementById("no_copy").classList.remove("copy-warning")}, 300)


    }

    else if(operation=="Right Click"){
        document.getElementById("img--").classList.add("copy-warning")
        setTimeout(()=>{document.getElementById("img--").classList.remove("copy-warning")}, 300)

    }

}



function pointerHandler(pointerNum, tabNum, warning) {
// temp function for slides
    const card_warning = document.getElementById("card-5");
    const output = document.getElementById('output');
    if(warning){
        output.classList.add("warning");

    }else if(!warning){
        output.classList.remove("warning");
    }

    output.innerText = `
        Pointer Out:    ${pointerNum} times
        page was hidden:    ${tabNum} times
      
`
}




function disable(e) {
    e.preventDefault()
    notificationAlert("Copy")
}

let widthRation ;
let heightRation;

let blocker = new EventBlocker()
new WindowManager()


let disable_trans_btn = document.getElementById("disable-translation-btn");
let enable_trans_btn=document.getElementById("enable-translation-btn");

disable_trans_btn.addEventListener('click',()=>{blocker.googleTranslateBlocker(false)});
enable_trans_btn.addEventListener('click', ()=>{blocker.googleTranslateBlocker(true)});

let btn_copy_on = document.getElementById("btn-copy-on");
let btn_copy_off=document.getElementById("btn-copy-off");

btn_copy_on.addEventListener('click',()=>{blocker.clipboardEventCapture(true)});
btn_copy_off.addEventListener('click', ()=>{blocker.clipboardEventCapture(false)});