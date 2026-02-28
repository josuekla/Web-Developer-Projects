function lifeInWeeks(age) {
    
/************Don't change the code above************/    
    
    //Write your code here. 
    monthsLeft = 90 * 12 - age * 12;
    weeksLeft = (90 * 52) - (age * 52);
    daysLeft = (90 * 365) -  (age * 365 );

    console.log(`You have ${daysLeft} days, ${weeksLeft} weeks, and ${monthsLeft} months left.`);
    
    
    
    
/*************Don't change the code below**********/
}

lifeInWeeks(19)