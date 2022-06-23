/********************************************
* Function for sending an XMLHTTP request to Games 
* page. Provides data for an insert query for the MYSQL
* server.
*********************************************/


document.addEventListener('DOMContentLoaded', addButton);

let flip = "flip3";
let port = 43029;
let page = "/Games";


/* Function for sending a get request to the Games Types Page
 * Input:   n/a
 * Output:  n/a
*/
function addButton(){
    let obj = document.getElementById("addGame");
    obj.addEventListener("click", function(event){

        let callType = "add";
        let amount_earned = "";
        let game_type = "";
        let players_total ="";
        let date = "";
        let table_ID = "";
        let dealer_ID = "";
        if (document.getElementById("amount_earned").value &&
            document.getElementById("type").value &&
            document.getElementById("players_total").value &&
            document.getElementById("date").value &&
            document.getElementById("table_id").value &&
            document.getElementById("dealer_id").value){
            amount_earned = "&amount_earned=" + document.getElementById("amount_earned").value;
            game_type = "&game_type=" + document.getElementById("type").value;
            players_total = "&players_total=" + document.getElementById("players_total").value;
            date = "&date=" + document.getElementById("date").value;
            table_ID = "&table_ID=" + document.getElementById("table_id").value;
            dealer_ID = "&dealer_ID=" + document.getElementById("dealer_id").value;
        }

        let req = new XMLHttpRequest();
        let url = "http://" + flip + ".engr.oregonstate.edu:" + port + page + "/?callType=" + callType + amount_earned + game_type + players_total + date + table_ID + dealer_ID;
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
