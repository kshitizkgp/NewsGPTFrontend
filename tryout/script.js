let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    // dots[slideIndex-1].className += " active";
}

// Function to update the slider color
function updateSliderColor(progress) {
    let value = (progress.value - progress.min) / (progress.max - progress.min) * 100;
    progress.style.background = `linear-gradient(to right, red , yellow  ${value}%, #008000 ${value}%, #008000 100%)`;
}

function initializeSliders() {
    let sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(updateSliderColor);
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function formatFinalEmailAsHTML(articles, publishDate = formatDate(new Date())) {
    let subject = articles.map(article => article.summary_heading).join(', ');

    let htmlString = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>GPT Newsletter</title>
        <style>
            /*body {*/
            /*    font-family: Arial, sans-serif;*/
            /*    display: flex;*/
            /*    justify-content: center;*/
            /*    align-items: center;*/
            /*    height: 100vh;*/
            /*    margin: 0;*/
            /*    background-color: #f0f0f0;*/
            /*}*/
        .email-content {
                width: 100%; /* Adjust this as needed */
                padding: 20px;
                border-radius: 5px;
                background-color: #f5f5f5;
                align-items: center; /* Centers the contents vertically within the .content pane */
                margin: 0 auto;
                font-size: 18px !important
            }

            .article-contents {
                font-size: 18px !important
            }

            .brand-heading {
                text-align: center;
                font-size: 18px !important
            }

            .brand-container {
                width: 100%;
                align-items: center !important; /* Centers the contents vertically within the .content pane */
                text-align: center !important;
                background: #050203 !important;
                font-family: sans-serif !important;
                font-weight: bolder !important;
                border-bottom: 5px solid #ff0000;
                border-top: 5px solid #ff0000;
            }

            .footer-text {
                font-size: 16px !important
            }

            h1 {
                color: #333;
            }
            h2 {
                color: #666;
            }
            a {
                color: #0099cc;
            }
        </style>
    </head>
    <body>
<!--        <div class= "email-content brand-container">-->
<!--            <div>-->
<!--                <span style="color:rgb(255,255,255)!important;font-size:30px">N</span>-->
<!--                <span style="color:rgb(255,255,255)!important;font-size:30px">e</span>-->
<!--                <span style="color:rgb(255,255,255)!important;font-size:30px">w</span>-->
<!--                <span style="color:rgb(255,255,255)!important;font-size:30px">s</span>-->
<!--                <span style="color:rgb(255,255,255)!important;font-size:30px">G</span>-->
<!--                <span style="color:rgb(255,255,255)!important;font-size:30px">P</span>-->
<!--                <span style="color:rgb(255,255,255)!important;font-size:30px">T</span>-->
<!--            </div>-->
<!--        </div>-->
        <h3 class="brand-heading"> <strong> Personalized Newsletter`;

    htmlString += ` </strong> </h3> <div class="email-content article-contents">`;

    articles.forEach(article => {
        htmlString += `<h3 class="article-contents"><a href="${article.url}">${article.title}</a></h3>\n`;
        htmlString += `<p>${article.summary}</p>\n`;
    });

    htmlString += `
        <br/>
            <div class="footer-text"> 
<!--                <p> In case you want to give some feedback, simply reply to this email! </p>-->
                <p> Thank you for reading, <br/>
                    NewsGPT Team </p>
<!--                <p>If you don't want to receive future updates, <a href="https://newsgpt.tech/unsubscribe/unsubscribe.html">please click here to unsubscribe.</a> <p>-->
            </div>
        </div>
    </div>
    </body>
    </html>
    `;

    return {subject: subject, htmlString: htmlString};
}

const results = {
    "sample.email@gmail.com": [
        {
            "title": "Inflection debuts its own foundation AI model to rival Google and OpenAI LLMs",
            "url": "https://techcrunch.com/2023/06/22/inflection-debuts-its-own-foundation-ai-model-to-rival-google-and-openai-llms/",
            "summary_heading": "Inflection's AI model debut",
            "summary": "Inflection-1 is of roughly GPT-3.5 ( AKA ChatGPT) size and capabilities. The company claims that it ’s competitive or superior with other models on this tier. Inflection notes that it expects to publish results for a larger model comparable to PaLM-2 ( L)",
            "date": "06/22/2023",
        },
        {
            "title": "Galileo launches LLM Studio to revolutionize AI adoption in enterprises",
            "url": "https://venturebeat.com/automation/galileo-launches-llm-studio-to-revolutionize-ai-adoption-in-enterprises/",
            "summary_heading": "Galileo launches LLM Studio",
            "summary": "Galileo LLM Studio is a platform to diagnose and fix issues with large language models. The platform aims to help companies deploy natural language processing models into production faster. It detects “ model hallucinations , ” or incorrect predictions , and improving model accuracy. Join top executives in San Francisco on July 11-12 to hear how leaders are integrating and optimizing AI investments for success.",
            "date": "06/20/2023",
        },
        {
            "title": "Tribe AI’s CEO on why generative AI is seeing more rapid uptake by enterprises than Web3 and crypto",
            "url": "https://venturebeat.com/ai/tribe-ais-ceo-on-why-generative-ai-is-seeing-more-rapid-uptake-by-enterprises-than-web3-and-crypto/",
            "summary_heading": "Generative AI adoption in enterprises",
            "summary": "Jaclyn Rice Nelson is the CEO of Tribe AI, a New York-based AI consulting firm. Rice Nelson left Google's Capital G in 2018 to start her own firm. She says she was inspired by her engineering colleagues who had also left Google. Tribe AI offers “ 300+ machine learning engineers , strategists , and data scientists from leading technical institutions.",
            "date": "06/16/2023",
        },
    ],
    "sample.email1@gmail.com": [
        {
            "title": "Inflection debuts its own foundation AI model to rival Google and OpenAI LLMs",
            "url": "https://techcrunch.com/2023/06/22/inflection-debuts-its-own-foundation-ai-model-to-rival-google-and-openai-llms/",
            "summary_heading": "Inflection's AI model debut",
            "summary": "Inflection-1 is of roughly GPT-3.5 ( AKA ChatGPT) size and capabilities. The company claims that it ’s competitive or superior with other models on this tier. Inflection notes that it expects to publish results for a larger model comparable to PaLM-2 ( L)",
            "date": "06/22/2023",
        },
        {
            "title": "Galileo launches LLM Studio to revolutionize AI adoption in enterprises",
            "url": "https://venturebeat.com/automation/galileo-launches-llm-studio-to-revolutionize-ai-adoption-in-enterprises/",
            "summary_heading": "Galileo launches LLM Studio",
            "summary": "Galileo LLM Studio is a platform to diagnose and fix issues with large language models. The platform aims to help companies deploy natural language processing models into production faster. It detects “ model hallucinations , ” or incorrect predictions , and improving model accuracy. Join top executives in San Francisco on July 11-12 to hear how leaders are integrating and optimizing AI investments for success.",
            "date": "06/20/2023",
        },
        {
            "title": "Tribe AI’s CEO on why generative AI is seeing more rapid uptake by enterprises than Web3 and crypto",
            "url": "https://venturebeat.com/ai/tribe-ais-ceo-on-why-generative-ai-is-seeing-more-rapid-uptake-by-enterprises-than-web3-and-crypto/",
            "summary_heading": "Generative AI adoption in enterprises",
            "summary": "Jaclyn Rice Nelson is the CEO of Tribe AI, a New York-based AI consulting firm. Rice Nelson left Google's Capital G in 2018 to start her own firm. She says she was inspired by her engineering colleagues who had also left Google. Tribe AI offers “ 300+ machine learning engineers , strategists , and data scientists from leading technical institutions.",
            "date": "06/16/2023",
        },
    ]
};

let output = formatFinalEmailAsHTML(results["sample.email@gmail.com"]);
console.log(output);
// Find the div where you want to display the output
let emailDiv = document.getElementById('email');

// Display the output
emailDiv.innerHTML = output.htmlString;

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
        let input = document.createElement('input');
        input.type = 'text';
        input.id = 'interest' + interestCount;
        input.name = 'interest' + interestCount;
        input.placeholder ="Enter Interest OR Select one";
        input.required = true;

        let dataList = document.getElementById('interests-datalist');
        if (interestCount === 1) {
            suggestedInterests.forEach(interest => {
                let option = document.createElement('option');
                option.value = interest;
                dataList.appendChild(option);
            });
        }

        input.setAttribute('list', 'interests-datalist');

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
        suggestion_click_to_add.onclick = function() {
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
        interestsDiv.appendChild(interestContainer);
        // suggestionContainer.appendChild(suggestion);
        // suggestionContainer.appendChild(suggestion_click_to_add);
        // interestContainer.appendChild(suggestionContainer);

        slider.oninput = function() {
            slider.value = this.value;
            updateSliderColor(this);
            sliderValueLabel.innerHTML = ' ' + this.value;
        };

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

    form.onsubmit = function(e) {
        e.preventDefault();
    }
}
