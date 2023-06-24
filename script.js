// Function to update the slider color
function updateSliderColor(progress) {
    let value = (progress.value - progress.min) / (progress.max - progress.min) * 100;
    progress.style.background = `linear-gradient(to right, red , yellow  ${value}%, #008000 ${value}%, #008000 100%)`;
}

function initializeSliders() {
    let sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(updateSliderColor);
}

window.onload = function() {
    let form = document.getElementById('subscription-form');
    let interestsDiv = document.getElementById('interests');
    let addInterestBtn = document.getElementById('add-interest');

    let interestCount = 0;

    // Add the first interest field
    addInterest();

    addInterestBtn.onclick = function() {
        if(interestCount < 5) {
            addInterest();
        }
    }

    function addInterest() {
        interestCount++;
        var interestContainer = document.createElement('div');
        interestContainer.classList.add('interest-container');

        var label = document.createElement('label');
        label.innerHTML = 'Interest ' + interestCount + ':<span class="required">*</span>';
        var input = document.createElement('input');
        input.type = 'text';
        input.id = 'interest' + interestCount;
        input.name = 'interest' + interestCount;
        input.required = true;

        var slider = document.createElement('input');
        var sliderValueLabel = document.createElement('span');
        slider.type = 'range';
        slider.id = 'interest' + interestCount + 'Slider';
        slider.name = 'interest' + interestCount + 'Slider';
        slider.min = '0';
        slider.max = '100';
        slider.value = '50';
        sliderValueLabel.innerHTML = ' ' + slider.value;
        sliderValueLabel.id = 'sliderValue' + interestCount;
        interestContainer.appendChild(label);
        interestContainer.appendChild(input);
        interestContainer.appendChild(slider);
        interestsDiv.appendChild(interestContainer);
        interestContainer.appendChild(sliderValueLabel);

        slider.oninput = function() {
            slider.value = this.value;
            updateSliderColor(this);
            sliderValueLabel.innerHTML = ' ' + this.value;
        };
        // slider.addEventListener('input', function() {
        //     var value = (this.value - this.min) / (this.max - this.min) * 100;
        //     this.style.background = `linear-gradient(to right, red , yellow  ${value}%, #008000 ${value}%, #008000 100%)`;
        // });
        // slider.setAttribute("oninput", "updateSliderColor(this)");
    }

    form.onsubmit = function(e) {
        e.preventDefault();
        var email = document.getElementById('email').value;

        // Create an object to store the interests and their preference scores
        var interests = {};
        for (var i = 0; i < interestCount; i++) {
            var interestName = document.getElementById('interest' + (i + 1)).value;
            var interestScore = document.getElementById('interest' + (i + 1) + 'Slider').value;
            interests[interestName] = interestScore;
        }

        // Log values to console
        console.log('Email: ' + email);
        console.log(interests);

        // Call function to write to Google Sheets (placeholder - you would need to implement this with a server-side process)
        writeToGoogleSheets(email, interests);
    }
}

