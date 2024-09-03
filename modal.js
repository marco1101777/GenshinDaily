class Modal{
   
    costructor(elementHtml){
    this.style = `
        position:fixed; 
        width:100% ; 
        height : 100vh  ; 
        display:none ; 
        justify-conten :center ; 
        align-items : center ; 

    ` 
        this.modalElement = elementHtml ;
        this.modalElement.style = this.style ; 
    }

    close(){
        console.log(this.modalElement)
        this.modalElement.style.display = "none" 
    }
    showModal(){
        thismodalElement.style.display = "flex"
    }
    


}

