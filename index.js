const carouselEL = document.getElementsByClassName('hide')
        let currentIndex = 0
        slide()
        function slide(){
           for(let i = 0; i < carouselEL.length; i++){
            carouselEL[i].style.display = 'none'
           }
            currentIndex ++
            if(currentIndex > carouselEL.length){
                currentIndex = 1
            } 
            
            carouselEL[currentIndex-1].style.display = 'block'
            setTimeout(slide, 3000)
        }