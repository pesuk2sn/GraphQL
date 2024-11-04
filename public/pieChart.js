$(document).ready(function(){
    //-------------------------------------
    var example={ //set parameters for pie chart
    $id: "pie1", //set id of <svg> containning pie
    radius: 150, //set radius of pie
    segments: [ 
      {value: 5, color: "rgb(255, 0, 0)"},
      {value: 4, color: "DarkBlue"},
      {value: 2, color: "#0b0"},
      {value: 3, color: "#f8bb00"}
    ]
    };
    pie(example);
})

function pie(data){
    // set size of <svg> element
    $('#'+data.$id).attr("width", 2*data.radius);
    $('#'+data.$id).attr("height", 2*data.radius);
    // calculate sum of values
    var sum=0;
    var radius=data.radius;
    for(var e=0; e<data.segments.length; e++){
      sum+=data.segments[e].value;
    }
    // generate proportional pie for all segments
    var startAngle=0, endAngle=0;
    for(var i=0; i<data.segments.length; i++){
      var element=data.segments[i];
      var angle=element.value * 2 * Math.PI / sum;
      endAngle+=angle;
      var svgLine=makeSVG('line',{x1: radius, y1: radius, x2: (Math.cos(endAngle)*radius+radius), y2: (Math.sin(endAngle)*radius+radius), stroke: element.color});    
      $('#'+data.$id).append(svgLine);
      var pathStr=
          "M "+(radius)+","+(radius)+" "+
          "L "+(Math.cos(startAngle)*radius+radius)+","+
               (Math.sin(startAngle)*radius+radius)+" "+
          "A "+(radius)+","+(radius)+
               " 0 "+(angle<Math.PI?"0":"1")+" 1 "+
               (Math.cos(endAngle)*radius+radius)+","+
               (Math.sin(endAngle)*radius+radius)+" "+
          "Z";
      var svgPath=makeSVG('path',{d: pathStr, fill: element.color});
      $('#'+data.$id).append(svgPath);
      startAngle+=angle;
    }
  };
  
  // SVG Maker - to draw SVG by script
  function makeSVG(tag, attrs) {
    var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
      el.setAttribute(k, attrs[k]);
    return el;
  } //SVG Maker
  