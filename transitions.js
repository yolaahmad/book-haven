export {toggleSlideIn}

const myBooksBtn = document.querySelectorAll('.info-container');
const mainDiv = document.querySelector('.main-content');
const searchSection = document.querySelector('.search-div');

// Array to store buttons search, home.......
const btnArray = [];
myBooksBtn.forEach(btn => {
    btnArray.push(btn);
});

// Function to handle the common toggle logic
function toggleSlideIn(additionalClass) {
    searchSection.classList.toggle('slide-in');
    if (mainDiv.style.overflowY === 'hidden') {
        mainDiv.style.overflowY = 'auto';
    } else {
        mainDiv.style.overflowY = 'hidden';
        console.log('clicked');
    }
    if (additionalClass) {
        searchSection.classList.add(additionalClass);
    }
    console.log('hurray');
}

// Home Button
btnArray[0].addEventListener('click', () => {
    btnArray[0].style.opacity = 1;
    if (searchSection.classList.contains('slider')) {
        searchSection.classList.remove('slide-in');
        btnArray[1].style.opacity = 0.6;
    }

    if (searchSection.classList.contains('slide-in')) {
        document.querySelector('.search-nav').classList.toggle('display-el');
        document.querySelector('.inner-cont').children.item(0).classList.toggle('hide');
        searchSection.classList.remove('slide-in');
        mainDiv.style.overflowY = 'auto';
        btnArray[1].style.opacity = 0.6;
    }
});

// Search Button of aside element
btnArray[1].addEventListener('click', () => {
    document.querySelector('.search-nav').classList.toggle('display-el');
    document.querySelector('.inner-cont').children.item(0).classList.toggle('hide');
    searchSection.classList.toggle('slide-in');
    if (mainDiv.style.overflowY === 'hidden') {
        mainDiv.style.overflowY = 'auto';
        document.querySelector('.home-btn').style.opacity = 1;
        btnArray[1].style.opacity = 0.6;
    } else {
        mainDiv.style.overflowY = 'hidden';
        document.querySelector('.home-btn').style.opacity = 0.5;
        btnArray[1].style.opacity = 1;
        console.log('clicked');
    }
});

btnArray[2].addEventListener('click', () => {
    toggleSlideIn('slider');
});

btnArray[3].addEventListener('click', () => {
    toggleSlideIn('slider');
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
