function imgRandow(){
    var randow_number1 = Math.floor(Math.random() * 5) + 1
    var randow_number2 = Math.floor(Math.random() * 5) + 1
    var images_variables1 = `./images/dice${randow_number1}.png`
    var images_variables2 = `./images/dice${randow_number2}.png`
    document.querySelector('.img1').setAttribute('src', images_variables1)
    document.querySelector('.img2').setAttribute('src', images_variables2)

    if(randow_number1 === randow_number2){
        document.querySelector('h1').textContent = 'Dram!'
    }
    else if (randow_number1 > randow_number2){
        document.querySelector('h1').textContent = '🚩Player1 Wins!'
    }
    else{
        document.querySelector('h1').textContent = '🚩Player2 Wins!'
    }
}

imgRandow()