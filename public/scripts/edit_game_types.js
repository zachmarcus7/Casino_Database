/********************************************
* Function for sending an XMLHTTP request to Game Types 
* page. Used for Deleting/Updating rows in MYSQL. 
*********************************************/


let flip = "flip3";
let port = 43029;
let page = "/Edit_Game_types";


/* Function for sending a get request to the Edit Game Types Page
 * Input:   type_ID ; value that gets sent attached with handlebars 
 * Output:  n/a
*/
function deleteButton(type_ID){
        let callType = "delete";
        let game_type_ID = "&game_type_ID=" + type_ID;

        let req = new XMLHttpRequest();
        let url = "http://" + flip + ".engr.oregonstate.edu:" + port + page + "/?callType=" + callType + game_type_ID;
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
};


/* Function used to allow the update button to link to the update page
 * Input:   n/a
 * Output:  n/a
*/
function goToUpdate(){
    let link = document.getElementById("update_link");
    link.click();
}

