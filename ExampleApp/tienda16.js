(function(){
    myButton = document.createElement("input");
    myButton.type = "button";
    myButton.value = "Pagar con Tarjeta";
    placeHolder = document.getElementsByClassName("custom-container");
    placeHolder[0].appendChild(myButton);
    console.log("Hello world! con tarjeta");
})();
