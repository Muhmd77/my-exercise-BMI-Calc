let $ = document,
    menuLinks = $.querySelectorAll('.nav-menu__link'),
    weightInput = $.querySelector('.weight'),
    heightInput = $.querySelector('.height'),
    bmiCalcBtn = $.getElementById('bmi-calc'),
    bmiFinalNumber = $.querySelector('.bmi-resul__final'),
    bmiFinalNote = $.querySelector('.bmi-result__note'),
    underWeightCircle = $.querySelector('.underweight'),
    normalWeightCircle = $.querySelector('.normal'),
    overWeightCircle = $.querySelector('.overweight'),
    obesityWeightCircle = $.querySelector('.obesity'),
    alertElem = $.querySelector('.alert'),
    alertTextElem = $.querySelector('.alert__text'),
    productItem = [
        { id: 1, name: "Bulking pills", src: "./assets/src/img/product%201.webp" , price : '<p> <span>30$</span> | 28$ </p>'},
        { id: 2, name: "Bulking pills", src: "./assets/src/img/product%201.webp" , price : '<p> <span>30$</span> | 28$ </p>'},
        { id: 3, name: "Bulking pills", src: "./assets/src/img/product%201.webp" , price : '<p> <span>30$</span> | 28$ </p>'},
        { id: 4, name: "Arginine", src: "./assets/src/img/product%202.webp" , price : '<p> <span>70$</span> | 58$ </p>'},
        { id: 5, name: "Arginine", src: "./assets/src/img/product%202.webp" , price : '<p> <span>70$</span> | 58$ </p>'},
        { id: 6, name: "Arginine", src: "./assets/src/img/product%202.webp" , price : '<p> <span>70$</span> | 58$ </p>'},
        { id: 7, name: "appetite suppressant", src: "./assets/src/img/product%203.webp" , price : '<p> <span>50$</span> | 38$ </p>'},
        { id: 8, name: "appetite suppressant", src: "./assets/src/img/product%203.webp" , price : '<p> <span>100$</span> | 38$ </p>'},
        { id: 9, name: "appetite suppressant", src: "./assets/src/img/product%203.webp" , price : '<p> <span>50$</span> | 38$ </p>'},
    ],
    productImage = $.querySelectorAll('.product-card__img'),
    productPrice = $.querySelectorAll('.product-card__price p'),
    productTitle = $.querySelectorAll('.product-card__title'),
    paginationContainer = $.querySelector('.product__paginations'),
    currentPage = 1,
    rowsCount = 3,
    hourElem = $.querySelector('.hour'),
    minuteElem = $.querySelector('.minute'),
    secondElem = $.querySelector('.second'),
    sliderImgArray = [
        "./assets/src/img/slider1.jpg",
        "./assets/src/img/slider2.jpg",
        "./assets/src/img/slider3.jpg",
        "./assets/src/img/slider4.jpg",
        "./assets/src/img/slider5.jpg",
        "./assets/src/img/slider6.jpg",
    ],
    sliderItemImg = $.querySelector('.slider-item__img'),
    sliderPrevBtn = $.querySelector('.slider-item__prev'),
    sliderNextBtn = $.querySelector('.slider-item__next'),
    imgIndex = 0,
    userNameInput = $.getElementById('user-name'),
    userMessageInput = $.getElementById('user-message'),
    userShareBtn = $.getElementById('user-share'),
    promiseCardsArray = [
        {id: 1, name : 'Muhmd77' , message : 'I Can Improve Myself !', date : '12/30/2022',}
    ],
    promiseContainer = $.querySelector('.promise-cards');

// Display Product Item
function  displayProductItem(productArray, currentPage, rowsCont) {
    let endIndex = currentPage * rowsCount
    let startIndex = endIndex - rowsCount
    let showProduct = productArray.slice(startIndex,endIndex)

    showProduct.forEach(function (product){
        productImage.forEach(function (img){
            img.src = product.src
        })
        productPrice.forEach(function (price){
            price.innerHTML = product.price
        })
        productTitle.forEach(function (title){
            title.innerHTML = product.name
        })
    })
}

