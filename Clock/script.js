const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');


function setDate() {
    const now = new Date();
    const seconds = now.getSeconds();
    const mins = now.getMinutes();
    const hours = now.getHours();
    
    // converting seconds into a degree to manipulate on the clock
    // Added 90 because initial position was rotated 90 degree
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    console.log(seconds);
    
    const minDegrees = ((mins / 60) * 360) + 90;
    minHand.style.transform = `rotate(${minDegrees}deg)`;
    
    const hoursDegrees = ((hours / 12) * 360) + 90;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    
    
    
}

setInterval(setDate, 1000);