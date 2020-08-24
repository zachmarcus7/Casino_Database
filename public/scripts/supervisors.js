/********************************************
* Function for sending an XMLHTTP request to Supervisors 
* page. Provides data for an insert query for the MYSQL
* server.
*********************************************/


document.addEventListener('DOMContentLoaded', bindAndBuild);

let flip = "flip3";
let port = 43029;
let page = "/Supervisors";


/* Initiating the binding functions
 * Input:   n/a
 * Output:  n/a
 */
function bindAndBuild(){
    addButton();
};


/* Bind Add button and setup ajax calls
 * Input:   n/a
 * Output:  n/a
 */
function addButton(){
    let buttonType = "addSupervisor";
    let obj = document.getElementById(buttonType);
    obj.addEventListener("click", function(event){
        let callType = "add";
        let supervisor_fname = "";
        let supervisor_lname = "";
        if (document.getElementById("supervisor_fname").value && document.getElementById("supervisor_lname").value){
            supervisor_fname = "&supervisor_fname=" + document.getElementById("supervisor_fname").value;
            supervisor_lname = "&supervisor_lname=" + document.getElementById("supervisor_lname").value;
        }
        let req = new XMLHttpRequest();
        let url = "http://" + flip + ".engr.oregonstate.edu:" + port + page + "/?callType=" + callType + supervisor_fname + supervisor_lname;
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
