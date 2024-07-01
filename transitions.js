// export { toggleSlideIn };

const myBooksBtn = document.querySelectorAll(".info-container");
const divs = document.querySelectorAll('.close')
const mainDiv = document.querySelector(".main-content");

let isAtZeroPercent = false;
// Array to store buttons search, home.......
const btnArray = [];
const divsArray = [];

myBooksBtn.forEach((btn) => {
  btnArray.push(btn);
});
divs.forEach(div =>{
  divsArray.push(div)
})
const [homeBtn, searchBtn, libraryBtn, favBtn] = btnArray
const [searchDiv, libraryDiv, favDiv] = divsArray

homeBtn.addEventListener('click', closeAnyDiv)

function closeAnyDiv() {
  divsArray.forEach(div => {
      div.style.transform = 'translateX(-100%)';
      div.classList.remove('slide-in'); // Ensure slide-in class is removed
  });
  document
      .querySelector(".inner-cont")
      .children.item(0)
      .classList.remove("hide");
  mainDiv.style.overflowY = 'auto';
  document.querySelector(".search-nav").classList.remove("display-el");

  isAtZeroPercent = false;
  homeBtn.style.opacity = 0.6;
  searchBtn.style.opacity = 1
  console.log('closing any open div');
  return;
}


// Search Button of aside element
searchBtn.addEventListener("click", () => {
  console.log('Search button clicked');
  
  if (searchDiv.classList.contains('slide-in')) {
      // Exiting search mode
      console.log('Exiting search mode');
      mainDiv.style.overflowY = 'auto';
      searchDiv.style.transform = 'translateX(-100%)';
      searchDiv.classList.remove('slide-in');
      document.querySelector(".inner-cont").children.item(0).classList.remove("hide");
      document.querySelector(".search-nav").classList.remove("display-el");
      homeBtn.style.opacity = 0.6;
      searchBtn.style.opacity = 1
  } else {
      // Entering search mode
      console.log('Entering search mode');
      closeAnyDiv(); // Ensure other divs are closed
      mainDiv.style.overflowY = 'hidden';
      searchDiv.style.transform = 'translateX(0%)';
      searchDiv.classList.add('slide-in');
      document.querySelector(".inner-cont").children.item(0).classList.add("hide");
      document.querySelector(".search-nav").classList.add("display-el");
      homeBtn.style.opacity = 1;
      searchBtn.style.opacity = 0.6
  }
});


libraryBtn.addEventListener("click", () => {
  if (isAtZeroPercent) {
    libraryDiv.style.transform = "translateX(-100%)";
    document
    .querySelector(".inner-cont")
    .children.item(0)
    .classList.remove("hide");
    homeBtn.style.opacity = 0.6
  } else {
    closeAnyDiv()
    // remove search bar
    document.querySelector(".search-nav").classList.remove("display-el");
    libraryDiv.style.transform = "translateX(0%)";
    btnArray.forEach(btn =>{
      btn.style.opacity = 1
    })
    favBtn.style.opacity = 0.6
    console.log('in lib');
  }
  isAtZeroPercent = !isAtZeroPercent;
});

favBtn.addEventListener("click", () => {
  if (isAtZeroPercent) {
    favDiv.style.transform = "translateX(-100%)";
    document
    .querySelector(".inner-cont")
    .children.item(0)
    .classList.remove("hide");
    homeBtn.style.opacity = 0.6
  } else {
    closeAnyDiv()

    document.querySelector(".search-nav").classList.remove("display-el");
    favDiv.style.transform = "translateX(0%)";
    btnArray.forEach(btn =>{
      btn.style.opacity = 1
    })
    favBtn.style.opacity = 0.6
    console.log('in fav');
  }
  isAtZeroPercent = !isAtZeroPercent;
});

// document.addEventListener('DOMContentLoaded', () => {
//     const infoContainers = document.querySelectorAll('.info-container');

//     infoContainers.forEach(container => {
//         container.addEventListener('mouseenter', () => {
//             const infoText = container.getAttribute('data-info');
//             if (!infoText) return;

//             const popout = document.createElement('div');
//             popout.classList.add('info-popout');
//             popout.textContent = infoText;

//             document.querySelector('.grid-container').appendChild(popout);
//             console.log('hovering');

//             const rect = container.getBoundingClientRect();
//             popout.style.top = `${rect.bottom + window.scrollY}px`;
//             popout.style.left = `${rect.left + window.scrollX}px`;

//             container._infoPopout = popout; // Store reference to popout for removal
//         });

//         container.addEventListener('mouseleave', () => {
//             const popout = container._infoPopout;
//             if (popout) {
//                 document.querySelector('.grid-container').removeChild(popout);
//                 delete container._infoPopout;
//             }
//         });
//     });
// });
