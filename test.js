

  var dave = document.createElement("h1");
  dave.innerHTML = "hello";
  document.body.append(dave)
  dave.style.color = "blue";
  var butt = document.createElement("BUTTON");
  butt.setAttribute("id","demo");


  document.body.append(butt);
  document.getElementById("demo").onclick = function() {func()};

  function func(){
    dave.setAttribute("color","red")
  }