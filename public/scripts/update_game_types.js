/********************************************
* Function for sending an XMLHTTP request to Game Types 
* page. Used for Updating rows in MYSQL. 
*********************************************/


let flip = "flip3";
let port = 43029;
let page = "/Update_Game_types";


/* Function for sending a get request to the Update Games Types Page
 * Input:   n/a
 * Output:  n/a
*/
function updateButton(type_ID){
        let callType = "update";
        let game_type_ID = "&game_type_ID=" + type_ID;
        let name="";
        let description = "";

        if (document.getElementById("name").value && document.getElementById("description").value){
            name = "&name=" + document.getElementById("name").value;
            description = "&description=" + document.getElementById("description").value;
        }

        let req = new XMLHttpRequest();
        let url = "http://" + flip + ".engr.oregonstate.edu:" + port + page + "/?callType=" + callType + game_type_ID + name + description;
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

        //go back to edit page
        let back_link = document.getElementById("back_link");
        back_link.click();
};


