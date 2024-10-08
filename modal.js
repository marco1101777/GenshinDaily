class Modal{
   
    constructor(elementHtml){
        this.style = `
            position:fixed; 
            width:100% ; 
            height : 100vh  ; 
            display:none ; 
            justify-content :center ; 
            align-items : center ;
            background-color : rgba(0,0,0,0.5) ;
        ` 
        this.modalElement = elementHtml ;
        this.modalElement.style = this.style ; 
        document.addEventListener('keydown' , (e) => {
            if (e.key == "Escape"){
                this.close()
            }

        })

    }

    close(){
        this.modalElement.style.display = "none" 
    }
    showModal(){
        this.modalElement.style.display = "flex"
    }
    
}

