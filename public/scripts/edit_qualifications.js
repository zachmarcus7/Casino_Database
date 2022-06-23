/********************************************
* Function for sending an XMLHTTP request to Edit Qualifications 
* page. Provides data for an insert query for the MYSQL
* server.
*********************************************/


document.addEventListener('DOMContentLoaded', bindAndBuild);

let flip = "flip3";
let port = 43029;
let page = "/Edit_Qualifications";
let redirect = "/Update_Qualifications";


/* Initiating the binding functions
 * Input:   n/a
 * Output:  n/a
 */
function bindAndBuild(){
    addButton();
    deleteButtons();
    updateButtons();
};


/* Binding Add button and setting up ajax call.  Reloads page on success
 * Input:   n/a
 * Output:  n/a
 */
function addButton(){
    let buttonType = "addButton";
    let obj = document.getElementById(buttonType);
    obj.addEventListener("click", function(event){
        let callType = "add";
        let dealer_ID = "";
        let qualification_ID = "";
        if (document.getElementById("dealer_ID").value && document.getElementById("qualification_ID").value){
            dealer_ID = "&dealer_ID=" + document.getElementById("dealer_ID").value;
            qualification_ID = "&qualification_ID=" + document.getElementById("qualification_ID").value;
        }
        let req = new XMLHttpRequest();
        let url = "http://" + flip + ".engr.oregonstate.edu:" + port + page + "/?callType=" + callType + dealer_ID + qualification_ID;
        req.open("GET", url);
        req.addEventListener("load",function(){
            if(req.status >= 200 && req.status < 400){
                window.location.reload();
            } else {
                console.log("Error in network request: " + req.statusText);
            }});
        req.send(null);
        event.preventDefault();
    });
};


/* Binding Delete button and setting up ajax call.  Reloads page on success
 * Input:   n/a
 * Output:  n/a
 */
function deleteButtons(){
    let buttonType = "deleteButton";
    let buttons = document.getElementsByClassName(buttonType);
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", function(event){
            let callType = "del";
            let dealer_ID = "";
            let qualification_ID = "";
            dealer_ID = "&dealer_ID=" + buttons[i].value;
            qualification_ID = "&qualification_ID=" + buttons[i].id;
            let req = new XMLHttpRequest();
            let url = "http://" + flip + ".engr.oregonstate.edu:" + port + page + "/?callType=" + callType + dealer_ID + qualification_ID;
            req.open("GET", url);
            req.addEventListener("load",function(){
                if(req.status >= 200 && req.status < 400){
                    window.location.reload();
                } else {
                    console.log("Error in network request: " + req.statusText);
                }});
            req.send(null);
            event.preventDefault();
        });
    };
};


/* Binding Update button.  Redirects page on success
 * Input:   n/a
 * Output:  n/a
 */
function updateButtons(){
    let buttonType = "updateButton";
    let buttons = document.getElementsByClassName(buttonType);
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", function(event){
            location.href = redirect + "/?dealer_ID=" + buttons[i].value + "&qualification_ID=" + buttons[i].id;
        });
    };
};
