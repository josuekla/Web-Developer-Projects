function whosPaying(names) {
    
/******Don't change the code above*******/
    
    //Write your code here.

    var listNames = names.length;
    var numberRandow = Math.floor(Math.random() * listNames);


    return names[numberRandow] + " is going to buy lunch today!";
    
    
    


/******Don't change the code below*******/    
}

a = whosPaying(["Angela", "Ben", "Jenny", "Michael", "Chloe"])
console.log(a)