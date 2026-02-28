function fibonacciGenerator (n) {
//Do NOT change any of the code above 👆
    
    //Write your code here:
    var myList = []
    for(var i = 0; i < n; i++){
        if(i > 1){
            var a = myList[i - 1] + myList[i - 2]
            myList.push(a)
        }
        else{
            myList.push(i)
        }
        
        
        
    }
    
    return myList
    

    //Return an array of fibonacci numbers starting from 0.
    
//Do NOT change any of the code below 👇
}

var a = fibonacciGenerator(3);
console.log(a)
