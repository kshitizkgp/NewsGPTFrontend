// Function to update the slider color
function updateSliderColor(progress) {
    let value = (progress.value - progress.min) / (progress.max - progress.min) * 100;
    progress.style.background = `linear-gradient(to right, red , yellow  ${value}%, #008000 ${value}%, #008000 100%)`;
}

function initializeSliders() {
    let sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(updateSliderColor);
}

window.onload = function () {
    let form = document.getElementById('subscription-form');
    let interestsDiv = document.getElementById('interests');
    let addInterestBtn = document.getElementById('add-interest');

    let interestCount = 0;

    let suggestedInterests = [
        "I am interested in current innovations in generative AI",
        "I follow new AI startups in Silicon Valley",
        "I want to read motivational stories about startup founders",
        "I am eager to learn about new product announcements in the web3 space",
        "I am fascinated by new successful startups created by solopreneurs",
        "I want to stay updated on cutting-edge developments in quantum computing",
        "I am concerned about privacy and security updates in the crypto industry",
        "I am passionate about space exploration and new tech in astronomy",
        "I am curious about the impact of AI on job market trends",
        "I am intrigued by biotech breakthroughs in gene editing",
        "I want to know about new advancements in augmented reality (AR) and virtual reality (VR)",
        "I am excited about robotics and automation innovations",
        "I want to understand the evolution of e-commerce platforms",
        "I am interested in major mergers and acquisitions in the tech sector",
        "I care about the tech industry's response to climate change",
        "I am enthusiastic about progress in electric vehicle technology",
        "I am intrigued by breakthroughs in energy storage technologies",
        "I am interested in the advent of 5G and its societal impact",
        "I want to learn about newly published patents from leading tech companies",
        "I am eager to discover the latest research in neural networks and deep learning",
        "I am curious about innovations in healthcare tech",
        "I am passionate about promising advancements in renewable energy technologies",
        "I want to learn about tech in education: EdTech startups and their solutions",
        "I am interested in emerging trends in user interface (UI) and user experience (UX) design",
        "I am concerned about the role of technology in sustainable living and eco-innovation",
        "I want to stay updated on advancements in self-driving vehicle technology",
        "I am excited about big data trends and analytics innovations",
        "I am interested in innovations in wearable technology",
        "I am curious about the impact of technology on mental health",
        "I want to know more about decentralized finance (DeFi) trends",
        "I am intrigued by tech developments in the sports industry",
        "I am excited about progress in holography and 3D display tech",
        "I am interested in the future of food: tech in agriculture and food production",
        "I want to learn about the growth and challenges in SaaS businesses",
        "I am passionate about biodiversity and tech: new tools for conservation",
        "I am curious about machine learning applications in everyday life",
        "I want to understand evolving laws and regulations in tech",
        "I am interested in the role of blockchain beyond cryptocurrencies",
        "I am excited about gaming technology and eSport trends",
        "I am passionate about tech solutions for accessible and inclusive design",
        "I want to learn about the development in Internet of Things (IoT)",
        "I am curious about how tech is reshaping the music industry",
        "I am interested in innovative construction and architecture technologies",
        "I am intrigued by tech implications in global politics",
        "I am excited about new modes of transport: Hyperloop, drones, etc.",
        "I want to understand trends in nanotechnology",
        "I am interested in the future of money: digital currencies and cashless economy",
        "I am curious about tech developments in fitness and wellness",
        "I want to learn about influential women in the tech industry",
        "I am interested in updates in voice recognition and speech tech",
        "I want to stay informed about trends in tech investments and venture capital",
        "I am interested in developments in smart home technology",
        "I am passionate about AI and ethics: Responsible tech development"
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

    addInterestBtn.onclick = function () {
        if (interestCount < 5) {
            addInterest();
        }
    }

    function addInterest() {
        let previousSuggestions = document.getElementsByClassName('suggestion-container');
        for (let i = 0; i < previousSuggestions.length; i++) {
            previousSuggestions[i].style.display = 'none';
        }
        interestCount++;
        let interestContainer = document.createElement('div');
        interestContainer.classList.add('interest-container');

        let label = document.createElement('label');
        label.innerHTML = 'Interest-' + interestCount + ':<span class="required">*</span>';
        let input = document.createElement('input');
        input.type = 'text';
        input.id = 'interest' + interestCount;
        input.name = 'interest' + interestCount;
        input.placeholder = "Write your interest in plain text";
        input.required = true;

        let dataList = document.getElementById('interests-datalist');
        if (interestCount === 1) {
            suggestedInterests.forEach(interest => {
                let option = document.createElement('option');
                option.value = interest;
                dataList.appendChild(option);
            });
        }

        // input.setAttribute('list', 'interests-datalist');

        // remove previous suggestions

        let suggestionContainer = document.createElement('div');
        suggestionContainer.classList.add('suggestion-container');
        // Create the suggestion
        let suggestion = document.createElement('a');
        // suggestion.style.cursor = "pointer";
        // suggestion.style.textDecoration = "underline";
        suggestion.className = 'suggestion-name';
        suggestion.innerHTML = 'Example: ' + getRandomInterest();
        // suggestion.onclick = function() {
        //     input.value = this.innerHTML.replace('Click to Add: ', '');
        //     this.style.display = 'none';
        // };

        let suggestion_click_to_add = document.createElement('a');
        suggestion_click_to_add.className = 'suggestion-link';
        suggestion_click_to_add.style.cursor = "pointer";
        suggestion_click_to_add.style.marginLeft = "5px"
        suggestion_click_to_add.style.textDecoration = "underline";
        suggestion_click_to_add.innerHTML = 'CLICK TO ADD';
        suggestion_click_to_add.onclick = function () {
            input.value = suggestion.innerHTML.replace('Example: ', '');
            suggestion.style.display = 'none';
            this.style.display = 'none';
        };

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
        sliderContainer.style.display = 'none';
        interestsDiv.appendChild(interestContainer);
        suggestionContainer.appendChild(suggestion);
        // suggestionContainer.appendChild(suggestion_click_to_add);
        interestContainer.appendChild(suggestionContainer);

        // slider.oninput = function() {
        //     slider.value = this.value;
        //     updateSliderColor(this);
        //     sliderValueLabel.innerHTML = ' ' + this.value;
        // };

        if (interestCount === 5) {
            addInterestBtn.style.display = 'none';
            addInterestBtn.style.margin = '0';
        }
        // slider.addEventListener('input', function() {
        //     var value = (this.value - this.min) / (this.max - this.min) * 100;
        //     this.style.background = `linear-gradient(to right, red , yellow  ${value}%, #008000 ${value}%, #008000 100%)`;
        // });
        // slider.setAttribute("oninput", "updateSliderColor(this)");
    }

    form.onsubmit = function (e) {
        e.preventDefault();
    }
}

