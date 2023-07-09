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
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
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
            /*    !*justify-content: center;*!*/
            /*    !*align-items: center;*!*/
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
<!--        <h3 class="brand-heading"> <strong> Personalized Newsletter </strong> </h3> -->`;

    htmlString += `<div class="email-content article-contents">`;

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
            "title": "5 Technology Improvements That Have Changed Tennis",
            "url": "https://calbizjournal.com/5-technology-improvements-that-have-changed-tennis/",
            "summary_heading": "Technology Improvements Changed Tennis",
            "summary": "Tennis is a sport that has experienced substantial expansion and development due to technological advancements. In the earlier days of the sport, players would use wood racquets with basic strings for optimal performance. Today, players can use metal and synthetic strings, which enable harder hits and greater spin capabilities on balls being hit harder. Live streaming technology has given audiences the ability to watch their favorite tennis stars whenever they want. Internet has given the sport access to potential new audiences.",
            "date": "07/07/2023",
        },
        {
            "title": "Vertical farming: how technology is changing the future of agriculture",
            "url": "https://www.thetechedvocate.org/vertical-farming-how-technology-is-changing-the-future-of-agriculture/",
            "summary_heading": "Technology changing agriculture",
            "summary": "80% of the world’s population is expected to live in urban areas by 2050. Vertical farming is a new farming method that grows crops indoors using vertically stacked layers. It offers various benefits compared to traditional farming methods, such as reduced land usage, year-round production, and less water consumption. It also reduces greenhouse gas emissions.",
            "date": "07/06/2023",
        },
        {
            "title": "Holography in Architecture: Visualizing and Designing the Buildings of Tomorrow",
            "url": "https://ts2.space/en/holography-in-architecture-visualizing-and-designing-the-buildings-of-tomorrow/",
            "summary_heading": "Holography in Architecture",
            "summary": "Holography is a three-dimensional imaging technique developed in the 1940s for scientific and military applications. It has since found its way into various industries, including entertainment, medicine, and most recently, architecture. It is a powerful tool for visualizing and designing the buildings of tomorrow. It helps to streamline the design process and allows architects to experiment with various design elements and materials in real-time. It also helps to create immersive and interactive experiences for clients.",
            "date": "07/05/2023",
        },
    ]
};

window.onload = function () {
    let output = formatFinalEmailAsHTML(results["sample.email@gmail.com"]);
    // console.log(output);
    // Find the div where you want to display the output
    let emailDiv = document.getElementById('email');

    let output1 = formatFinalEmailAsHTML((results["sample.email1@gmail.com"]));
    let emailDiv1 = document.getElementById('email1');

    // Display the output
    emailDiv.innerHTML = output.htmlString;
    emailDiv1.innerHTML = output1.htmlString;

}
