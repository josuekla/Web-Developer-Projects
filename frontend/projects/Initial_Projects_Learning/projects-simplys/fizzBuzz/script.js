function FizzBuzz(){
    var listNumbers = []
    for (var i = 1; i < 101; i++){

    if(i % 3 === 0 && i % 5 === 0){
        listNumbers.push("FizzBuzz")
    }

    else if(i % 3 === 0){
        listNumbers.push("Fizz");
        
    }
    else if(i % 5 === 0){
        listNumbers.push("Buzz");
    }
    else{
        listNumbers.push(i)
        
    }
}
return listNumbers
}

function renderFizzBuzz(){
    const ulElement = document.getElementById("game-list");
    ulElement.innerHTML = ""
    const list = FizzBuzz();

    list.forEach (item => {
        const li = document.createElement("li");
        li.textContent = item;
        ulElement.appendChild(li);
    });
}

document.getElementById('start-game').addEventListener('click', renderFizzBuzz)