/********************************************
* Function for sending an XMLHTTP request to Dealer Search 
* page. Provides data for an insert query for the MYSQL
* server.
*********************************************/


document.addEventListener('DOMContentLoaded', bindAndBuild);

let flip = "flip3";
let port = 43029;
let page = "/Dealer_Search";


/* Initiating the binding functions
 * Input:   n/a
 * Output:  n/a
 */
function bindAndBuild(){
    searchButton();
    resetButton();
};


/* Bind Reset button and setup reload
 * Input:   n/a
 * Output:  n/a
 */
function resetButton(){
    let buttonType = "resetDealers";
    let obj = document.getElementById(buttonType);
    obj.addEventListener("click", function(event){
        window.location.reload();
    });
}


/* Bind search button and setup ajax calls
 * Input:   n/a
 * Output:  n/a
 */
function searchButton(){
    let buttonType = "searchDealers";
    let obj = document.getElementById(buttonType);
    obj.addEventListener("click", function(event){

        let callType = "search";
        let first = "";
        let second = "";
        let third = "";
        let fourth = "";
        let fifth = "";
        let logic = ["&l=0", "&l=0", "&l=0", "&l=0"];

        // check if the forms aren't empty
        if (document.getElementById("first_p").value || document.getElementById("second_p").value
            || document.getElementById("third_p").value || document.getElementById("fourth_p").value
            || document.getElementById("fifth_p").value){
            first = "&first=" + document.getElementById("first_p").value + "&col0=" + document.getElementById("col0").value;
            second = "&second=" + document.getElementById("second_p").value + "&col1=" + document.getElementById("col1").value;
            third = "&third=" + document.getElementById("third_p").value + "&col2=" + document.getElementById("col2").value;
            fourth = "&fourth=" + document.getElementById("fourth_p").value + "&col3=" + document.getElementById("col3").value;
            fifth = "&fifth=" + document.getElementById("fifth_p").value + "&col4=" + document.getElementById("col4").value;

            for (let i = 0; i < logic.length; i++){
                if (document.getElementById("l" + i + "a").checked){ logic[i] = "&l" + i + "=" + document.getElementById("l" + i + "a").value; }
                else if (document.getElementById("l" + i + "o").checked){ logic[i] = "&l" + i + "=" +  document.getElementById("l" + i + "o").value; }
                else if (document.getElementById("l" + i + "n").checked){ logic[i] = "&l" + i + "=AND " +  document.getElementById("l" + i + "n").value; }
            }
        }

        // create a new request with the pulled data
        let req = new XMLHttpRequest();
        let url = "http://" + flip + ".engr.oregonstate.edu:" + port + page + "/?callType=" + callType + first + logic[0] + second + logic[1] + third + logic[2] + fourth + logic[3] + fifth;
        req.open("GET", url);
        req.addEventListener("load",function(){
            if(req.status >= 200 && req.status < 400){
                let response = JSON.parse(req.responseText);
                buildTable(response);
            } else {
                console.log("Error in network request: " + req.statusText);
            }});
        req.send(null);
        event.preventDefault();
    });
};


/* Builds table of results or outputs an error message
 * Input:   content ; JSON string of search results
 * Output:  n/a
 */
function buildTable(content){
    let len = content.length;
    let cellType;
    let cellText;
    mainTable = document.getElementById("tableBody");

    // get rid of current table
    curRows = mainTable.getElementsByTagName("tr");
    curLen = curRows.length;
    for (let i = curLen-1; i >= 0; i--){
        mainTable.removeChild(curRows[i]);
    };

    // build new table
    if (len > 0){
        for (let i = 0; i < len; i++){
            let newRow = document.createElement("tr");
            mainTable.appendChild(newRow);
            let newCell;
            newCell = document.createElement("td");
            newCell.textContent = content[i].dealer_ID;
            newRow.appendChild(newCell);
            newCell = document.createElement("td");
            newCell.textContent = content[i].dealer_fname;
            newRow.appendChild(newCell);
            newCell = document.createElement("td");
            newCell.textContent = content[i].dealer_lname;
            newRow.appendChild(newCell);
            newCell = document.createElement("td");
            newCell.textContent = content[i].dealer_age;
            newRow.appendChild(newCell);
            newCell = document.createElement("td");
            newCell.textContent = content[i].supervisor_fname + " ";
            newCell.textContent += content[i].supervisor_lname;
            newRow.appendChild(newCell);
            newCell = document.createElement("td");
            newCell.textContent = content[i].supervisor_ID;
            newRow.appendChild(newCell);
        }
    } else {
        // error message on failed search
        alert("No match found or error in search parameters!");
    }
};


