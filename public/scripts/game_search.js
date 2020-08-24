/********************************************
* Function for sending an XMLHTTP request to Game Types 
* page. Used for Updating rows in MYSQL. 
*********************************************/


let flip = "flip3";
let port = 43029;
let page = "/Game_search";


/* Function for sending a get request to the Game Search page
 * Input:   n/a 
 * Output:  n/a
*/
function searchButton(){

        //initialize variables to concatenate onto get request query string
        let callType = "";
        let name = "";

        //check which search option is selected
        if (document.getElementById("game_type").checked){
            callType = "game_type";
            if (document.getElementById("game_type_text").value){
                name = "&name=" + document.getElementById("game_type_text").value;
            }
        } else if (document.getElementById("table_id").checked){
            callType = "table_id";
            if (document.getElementById("table_id_text").value){
                name = "&name=" + document.getElementById("table_id_text").value;
            }
        } else if (document.getElementById("last_name").value){
            callType = "last_name";
            if (document.getElementById("last_name_text").value){
                name = "&name=" + document.getElementById("last_name_text").value;
            }
        }


        let url = "http://" + flip + ".engr.oregonstate.edu:" + port + page + "/?callType=" + callType + name;

        //click the button
        let link = document.getElementById("search_link");
        link.setAttribute("href", url);
        link.click();

};


