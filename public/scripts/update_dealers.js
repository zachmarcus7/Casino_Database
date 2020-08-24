/********************************************
* Function for sending an XMLHTTP request to Update Dealers 
* page. Provides data for an insert query for the MYSQL
* server.
*********************************************/


document.addEventListener('DOMContentLoaded', bindAndBuild);

let flip = "flip3";
let port = 43029;
let page = "/Update_Dealers";
let redirect = "/Edit_Dealers";


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
        let dealer_fname = "";
        let dealer_lname = "";
        let dealer_age = "";
        let supervisor = "";
        if (document.getElementById("dealer_fname").value && document.getElementById("dealer_lname").value
            && document.getElementById("dealer_age").value && document.getElementById("supervisor").value){
            dealer_ID = "&dealer_ID=" + document.getElementById(buttonType).value;
            dealer_fname = "&dealer_fname=" + document.getElementById("dealer_fname").value;
            dealer_lname = "&dealer_lname=" + document.getElementById("dealer_lname").value;
            dealer_age = "&dealer_age=" + document.getElementById("dealer_age").value;
            supervisor = "&supervisor=" + document.getElementById("supervisor").value;
        }
        let req = new XMLHttpRequest();
        let url = "http://" + flip + ".engr.oregonstate.edu:" + port + page + "/?callType=" + callType + dealer_ID + dealer_fname + dealer_lname + dealer_age + supervisor;
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
