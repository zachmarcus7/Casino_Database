/********************************************
* Function for sending an XMLHTTP request to the Dealers 
* page. Provides data for an insert query for the MYSQL
* server.
*********************************************/


document.addEventListener('DOMContentLoaded', bindAndBuild);

let flip = "flip3";
let port = 43029;
let page = "/Dealers";


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
    let buttonType = "addDealer";
    let obj = document.getElementById(buttonType);
    obj.addEventListener("click", function(event){
        let callType = "add";
        let dealer_fname = "";
        let dealer_lname = "";
        let dealer_age = "";
        let supervisor = "";
        let qualification_id = "";

        // check if the forms aren't empty
        if (document.getElementById("dealer_fname").value && document.getElementById("dealer_lname").value
            && document.getElementById("dealer_age").value && document.getElementById("supervisor").value){
            dealer_fname = "&dealer_fname=" + document.getElementById("dealer_fname").value;
            dealer_lname = "&dealer_lname=" + document.getElementById("dealer_lname").value;
            dealer_age = "&dealer_age=" + document.getElementById("dealer_age").value;
            supervisor = "&supervisor=" + document.getElementById("supervisor").value;
            qualification_id = "&qualification_ID=" + document.getElementById("qualification_ID").value;
        }

        // create new request with pulled data
        let req = new XMLHttpRequest();
        let url = "http://" + flip + ".engr.oregonstate.edu:" + port + page + "/?callType=" + callType + dealer_fname + dealer_lname + dealer_age + supervisor + qualification_id;
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
