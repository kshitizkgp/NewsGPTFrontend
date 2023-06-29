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

    let suggestedInterests = [
        "Current innovations in generative AI",
        "New AI startups in Silicon Valley",
        "Motivational stories about startup founders",
        "The impact of AI on job market trends",
        "Major mergers and acquisitions in the tech sector",
        "New products announcements in web3 space",
        "New successful Startups created by Solopreneurs",
        "Cutting-edge developments in quantum computing",
        "Privacy and security updates in the crypto industry",
    ];

    function getRandomInterest() {
        if (suggestedInterests.length > 0) {
            const index = Math.floor(Math.random() * suggestedInterests.length);
            const selectedInterest = suggestedInterests[index];
            // Remove the selected interest from the array to avoid repetition
            suggestedInterests.splice(index, 1);
            return selectedInterest;
        } else {
            return "No more interests available";
        }
    }

    // Add the first interest field
    addInterest();
    addInterest();
    addInterest();

    addInterestBtn.onclick = function() {
        if(interestCount < 3) {
            addInterest();
        }
    }

    function addInterest() {
        let previousSuggestions = document.getElementsByClassName('suggestion-link');
        let previousSuggestionsTexts = document.getElementsByClassName('suggestion-name')
        for(let i = 0; i < previousSuggestions.length; i++) {
            previousSuggestions[i].style.display = 'none';
            previousSuggestionsTexts[i].style.display = 'none';
        }
        interestCount++;
        let interestContainer = document.createElement('div');
        interestContainer.classList.add('interest-container');

        let label = document.createElement('label');
        label.innerHTML = 'Interest-' + interestCount + ':<span class="required">*</span>';
        let input = document.createElement('select');
        // input.type = 'text';
        input.id = 'interest' + interestCount;
        input.name = 'interest' + interestCount;
        input.placeholder ="Enter Interest OR Select one";
        input.required = true;

        let dataList = document.getElementById('interests-datalist');
        suggestedInterests.forEach(interest => {
            let option = document.createElement('option');
            option.value = interest;
            option.text = interest; // Set option text
            input.appendChild(option); // Append option to the select element
        });

        input.setAttribute('list', 'interests-datalist');
        input.addEventListener('change', function() {
            let selectedOption = this.options[this.selectedIndex];
            let selectedValue = selectedOption.value;
            var index = suggestedInterests.indexOf(selectedValue);
            console.log(index)
            if (index !== -1) {
                suggestedInterests.splice(index, 1);
                console.log(suggestedInterests.length)
            }
            // Handle the selected value as needed
        });

        let sliderContainer = document.createElement('div');
        sliderContainer.classList.add('slider-container');

        let slider = document.createElement('input');
        let sliderValueLabel = document.createElement('span');
        let sliderHoverText = document.createElement('span');
        slider.type = 'range';
        slider.id = 'interest' + interestCount + 'Slider';
        slider.name = 'interest' + interestCount + 'Slider';
        slider.min = '0';
        slider.max = '100';
        slider.value = '90';
        slider.disabled = true; // Disable the slider element

        // Function to handle both mouseover and touchstart events
        function showSliderText() {
            sliderHoverText.style.display = 'inline-block';
        }

        // Function to handle both mouseout and touchend events
        function hideSliderText() {
            sliderHoverText.style.display = 'none';
        }


        // Add event listeners for both mouse and touch events
        slider.addEventListener('mouseover', showSliderText);
        slider.addEventListener('touchstart', showSliderText);

        slider.addEventListener('mouseout', hideSliderText);
        slider.addEventListener('touchend', hideSliderText);

        sliderHoverText.innerHTML = 'Level of Interest';
        sliderHoverText.classList.add('slider-text');
        sliderHoverText.style.display = 'none';
        sliderHoverText.id = 'sliderValue' + interestCount;

        sliderValueLabel.innerHTML = ' ' + slider.value;
        sliderValueLabel.id = 'sliderValue' + interestCount;
        interestContainer.appendChild(input);
        sliderContainer.appendChild(slider);
        sliderContainer.appendChild(sliderValueLabel);
        sliderContainer.appendChild(sliderHoverText);
        interestContainer.appendChild(sliderContainer);
        interestsDiv.appendChild(interestContainer);
        // suggestionContainer.appendChild(suggestion);
        // suggestionContainer.appendChild(suggestion_click_to_add);
        // interestContainer.appendChild(suggestionContainer);

        slider.oninput = function() {
            slider.value = this.value;
            updateSliderColor(this);
            sliderValueLabel.innerHTML = ' ' + this.value;
        };

        if (interestCount === 3) {
            addInterestBtn.style.display = 'none';
            addInterestBtn.style.margin = '0';
        }
        // slider.addEventListener('input', function() {
        //     var value = (this.value - this.min) / (this.max - this.min) * 100;
        //     this.style.background = `linear-gradient(to right, red , yellow  ${value}%, #008000 ${value}%, #008000 100%)`;
        // });
        // slider.setAttribute("oninput", "updateSliderColor(this)");
    }

    form.onsubmit = function(e) {
        e.preventDefault();
    }
}


