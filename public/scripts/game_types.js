/********************************************
* Function for sending an XMLHTTP request to Game Types 
* page. Provides data for an insert query for the MYSQL
* server.
*********************************************/


document.addEventListener('DOMContentLoaded', addButton);

let flip = "flip3";
let port = 43029;
let page = "/Game_types";


/* Function for sending a get request to the Game Types Page
 * Input:   n/a
 * Output:  n/a
*/
function addButton(){
    let obj = document.getElementById("add_game_type");
    obj.addEventListener("click", function(event){

        let callType = "add";
        let name = "";
        let description = "";
        if (document.getElementById("name").value && document.getElementById("description").value){
            name = "&name=" + document.getElementById("name").value;
            description = "&description=" + document.getElementById("description").value;
        }

        let req = new XMLHttpRequest();
        let url = "http://" + flip + ".engr.oregonstate.edu:" + port + page + "/?callType=" + callType + name + description;
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
