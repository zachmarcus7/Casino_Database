/********************************************
* Function for sending an XMLHTTP request to Tables 
* page. Provides data for an insert query for the MYSQL
* server.
*********************************************/


document.addEventListener('DOMContentLoaded', addButton);

let flip = "flip3";
let port = 43029;
let page = "/Tables";


/* Function for sending a get request to the Tables Page
 * Input:   n/a
 * Output:  n/a
*/
function addButton(){
    let obj = document.getElementById("addTable");
    obj.addEventListener("click", function(event){

        let callType = "add";
        let floor = "";
        if (document.getElementById("floor").value){
            floor = "&floor=" + document.getElementById("floor").value;
        }

        let req = new XMLHttpRequest();
        let url = "http://" + flip + ".engr.oregonstate.edu:" + port + page + "/?callType=" + callType + floor;
        req.open("GET", url);
        req.addEventListener("load",function(){
            if(req.status >= 200 && req.status < 400){
                window.location.reload();
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });
        req.send(null);
        event.preventDefault();
    });
};
