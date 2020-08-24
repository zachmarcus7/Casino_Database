/********************************************
* Function for sending an XMLHTTP request to Update Qualifications
* page. Provides data for an insert query for the MYSQL
* server.
*********************************************/


document.addEventListener('DOMContentLoaded', bindAndBuild);

let flip = "flip3";
let port = 43029;
let page = "/Update_Qualifications";
let redirect = "/Edit_Qualifications";


/* Initiating the binding functions
 * Input:   n/a
 * Output:  n/a
 */
function bindAndBuild(){
    updateButton();
    cancelButton();
};


/* Binding Update button.  Redirects page on success
 * Input:   n/a
 * Output:  n/a
 */
function updateButton(){
    let buttonType = "updateButton";
    let obj = document.getElementById(buttonType);
    obj.addEventListener("click", function(event){
        let callType = "update";
        let dealer_ID = "";
        let qualification_old = "";
        let qualification_new = "";
        if (document.getElementById("qualification").value){
            dealer_ID = "&dealer_ID=" + document.getElementById(buttonType).value;
            qualification_old = "&qualification_old=" + document.getElementById("cancelButton").value;
            qualification_new = "&qualification_new=" + document.getElementById("qualification").value;
        }
        let req = new XMLHttpRequest();
        let url = "http://" + flip + ".engr.oregonstate.edu:" + port + page + "/?callType=" + callType + dealer_ID + qualification_old + qualification_new;
        req.open("GET", url);
        req.addEventListener("load",function(){
            if(req.status >= 200 && req.status < 400){
                location.href = redirect;
            } else {
                console.log("Error in network request: " + req.statusText);
            }});
        req.send(null);
        event.preventDefault();
    });
};


/* Binding Cancel button.  Redirects page on Press.
 * Input:   n/a
 * Output:  n/a
 */
function cancelButton(){
    let buttonType = "cancelButton";
    let button = document.getElementById(buttonType);
    button.addEventListener("click", function(event){
        location.href = redirect;
    });
};
