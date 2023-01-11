let max_Slide = 6;

function sliderButton() {
    let i=1;

    let left_btn = document.getElementById("back-btn");
    let right_btn = document.getElementById("next-btn");

    left_btn.addEventListener('click', function (e){
        if (i>1){
            document.getElementById(`card-${i}`).setAttribute("class", "hide");
            i-=1;
            document.getElementById(`card-${i}`).setAttribute("class", "card-container");
            document.getElementById("btn-start").classList.add('hide')

        }
    }, false);

    right_btn.addEventListener('click', function (e ){

        if (i<max_Slide){
            document.getElementById(`card-${i}`).setAttribute("class", "hide");
            i+=1;
            if (i===6){
                document.getElementById("btn-start").classList.remove('hide')
            }

            document.getElementById(`card-${i}`).setAttribute("class", "card-container");

        }
    }, false);


}

sliderButton()