// setPagination
function  setPagination(productArray, pageContainer, rowsCont) {
    pageContainer.innerHTML = ''

    let pageCount = Math.ceil(productArray.length / rowsCont)
    for(let i = 1 ; i < pageCount + 1; i++){
        let btn = paginationButtonGenerator(i, productArray)
        pageContainer.appendChild(btn)
    }
}

// pagination Button Generator
function  paginationButtonGenerator(page, productArray) {
    let div = $.createElement('div')
    div.classList.add('product__pagination')
    div.innerHTML = page
    if (page === currentPage) {
        div.classList.add("active");
    }

    div.addEventListener("click", function () {
        console.log('hi')
        currentPage = page;

        displayProductItem(productArray, currentPage, rowsCount);

        let prevPage = document.querySelector(".product__pagination.active");
        prevPage.classList.remove("active");

        div.classList.add("active");
    });
    return div; // because this function is in a for loop is better to return final variable that you want
}

// BMI Function
function calcBmi(event) {
    event.preventDefault()
    let weightInputValue = weightInput.value
    let heightInputValue = heightInput.value
    if (isNaN(weightInputValue) || isNaN(heightInputValue) || weightInputValue === '' || heightInputValue === ''){
        alertElem.style.top = '2rem'
        alertTextElem.innerHTML = 'Please enter a valid number ...'
        setInterval(function (){
            alertElem.style.top = '-10rem'
        },5000)
    } else{
        let heightToMeter = heightInputValue /100
        let bmicalcValue = (weightInputValue / Math.pow(heightToMeter,2)).toFixed(2)
        bmiFinalNumber.innerHTML = bmicalcValue
        weightInput.value = ''
        heightInput.value = ''
        underWeightCircle.style.cssText = 'background-color:transparent ; border: 2px solid #2e8bc0'
        normalWeightCircle.style.cssText = 'background-color:transparent ; border: 2px solid #2e8bc0'
        overWeightCircle.style.cssText = 'background-color:transparent ; border: 2px solid #2e8bc0'
        obesityWeightCircle.style.cssText = 'background-color:transparent ; border: 2px solid #2e8bc0'
        if(bmicalcValue < 18){
            bmiFinalNumber.style.color = '#ffc44d'
            bmiFinalNote.innerHTML = 'your weight is Underweight :('
            underWeightCircle.style.cssText = 'background-color:#ffc44d ; border: 2px solid #ffc44d ;transform: translateY(-1rem);'
        }else if (bmicalcValue >= 18 && bmicalcValue < 24.9){
            bmiFinalNumber.style.color = '#0be881'
            bmiFinalNote.innerHTML = 'your weight is Normal :)'
            normalWeightCircle.style.cssText = 'background-color:#0be881 ; border: 2px solid #0be881 ;transform: translateY(-1rem);'
        } else if (bmicalcValue >= 25 && bmicalcValue < 29.9){
            bmiFinalNumber.style.color = '#ff884d'
            bmiFinalNote.innerHTML = 'your weight is OverWeight :('
            overWeightCircle.style.cssText = 'background-color:#ff884d ; border: 2px solid #ff884d ;transform: translateY(-1rem);'
        } else if (bmicalcValue >= 30 && bmicalcValue < 34.9){
            bmiFinalNumber.style.color = '#AA0DFF'
            bmiFinalNote.innerHTML = 'your weight is ObesityWeight :('
            obesityWeightCircle.style.cssText = 'background-color:#AA0DFF ; border: 2px solid #AA0DFF ;transform: translateY(-1rem);'
        } else{
            bmiFinalNumber.style.color = '#9b9b9b'
            bmiFinalNote.innerHTML = 'You are sooooo fat !!!'
        }
    }

}

