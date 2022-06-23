/********************************************
* Function for sending an XMLHTTP request to Update Supervisors 
* page. Provides data for an insert query for the MYSQL
* server.
*********************************************/


document.addEventListener('DOMContentLoaded', bindAndBuild);

let flip = "flip3";
let port = 43029;
let page = "/Update_Supervisors";
let redirect = "/Edit_Supervisors";


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
        let supervisor_fname = "";
        let supervisor_lname = "";
        if (document.getElementById("supervisor_fname").value && document.getElementById("supervisor_lname").value){
            supervisor_ID = "&supervisor_ID=" + document.getElementById(buttonType).value;
            supervisor_fname = "&supervisor_fname=" + document.getElementById("supervisor_fname").value;
            supervisor_lname = "&supervisor_lname=" + document.getElementById("supervisor_lname").value;
        }
        let req = new XMLHttpRequest();
        let url = "http://" + flip + ".engr.oregonstate.edu:" + port + page + "/?callType=" + callType + supervisor_ID + supervisor_fname + supervisor_lname;
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
