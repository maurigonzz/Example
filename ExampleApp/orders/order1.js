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

        var paymentButton = function(){
            myButton = document.createElement("input");
            myButton.setAttribute("id", "paymentButton");
            myButton.setAttribute('class', 'btn-full btn btn-primary');
            myButton.type = "button";
            myButton.value = "Pagar con Tarjeta";
            return myButton;
        };

        var addButton = function(id, className, value){
            myButton = document.createElement("input");
            myButton.setAttribute("id", id);
            myButton.setAttribute('class', className);
            myButton.type = "button";
            myButton.value = value;
            return myButton;
        };

        var addCustomElement = function(tag, id, className){
            let element = document.createElement(tag);
            element.setAttribute("id", id);
            element.setAttribute('class', className);
            return element;
        };

        var paymentText = function(message){
            textElement = document.createElement("p");
            textElement.setAttribute("id", "paymentText");
            textElement.innerHTML = message;
            return textElement;
        };

        var myAppJavaScript = function($){
            isSuccessOrder = location.pathname.includes("/checkout/v3/success/");
            if (!isSuccessOrder || !LS.cart.contact.email === "maurigonzz@gmail.com") {
                console.log("Prod mode");
                return;
            }



            console.log("DEV mode");
            console.log('Im using jQuery version: ' + $.fn.jquery);
            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
            });
            
            if (params.payment === null) {
                //check if payment is ready. If the user back to this page. 
                
                //myButton = paymentButton();
                //placeHolder = document.getElementsByClassName("custom-payment text-pre-wrap");
                //placeHolder[0].appendChild(myButton);
                //console.log("Hello world! con tarjeta");

                let divWrapper = document.createElement("div");
                divWrapper.setAttribute("id", "divButtonsWrapper");
                divWrapper.setAttribute('class', 'row third-gutters');



                
                let payNowButton = addButton("payNowButtonId", "btn-full btn btn-primary col-12 col-sm-6 m-bottom-half-xs", "Pagar con Tarjeta");
                let payLaterButton = addButton("payLaterButtonId", "btn-full btn btn-primary col-12 col-sm-6 m-bottom-half-xs", "Pagar con otro medio de pago");
                payLaterButton.style.backgroundColor = "#99A3A4";
                payLaterButton.href = window.location.origin + window.location.pathname + "?payment=other";

                divWrapper.appendChild(payNowButton);
                divWrapper.appendChild(payLaterButton);

                let customPaymentDiv = document.getElementsByClassName("custom-payment text-pre-wrap")[0];
                customPaymentDiv.appendChild(divWrapper);

            }

            $( document ).ready(function() {
                if (params.payment === "success") {
                    elements = Array.from(document.querySelectorAll("h3"));
                    element = elements.find(el => {return el.textContent.toLowerCase().includes("en espera de pago");});
                    element.innerHTML = "Gracias por tu compra!";
        
                    //elements = Array.from(document.querySelectorAll("p"));
                    //element = elements.find(el => {return el.textContent.toLowerCase().includes("gracias por tu compra");});
                    //element.innerHTML = "En breve confirmaremos tu pago y tu pedido quedará listo para ser enviado o retirado.";

                    currentMessage = document.getElementsByClassName("custom-payment text-pre-wrap");
                    currentMessage[0].remove();

                    currentPaymentStatus = document.getElementsByClassName("history-item-incomplete");
                    currentPaymentStatus[1].remove();

                    message = "En breve confirmaremos tu pago y tu pedido quedará listo para ser enviado o retirado."
                    paymentMessage = paymentText(message);
                    
                    statusDiv = document.getElementsByClassName("status-content");
                    statusDiv[0].appendChild(paymentMessage);
                }
            });

            if (params.payment === "failure") {
                elements = Array.from(document.querySelectorAll("h3"));
                element = elements.find(el => {return el.textContent.toLowerCase().includes("en espera de pago");});
                element.innerHTML = "Hubo un problema al procesar el pago con Mercado Pago";

                currentMessage = document.getElementsByClassName("custom-payment text-pre-wrap");
                currentMessage[0].remove();

                //currentPaymentStatus = document.getElementsByClassName("history-item-incomplete");
                //currentPaymentStatus[1].remove();

                message = "No te preocupes nos pondremos en contacto para coordinar el pago."
                paymentMessage = paymentText(message);
                    
                statusDiv = document.getElementsByClassName("status-content");
                statusDiv[0].appendChild(paymentMessage);
            }

            if (params.payment === "other") {
                let elements = Array.from(document.querySelectorAll("h3"));
                let element = elements.find(el => {return el.textContent.toLowerCase().includes("en espera de pago");});
                element.innerHTML = "Gracias por tu compra!";

                let currentMessage = document.getElementsByClassName("custom-payment text-pre-wrap");
                currentMessage[0].remove();

                let message = "Si quieres pagar en efectivo o no sabés como realizar el pago, no te preocupes, nos comunicaremos para coordinar el mismo.<br><br>"
                    + "Si quieres pagar con transferencia bancaria, puedes solicitar los datos para la transfgerencia aquí:"
                let paymentMessage = paymentText(message);

                let whatsAppLink = addCustomElement("a", "whatsAppLinkId", null);
                whatsAppLink.href = href="https://api.whatsapp.com/send?phone=59899203412";

                let whatsappIcon = addCustomElement("svg", "whatsappIconId", "icon-inline icon-3x svg-icon-text");
                whatsappIcon.appendChild(whatsAppLink);

                
                let statusDiv = document.getElementsByClassName("status-content")[0];
                statusDiv.appendChild(paymentMessage);
                statusDiv.appendChild(whatsAppLink);
            }
            
            $("#payNowButtonId").click(function(){

                //check if this property includes the disccount.
                let orderTotal = LS.order.total / 100;
                let orderNumber = LS.order.number;
                let contactEmail = LS.cart.contact.email;
                console.log("total; " + orderTotal);
                console.log("orderNumber; " + orderTotal);
                console.log("contactEmail; " + orderTotal);

                /*
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
                */
                
                //var origin   = window.location.href;
                //var successUrl = origin + "?payment=success";
                
                var origin   = window.location.origin;
                var pathname = window.location.pathname;
                var successUrl = origin + pathname + "?payment=success";


                window.location.href = successUrl;
            });
            
            $("#payLaterButtonId").click(function(){
                window.location.href = window.location.origin + window.location.pathname + "?payment=other";
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
