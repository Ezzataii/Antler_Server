var l;
console.log("Hello world");
postDisplays();
postAds();




$(document).ready(function(){
    console.log($("#fileToUpload").value);
    $.get("../../../home/Desktop/server/content/display1/image1.png", function( l ) {
        console.log(l);
        
    
    });
});

function refresh() {
    postAds();
    postDisplays()
}

function postDisplays() {
    console.log("clicked");
    $("#Displaylist").empty(); 
    $.get("http://51.77.192.7:8080/GET/DISPLAY", function( l ) {
        console.log(l);
        

    for (var i = 0; i<l.length; i++){
        var list = document.getElementById("Displaylist");

        var div = document.createElement("DIV");
        div.className = "DisplayItem";
        div.id = "display" + l[i].deviceName;
        
        var input_add = document.createElement("input");
        input_add.setAttribute("type","checkbox");
        input_add.setAttribute("name","DisplayBox");
        input_add.setAttribute("id",l[i].id);

        var label_add = document.createElement("label");
        label_add.innerHTML = l[i].deviceName  + " | " + l[i].hostName + " | " + l[i].site;

        var break_add = document.createElement("br");

        list.appendChild(div);
        div.appendChild(input_add);
        div.appendChild(label_add);
        div.appendChild(break_add);
    }
});
}

function postAds() {
    $("#Adlist").empty(); 
    $.get("http://51.77.192.7:8080/GET/ADS", function( l ) {
    for(var i=0;i<l.length;i++){
        var list=document.getElementById("Adlist");

        var div = document.createElement("DIV");
        div.className = "AdItem";

        var input_add = document.createElement("input");
        input_add.setAttribute("type","checkbox");
        input_add.setAttribute("name","AdBox");

        var label_add = document.createElement("label");
        label_add.innerHTML = l[i].name;

        var break_add = document.createElement("br");

        list.appendChild(div);
        div.appendChild(input_add);
        div.appendChild(label_add);
        div.appendChild(break_add);
    }
    })
}

$(function() {
    $('#myform').on("submit",function(e) {
      e.preventDefault(); // cancel the actual submit
      var formData = new FormData(this);
      $.ajax({
        url: 'http://51.77.192.7:8080/IMAGE',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response){
            if(response != 0){
                $("#img").attr("src",response); 
                $(".preview img").show(); // Display image element
            }else{
                alert('file not uploaded');
            }
        },
    });
    });
  });


