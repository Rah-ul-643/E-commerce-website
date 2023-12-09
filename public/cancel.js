const id= document.getElementById("countdown-value");

const countDown= ()=>{
    let count=4;

    const interval= setInterval(()=>{
        id.innerHTML=count;
        count--;

        if (count<0){
            console.log("Timeout");
            clearInterval(interval);
            location.href='/';
        }
    }, 1000);
}

window.addEventListener('load',function() {countDown() } );