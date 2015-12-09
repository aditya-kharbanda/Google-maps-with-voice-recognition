var map_obj=(function(){


  function mapInit() {
  var searchstring = $('#searchfield');
    
    getMap(searchstring.val());
   }

function getMap(add){   //function to get the location according to address (add) in the center of the map

 $.ajax({
   url: "http://maps.googleapis.com/maps/api/geocode/json?address="+add+"\"", 
     type:"GET",
      success:function(data,status,xhr)
      {
      	console.log(status);
      	var latti=data.results[0].geometry.location.lat;
      	var longi=data.results[0].geometry.location.lng;
      	var level=data.results[0].types[0];
        var zooming_level;
        var setCenter = new google.maps.LatLng(latti,longi);
        if(level==="sublocality_level_1")         // setting various zooming levels according to regions
        zooming_level=15;
      else if(level==="administrative_area_level_1")
      zooming_level=7;
      else if(level==="administrative_area_level_2")
        zooming_level=12;
      else if(level==="country")
        zooming_level=4;
      else if(level==="locality")
        zooming_level=14;
      else if(level==="continent")
        zooming_level=3;
      else
        zooming_level=18; 
       
  var mapProp = {    // setting map properties
     center:setCenter,
     zoom:zooming_level,
     mapTypeId:google.maps.MapTypeId.ROADMAP
    };
  
  var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);

  var marker = new google.maps.Marker({
  position:setCenter,
  animation:google.maps.Animation.BOUNCE
  });

 marker.setMap(map); //setting marker at the centre of the location
 }});



}

function already()    //function to set the default map
{
  $.ajax({
  url: "http://maps.googleapis.com/maps/api/geocode/json?address=delhi", 
   type:"GET",
      success:function(data,status,xhr)
      {
        console.log(status);
        var latti=data.results[0].geometry.location.lat;
        var longi=data.results[0].geometry.location.lng;
        var setCenter = new google.maps.LatLng(latti,longi);
  var mapProp = {
    center:setCenter,
    zoom:10,
     
      
      mapTypeId:google.maps.MapTypeId.ROADMAP
      };
  
  var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
  }});
}


function usingAnnyang(term)    //using annyang library for voice recognition
{
  getMap(term);
}

return{
  mapInit:mapInit,
  already:already,
  voiceURL:usingAnnyang

};

})();