// Active Menu Link
menuLinks.forEach(function (menuLink){
    menuLink.addEventListener('click',function (){
        let activeItem = $.querySelector('.active')
        activeItem.classList.remove('active')
        menuLink.classList.add('active')
   })
})

// BMI Calculate Button
bmiCalcBtn.addEventListener('click',calcBmi)

// Clock
function timerFunction(){
    let myDate = new Date()
    let currentHour = myDate.getHours()
    let currentMinute = myDate.getMinutes()
    let currentSecond = myDate.getSeconds()

    if(currentHour < 10){
        currentHour = `0${currentHour}`
    } else if (currentMinute < 10){
        currentMinute = `0${currentMinute}`
    } else if (currentSecond < 10){
        currentSecond = `0${currentSecond}`
    }

    hourElem.innerHTML = currentHour
    minuteElem.innerHTML = currentMinute
    secondElem.innerHTML = currentSecond
}

setInterval(timerFunction,1000)


// Prev & Next Slider Function
function sliderPrev() {
    imgIndex--
    if(imgIndex < 0) {
        imgIndex = sliderImgArray.length - 1
    }
    sliderItemImg.setAttribute("src",sliderImgArray[imgIndex])
}
function sliderNext() {
    imgIndex++
    if(imgIndex > sliderImgArray.length -1){
        imgIndex = 0
    }
    sliderItemImg.setAttribute("src",sliderImgArray[imgIndex])
}

setInterval(sliderNext, 3000)

// Add & Remove & Set & Get Local Storage & Remove Promise Card
function  addUserPromiseCard(event) {
    event.preventDefault()
    if(userNameInput.value === '' || userMessageInput.value === ''){
        alert('Please Fill The Form ...')
    } else{
        let userNameInputValue = userNameInput.value
        let userMessageInputValue = userMessageInput.value
        let newPromiseCard = {
            id: promiseCardsArray.length + 1,
            name : userNameInputValue ,
            message : userMessageInputValue,
            date : `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`,
        }
        promiseCardsArray.push(newPromiseCard)
        setLocalStorage(promiseCardsArray)
        promiseGenerator(promiseCardsArray)
        makeInputEmpty()
    }

}

function setLocalStorage(promiseArray) {
        localStorage.setItem('promise',JSON.stringify(promiseArray))
}

function makeInputEmpty() {
    userNameInput.value = ''
    userMessageInput.value = ''
}

function promiseGenerator(promiseCards) {
    let newCard, newRemove , newUser, newMessage, newTime
    promiseContainer.innerHTML = ''
    promiseCards.forEach(function (promiseCard){
        newCard = $.createElement('div')
        newCard.classList.add('promise-card')

        newUser = $.createElement('h5')
        newUser.classList.add('promise-card__user')
        newUser.innerHTML = `${promiseCard.name} Say : `

        newMessage = $.createElement('p')
        newMessage.classList.add('promise-card__message')
        newMessage.innerHTML = promiseCard.message

        newTime = $.createElement('span')
        newTime.classList.add('promise-card__time')
        newTime.innerHTML = promiseCard.date

        newCard.append(newUser, newMessage, newTime)
        promiseContainer.append(newCard)
    })
}

function  GetLocalStorage() {
    let localStoragePromise = JSON.parse(localStorage.getItem('promise'))
    if(localStoragePromise){
        promiseCardsArray = localStoragePromise
    }
    promiseGenerator(promiseCardsArray)
}



// Product Pagination
displayProductItem(productItem, currentPage, rowsCount)
setPagination(productItem, paginationContainer, rowsCount)




// Prev & Next Slider Btn
sliderPrevBtn.addEventListener('click',sliderPrev)
sliderNextBtn.addEventListener('click',sliderNext)
userShareBtn.addEventListener('click',addUserPromiseCard)

// Load Window
window.addEventListener("load", GetLocalStorage);

