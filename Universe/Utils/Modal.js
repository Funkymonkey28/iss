import { EventEmitter } from "events";
export default class Modal extends EventEmitter{
  constructor( caller ){
    super();
    this.caller = caller;

    // Show Modal
    this.modalWindowOverlay = document.getElementById("modal-overlay");
    const showModalWindow = () => {
      this.modalWindowOverlay.style.display = 'flex';
      document.getElementById("m-header").innerHTML = this.caller.getModalInfo()["header"];
      document.getElementById("m-content").innerHTML = this.caller.getModalInfo()["content"];
      
      document.getElementById("universe-main").style.width = "75%";
    }

    this.caller.on("showInfo", showModalWindow);

    // Hide Modal
    this.closeModalButton = document.getElementById("close-modal");
    const hideModalWindow = () => {
        this.modalWindowOverlay.style.display = 'none';
        
        document.getElementById("universe-main").style.width = "100%";
        this.emit("close");
    }
    this.closeModalButton.addEventListener("click", hideModalWindow);
    this.caller.on("closeInfo", hideModalWindow);

    // Hide On Blur
    const hideModalWindowOnBlur = (e) => {
        if(e.target === e.currentTarget) {
          console.log(e.target === e.currentTarget)
            hideModalWindow();
        }
    }
    this.modalWindowOverlay.addEventListener("click", hideModalWindowOnBlur)
    }
}
