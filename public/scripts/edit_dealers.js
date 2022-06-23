/********************************************
* Function for sending an XMLHTTP request to Edit Dealers 
* page. Provides data for an insert query for the MYSQL
* server.
*********************************************/


document.addEventListener('DOMContentLoaded', bindAndBuild);

let flip = "flip3";
let port = 43029;
let page = "/Edit_Dealers";
let redirect = "/Update_Dealers";


/* Initiating the binding functions
 * Input:   n/a
 * Output:  n/a
 */
function bindAndBuild(){
    deleteButtons();
    updateButtons();
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
            dealer_ID = "&dealer_ID=" + buttons[i].value;
            let req = new XMLHttpRequest();
            let url = "http://" + flip + ".engr.oregonstate.edu:" + port + page + "/?callType=" + callType + dealer_ID;
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
            location.href = redirect + "/?dealer_ID=" + buttons[i].value;
        });
    };
};
