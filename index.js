let count = 0
if (count <0){
    count = 0
}

document.getElementById("increaseButton").onclick = function(){
    count++
    document.getElementById("countLabel").innerHTML = (count)
}
document.getElementById("decreaseButton").onclick = function(){
    count--
    document.getElementById("countLabel").innerHTML = (count)
}
document.getElementById("reset").onclick = function(){
    count=0
    document.getElementById("countLabel").innerHTML = (count)
}