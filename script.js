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
        "New products announcements in web3 space",
        "New successful Startups created by Solopreneurs",
        "Cutting-edge developments in quantum computing",
        "Privacy and security updates in the crypto industry",
        "Space exploration and new tech in astronomy",
        "The impact of AI on job market trends",
        "Biotech breakthroughs in gene editing",
        "New advancements in augmented reality (AR) and virtual reality (VR)",
        "Robotics and automation innovations",
        "Evolution of e-commerce platforms",
        "Major mergers and acquisitions in the tech sector",
        "Tech industry's response to climate change",
        "Progress in electric vehicle technology",
        "Breakthroughs in energy storage technologies",
        "Advent of 5G and its societal impact",
        "Newly published patents from leading tech companies",
        "Latest research in neural networks and deep learning",
        "Innovations in healthcare tech",
        "Promising advancements in renewable energy technologies",
        "Tech in education: EdTech startups and their solutions",
        "Emerging trends in user interface (UI) and user experience (UX) design",
        "The role of technology in sustainable living and eco-innovation",
        "Advancements in self-driving vehicle technology",
        "Big data trends and analytics innovations",
        "Innovations in wearable technology",
        "The impact of technology on mental health",
        "Decentralized finance (DeFi) trends",
        "Tech developments in sports industry",
        "Progress in holography and 3D display tech",
        "The future of food: tech in agriculture and food production",
        "Growth and challenges in SaaS businesses",
        "Biodiversity and tech: new tools for conservation",
        "Machine learning applications in everyday life",
        "Influence of technology on modern art",
        "Technology's role in disaster response and prevention",
        "Evolving laws and regulations in tech",
        "The role of blockchain beyond cryptocurrencies",
        "Gaming technology and eSport trends",
        "Tech solutions for accessible and inclusive design",
        "Development in Internet of Things (IoT)",
        "How tech is reshaping the music industry",
        "Innovative construction and architecture technologies",
        "Tech implications in global politics",
        "New modes of transport: Hyperloop, drones, etc.",
        "Trends in nanotechnology",
        "Future of money: digital currencies and cashless economy",
        "Tech developments in fitness and wellness",
        "Influential women in the tech industry",
        "Updates in voice recognition and speech tech",
        "Trends in tech investments and venture capital",
        "Developments in smart home technology",
        "AI and ethics: Responsible tech development"
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

    addInterestBtn.onclick = function() {
        if(interestCount < 5) {
            addInterest();
        }
    }

    function addInterest() {
        let previousSuggestions = document.getElementsByClassName('suggestion-link');
        for(let i = 0; i < previousSuggestions.length; i++) {
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
        input.placeholder ="Enter your interest";
        input.required = true;

        // remove previous suggestions


        // Create the suggestion
        let suggestion = document.createElement('a');
        suggestion.style.cursor = "pointer";
        suggestion.className = 'suggestion-link';
        suggestion.style.textDecoration = "underline";
        suggestion.innerHTML = 'Example: ' + getRandomInterest();
        suggestion.onclick = function() {
            input.value = this.innerHTML.replace('Example: ', '');
            this.style.display = 'none';
        };

        let slider = document.createElement('input');
        let sliderValueLabel = document.createElement('span');
        slider.type = 'range';
        slider.id = 'interest' + interestCount + 'Slider';
        slider.name = 'interest' + interestCount + 'Slider';
        slider.min = '0';
        slider.max = '100';
        slider.value = '90';
        sliderValueLabel.innerHTML = ' ' + slider.value;
        sliderValueLabel.id = 'sliderValue' + interestCount;
        interestContainer.appendChild(label);
        interestContainer.appendChild(input);
        interestContainer.appendChild(slider);
        interestContainer.appendChild(sliderValueLabel);
        interestsDiv.appendChild(interestContainer);
        interestsDiv.appendChild(suggestion);

        slider.oninput = function() {
            slider.value = this.value;
            updateSliderColor(this);
            sliderValueLabel.innerHTML = ' ' + this.value;
        };

        if (interestCount == 5) {
            addInterestBtn.style.display = 'none';
            addInterestBtn.style.margin = 0;
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

