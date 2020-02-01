(function(){
    myButton = document.createElement("input");
    myButton.setAttribute("id", "paymentButton");
    myButton.type = "button";
    myButton.value = "Pagar con Tarjeta";
    placeHolder = document.getElementsByClassName("custom-container");
    placeHolder[0].appendChild(myButton);
    console.log("Hello world! con tarjeta");


    $( "#paymentButton" ).click(function(){
        $.ajax({
            url:"https://8gvb7vktrc.execute-api.us-east-2.amazonaws.com/test/helloworld",
            type:"POST",
            headers: { 
              "Content-Type" : "application/json",
              "id" : "1616",
              "number" : "20200120",
              "total" : "16"
            },
            success: function(data) {
                console.log(data);
            },
            error: function(data) {
                console.log("error al cargar medio de pago");
            }
          
        })
    
    });


})();
