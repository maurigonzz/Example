(function(){
    myButton = document.createElement("input");
    myButton.type = "button";
    myButton.value = "Pagar con Tarjeta";
    myButton.classList.add("btn btn-primary btn-submit ladda-button m-half-top");
    placeHolder = document.getElementsByClassName("custom-container");
    placeHolder[0].appendChild(myButton);
    console.log("Hello world! con tarjeta");
})();
