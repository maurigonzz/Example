(function () {

    var loadScript = function(url, callback){
            var script = document.createElement("script")
            script.type = "text/javascript";

            if (script.readyState) { //IE
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else { //Others
                script.onload = function () {
                    callback();
                };
            }

            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
    };



    var myAppJavaScript = function($){
      console.log('Im using jQuery version: ' + $.fn.jquery);
        myButton = document.createElement("input");
        myButton.setAttribute("id", "paymentButton");
        myButton.type = "button";
        myButton.value = "Pagar con Tarjeta";
        placeHolder = document.getElementsByClassName("checkout-method");
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
    };

    // For jQuery version 1.7
    var target = [3, 4, 0];

    var current = typeof jQuery === 'undefined' ? [0,0,0] : $.fn.jquery.split('.').map(function(item) {
        return parseInt(item);
    });

    if (current[0] < target[0] || (current[0] == target[0] && current[1] < target[1])) {
      loadScript('//ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js', function(){
        var jQuery1101 = jQuery.noConflict(true);
        myAppJavaScript(jQuery1101);
        console.log('jquery loaded');
      });
    } else {
      myAppJavaScript(jQuery);
    }

})();
