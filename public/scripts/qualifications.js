/********************************************
* Function for sending an XMLHTTP request to Qualifications 
* page. Provides data for an insert query for the MYSQL
* server.
*********************************************/


document.addEventListener('DOMContentLoaded', bindAndBuild);

let flip = "flip3";
let port = 43029;
let page = "/Qualifications";


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
    let buttonType = "addQualification";
    let obj = document.getElementById(buttonType);
    obj.addEventListener("click", function(event){
        let callType = "add";
        let qualification_name = "";
        let qualification_difficulty = "";
        if (document.getElementById("qualification_name").value && document.getElementById("qualification_difficulty").value){
            qualification_name = "&qualification_name=" + document.getElementById("qualification_name").value;
            qualification_difficulty = "&qualification_difficulty=" + document.getElementById("qualification_difficulty").value;
        }
        let req = new XMLHttpRequest();
        let url = "http://" + flip + ".engr.oregonstate.edu:" + port + page + "/?callType=" + callType + qualification_name + qualification_difficulty;
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
