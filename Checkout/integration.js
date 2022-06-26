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
            if (!isSuccessOrder) {
                return;
            }

            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
            });
            
            if (params.payment === null) {
                let currentMessage = document.getElementsByClassName("custom-payment text-pre-wrap");
                currentMessage[0].remove();
                
                let paymentMethodText = paymentText("Tu pedido est\u00e1 confirmado!. Selecciona el medio de pago de tu preferencia.");

                let payNowButton = addButton("payNowButtonId", "btn-full btn btn-primary col-12 col-sm-12 m-bottom-half-xs", "Pagar con Tarjeta");
                let payOtherButton = addButton("payOtherButtonId", "btn-full btn btn-secondary col-12 col-sm-12 m-bottom-half-xs", "Otros medios de pago");
                payOtherButton.href = window.location.origin + window.location.pathname + "?payment=other";

                let statusDiv = document.getElementsByClassName("status-content")[0];
                statusDiv.appendChild(paymentMethodText);
                statusDiv.appendChild(payNowButton);
                statusDiv.appendChild(addCustomElement("p", "customP", ""));
                statusDiv.appendChild(payOtherButton);

            }

            $( document ).ready(function() {
                if (params.payment === "success") {
                    elements = Array.from(document.querySelectorAll("h3"));
                    element = elements.find(el => {return el.textContent.toLowerCase().includes("en espera de pago");});
                    element.innerHTML = "Gracias por tu compra!";

                    currentMessage = document.getElementsByClassName("custom-payment text-pre-wrap");
                    currentMessage[0].remove();

                    currentPaymentStatus = document.getElementsByClassName("history-item-incomplete");
                    currentPaymentStatus[1].remove();

                    message = "En breve confirmaremos tu pago y tu pedido quedar\u00e1 listo para ser enviado o retirado."
                    paymentMessage = paymentText(message);
                    
                    statusDiv = document.getElementsByClassName("status-content");
                    statusDiv[0].appendChild(paymentMessage);
                }
            });

            if (params.payment === "failure") {
                let elements = Array.from(document.querySelectorAll("h3"));
                let element = elements.find(el => {return el.textContent.toLowerCase().includes("en espera de pago");});
                element.innerHTML = "Hubo un problema al procesar el pago con Mercado Pago";

                let currentMessage = document.getElementsByClassName("custom-payment text-pre-wrap");
                currentMessage[0].remove();

                let paymentMessage = paymentText("No te preocupes nos pondremos en contacto para coordinar el pago.");
                let backButton = addButton("backButtonId", "btn-full btn btn-secondary col-12 col-sm-12 m-bottom-half-xs", "Volver");
                    
                let statusDiv = document.getElementsByClassName("status-content")[0];
                statusDiv.appendChild(paymentMessage);
                statusDiv.appendChild(backButton);
            }

            if (params.payment === "pending") {
                let elements = Array.from(document.querySelectorAll("h3"));
                let element = elements.find(el => {return el.textContent.toLowerCase().includes("en espera de pago");});
                element.innerHTML = "Seg\u00fan Mercado Pago el pago est\u00e1 pendiente de aprobaci\u00f3n.";

                let currentMessage = document.getElementsByClassName("custom-payment text-pre-wrap");
                currentMessage[0].remove();

                let paymentMessage = paymentText("No te preocupes Mercado Pago nos avisar\u00e1 cuando se confirme.");
                    
                let statusDiv = document.getElementsByClassName("status-content")[0];
                statusDiv.appendChild(paymentMessage);
            }

            if (params.payment === "other") {
                let elements = Array.from(document.querySelectorAll("h3"));
                let element = elements.find(el => {return el.textContent.toLowerCase().includes("en espera de pago");});

                let currentMessage = document.getElementsByClassName("custom-payment text-pre-wrap");
                currentMessage[0].remove();

                let payLaterMessage = "Si quieres pagar al retirar tu compra, o no sabes como realizar el pago, no te preocupes, selecciona pagar luego y nos comunicaremos para coordinar el mismo."
                let payLaterMessageElement = paymentText(payLaterMessage);
                let payLaterButton = addButton("payLaterButtonId", "btn-full btn btn-primary col-12 col-sm-12 m-bottom-half-xs", "Pagar Luego");


                let payTransferMessage = "Si quieres pagar con transferencia bancaria, puedes solicitar los datos para la transferencia aqu\u00ed:"
                let payTransferMessageElement = paymentText(payTransferMessage);
                let payTransferButton = addButton("payTransferButtonId", "btn-full btn btn-primary col-12 col-sm-12 m-bottom-half-xs", "Pagar con transferencia");

                let backButton = addButton("backButtonId", "btn-full btn btn-secondary col-12 col-sm-12 m-bottom-half-xs", "Volver");

                
                let statusDiv = document.getElementsByClassName("status-content")[0];
                statusDiv.appendChild(payLaterMessageElement);
                statusDiv.appendChild(payLaterButton);

                statusDiv.appendChild(payTransferMessageElement);
                statusDiv.appendChild(payTransferButton);

                statusDiv.appendChild(addCustomElement("p", "customP1", ""));
                statusDiv.appendChild(backButton);
            }
            
            $("#payNowButtonId").click(function(){
                $("#payNowButtonId").attr("disabled", true);
                $("#payNowButtonId").prop("value", "procesando");

                //check if this property includes the disccount.
                let orderTotal = LS.order.total / 100;
                let orderNumber = LS.order.number;
                let contactEmail = LS.cart.contact.email;
                let order_url = window.location.origin + window.location.pathname;
                
                $.ajax({
                    url:"https://7adkgao0rl.execute-api.sa-east-1.amazonaws.com/default/mercadoPagopayment",
                    type:"POST",
                    headers: { 
                    "Content-Type" : "application/json",
                    "number" : orderNumber,
                    "total" : orderTotal,
                    "order_url" : order_url,
                    "email" : contactEmail
                },
                    success: function(data) {
                        window.location.href = data.url;
                    },
                    error: function(data) {
                        console.log("Unable to load payment method.");
                        $("#payNowButtonId").attr("disabled", false);
                        $("#payNowButtonId").prop("value", "Pagar con Tarjeta");
                    }
                })
            });
            
            $("#payOtherButtonId").click(function(){
                window.location.href = window.location.origin + window.location.pathname + "?payment=other";
            });

            $("#payLaterButtonId").click(function(){
                window.location.href = window.location.origin + window.location.pathname + "?payment=later";
            });

            $("#backButtonId").click(function(){
                window.location.href = window.location.origin + window.location.pathname;
            });

            $("#payTransferButtonId").click(function(){
                let orderNumber = LS.order.number;
                let text = "Mi n\u00famero de compra es la " + orderNumber + ". Quiero los datos para realizar transferencia."
                let encodedText = encodeURIComponent(text);
                let whatsAppLink = "https://wa.me/59899203412?text=" + encodedText;

                window.open(whatsAppLink, "_blank");
                window.location.href = window.location.origin + window.location.pathname + "?payment=later";
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
        });
        } else {
        myAppJavaScript(jQuery);
        }

    })();