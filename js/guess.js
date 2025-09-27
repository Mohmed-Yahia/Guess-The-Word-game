// setting game name
 let gameName = "Guess The Word";
 document.title = gameName;
 document.querySelector("h1").innerHTML = gameName;
 document.querySelector("footer").innerHTML = `${gameName} Game Created By Mohamed yahia`;

 // setting game option 
 let numbersOfTries = 6;
 let numbersOfLetters = 6;
 let currentTry = 1;
 let numberOfHints = 2;

// manage words 
 let wordToGuess = "";
 const words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School"];
 wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
  console.log(wordToGuess);
 let messageArea = document.querySelector(".message");

 // manage hints
  document.querySelector(".hint span").innerHTML = numberOfHints;
  const getHintButton = document.querySelector(".hint");
  getHintButton.addEventListener("click", getHint)


 function generateInput() {
    const inputsContainer = document.querySelector(".inputs");
    for (let i = 1; i <= numbersOfTries; i++) {
       const tryDiv = document.createElement("div");
       tryDiv.classList.add(`try-${i}`);
       tryDiv.innerHTML = `<span>Try ${i}</span>`;

       if (i !== 1) tryDiv.classList.add("disabled-inputs");

       for (let j = 1; j <= numbersOfLetters; j++) {
          const input = document.createElement("input");
          input.type = "text";
          input.id = `guess-${i}-letter-${j}`;
          input.setAttribute("maxlength", "1");
          tryDiv.appendChild(input);

       }

       inputsContainer.appendChild(tryDiv);
    }
    inputsContainer.children[0].children[1].focus();

    //disable all inputs except first one
    const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input");
    inputsInDisabledDiv.forEach((input) => (input.disabled = true) );
    
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input, index) => {
      //convert input value to uppercase
       input.addEventListener("input", function () {
         this.value = this.value.toUpperCase();
         const nextInput = inputs[index + 1];
         if (nextInput) nextInput.focus();
        });
        input.addEventListener("keydown", function (event) {
            //console.log(event)
           const currentIndex = Array.from(inputs).indexOf(event.target); // or this
           // console.log(currentIndex);
           if (event.key === "ArrowRight") {
            const nextInput = currentIndex + 1;
            if (nextInput < inputs.length) inputs[nextInput].focus();
           }
           if (event.key === "ArrowLeft") {
            const prevInput = currentIndex - 1;
            if (prevInput >= 0) inputs[prevInput].focus();
           }
        });
    });

 }

 const guessButton = document.querySelector(".check");
 guessButton.addEventListener("click", handleGuesses);

 function handleGuesses() {
   let successGuess = true;
   for (let i = 1; i <= numbersOfLetters; i++) {
     inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
     const letter = inputField.value.toLowerCase();
     const actualLetter = wordToGuess[i - 1];

     // game logic 
     if (letter === actualLetter) {
      inputField.classList.add("yes-in-place");
     } else if (wordToGuess.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place");
      successGuess = false;

     }else {
      inputField.classList.add("no");
      successGuess = false;
     }
    }
    // check if user win or lose 
    if (successGuess) {
      messageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;
      if (numberOfHints === 2) {
         messageArea.innerHTML = `<p>Congratulation You Win Without Using Hints</p>`;
      }
     
      // Add disAble Class to All Div
     let alltries = document.querySelectorAll(".inputs > div");
     alltries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));

     // Disable Guess Button
     guessButton.disabled = true;
     getHintButton.disabled = true;
     }else {
     
     document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
     const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
     currentTryInputs.forEach((input) => (input.disabled = true));

     currentTry++;

     const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
     nextTryInputs.forEach((input) => (input.disabled = false));

     let el = document.querySelector(`.try-${currentTry}`);
     if (el) {
     document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
     el.children[1].focus();

     }else 
       // Disable Guess Button
     guessButton.disabled = true;
     getHintButton.disabled = true;
     messageArea.innerHTML = `You loss The Word Is<span>${wordToGuess}</span>`

     }
 };
 function getHint() {
    if (numberOfHints > 0) {
      numberOfHints--;
      document.querySelector(".hint span").innerHTML = numberOfHints;

    }
    if (numberOfHints === 0) {
      getHintButton.disabled = true;
    }
    const enabledInput = document.querySelectorAll("input:not([disabled])");
    //console.log(enabledInput);
    const emptyEnabledInputs = Array.from(enabledInput).filter((input) => input.value === "");
   //console.log(emptyEnabledInputs);

   if (emptyEnabledInputs.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
      const randomInput = emptyEnabledInputs[randomIndex];
      const indexTofill = Array.from(enabledInput).indexOf(randomInput);
      //console.log(indexTofill);
      if (indexTofill !== -1) {
        randomInput.value = wordToGuess[indexTofill].toUpperCase();
      }
    }

 };

 function handleBackspace(event) {
   if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    if (currentIndex > 0) {
      const currentInput =   inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];
      currentInput.value = "";
      prevInput.value = "";
      prevInput.focus();

    };
   };
 };

 document.addEventListener("keydown", handleBackspace);

 window.onload = function () {
    generateInput();
 };
 