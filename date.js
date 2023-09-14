module.exports=getdate;
function getdate(){
    const today = new Date();
const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
}
const date = today.toLocaleDateString("en-us", options);
return date;
}