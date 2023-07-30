// Function to update the slider color

'use strict';

window.onload = function () {
    let form = document.getElementById('subscription-form');
    let interestsDiv = document.getElementById('interests');

    var topInterestContainer = document.querySelector('.top-interest-container');
    var checkbox = document.getElementById('check');

    checkbox.addEventListener('change', function () {
        if (this.checked) {
            topInterestContainer.style.display = 'flex';
        } else {
            topInterestContainer.style.display = 'none';
        }
    });

    if (checkbox.checked) {
        topInterestContainer.style.display = 'flex';
    } else {
        topInterestContainer.style.display = 'none';
    }

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

    function updateDeleteButtons() {
        const deleteButtons = document.querySelectorAll('.delete-interest');

        if (interestCount === 1) {
            deleteButtons.forEach((button) => {
                button.style.display = "none";
            });
        } else if (interestCount > 1) {
            deleteButtons.forEach((button) => {
                button.style.display = "flex";
            });
        }

        // deleteButtons.forEach((button, i) => {
        //     button.addEventListener('click', () => {
        //         // console.log('click:', i);
        //         // console.log(Array.from(document.querySelectorAll('li'))[i]);
        //         this.itemsList.splice(i, 1);
        //
        //         this._setLocalStorage();
        //         this._displayTasks();
        //     });
        // });
    }


    function addInterest() {
        console.log("addInterest called");
        let previousSuggestions = document.getElementsByClassName('suggestion-container');
        for (let i = 0; i < previousSuggestions.length; i++) {
            previousSuggestions[i].style.display = 'none';
        }
        interestCount++;
        let interestContainerWithSuggestion = document.createElement('div');
        interestContainerWithSuggestion.classList.add('interest-container-with-suggestions');

        let interestContainer = document.createElement('div');
        interestContainer.classList.add('interest-container');
        let interestWrapper = document.createElement('div');
        interestWrapper.classList.add('input-wrapper');

        let label = document.createElement('label');
        label.innerHTML = 'Interest-' + interestCount + ':<span class="required">*</span>';
        let input = document.createElement('input');
        input.type = 'text';
        input.id = 'interest' + interestCount;
        input.name = 'interest' + interestCount;
        input.placeholder = "Write your interest in plain text";
        // input.required = true;

        let dataList = document.getElementById('interests-datalist');
        if (interestCount === 1) {
            suggestedInterests.forEach(interest => {
                let option = document.createElement('option');
                option.value = interest;
                dataList.appendChild(option);
            });
        }

        let deleteDiv = document.createElement('div');
        addInterestDiv.id = 'delete-interest-button'
        deleteDiv.className = "delete-interest";
        deleteDiv.setAttribute("data-tooltip", "Delete");
        // Create the img element
        var imgElement = document.createElement("img");
        imgElement.src = "trash.png";
        imgElement.alt = "";
        imgElement.width = 16;
        imgElement.height = 16;

        // Append the img and span elements to the main div element
        deleteDiv.appendChild(imgElement);

        deleteDiv.addEventListener('click', () => {
            interestContainerWithSuggestion.remove();
            interestCount--;
            updateDeleteButtons();
            // if (interestCount === 4) {
            //     addInterestBtn.style.display = 'inline-block';
            // }
        });

        $(document).ready(function () {
            $(".delete-interest").hover(function () {
                var tooltip = $("<div class='tooltip'></div>");
                tooltip.text($(this).data("tooltip"));
                $(this).append(tooltip);
                tooltip.fadeIn(1000); // show after 1 sec
            }, function () {
                $(this).find(".tooltip").remove();
            });
        });

        let addInterestDiv = document.createElement('div');
        addInterestDiv.id = 'add-interest-button'
        addInterestDiv.className = "add-interest";
        addInterestDiv.setAttribute("data-tooltip", "Add new Interest");

        var addInterestImage = document.createElement("img");
        addInterestImage.src = "plus.png";
        addInterestImage.alt = "";
        addInterestImage.width = 16;
        addInterestImage.height = 16;

        addInterestDiv.appendChild(addInterestImage);

        $(document).ready(function () {
            $(".add-interest").hover(function () {
                var tooltip = $("<div class='add-interest-tooltip'></div>");
                tooltip.text($(this).data("tooltip"));
                $(this).append(tooltip);
                tooltip.fadeIn(100); // show after 1 sec
            }, function () {
                $(this).find(".add-interest-tooltip").remove();
            });
        });

        addInterestDiv.onclick = function () {
            addInterest();
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


        // Add event listeners for both mouse and touch events
        sliderHoverText.innerHTML = 'Level of Interest';
        sliderHoverText.classList.add('slider-text');
        sliderHoverText.style.display = 'none';
        sliderHoverText.id = 'sliderValue' + interestCount;

        sliderValueLabel.innerHTML = ' ' + slider.value;
        sliderValueLabel.id = 'sliderValue' + interestCount;

        interestWrapper.appendChild(input);
        interestWrapper.appendChild(deleteDiv);
        interestContainer.appendChild(addInterestDiv);
        interestContainer.appendChild(interestWrapper);
        sliderContainer.appendChild(slider);
        interestContainer.appendChild(sliderContainer);
        sliderContainer.style.display = 'none';
        suggestionContainer.appendChild(suggestion);
        // suggestionContainer.appendChild(suggestion_click_to_add);
        interestContainerWithSuggestion.appendChild(interestContainer);
        interestContainerWithSuggestion.appendChild(suggestionContainer);
        interestsDiv.appendChild(interestContainerWithSuggestion);
        updateDeleteButtons();
    }

    form.onsubmit = function (e) {
        e.preventDefault();
    }


}

// class App {
//     constructor() {
//         this.addTaskBtn = document.querySelector('#add-task');
//         this.modal = document.getElementById("myModal");
//         this.span = document.getElementsByClassName("close")[0];
//         this.addBtn = document.getElementById('btn-add-task');
//         this.addInput = document.getElementById('input-task');
//         this.currentDate = document.getElementById('due-date--input');
//         // this.today = new Date();
//
//         // SECTION Initial test data
//
//         this.itemsList = [
//             {
//                 task: 'I want to learn about the development in Internet of Things (IoT)',
//             },
//             {
//                 task: 'I am interested in innovative construction and architecture technologies',
//             },
//             {
//                 task: 'I am interested in the future of money: digital currencies and cashless economy',
//             },
//         ];
//
//         // SECTION Initialisation
//
//         this._init();
//
//         // SECTION Event listeners
//
//         // 'Today' as default on date picker
//         // currentDate.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
//
//         // When user presses Esc key, exit modal
//         document.addEventListener('keydown', this._escModal.bind(this));
//         // When the user clicks on <span> (x), close the modal
//         this.span.addEventListener('click', this._hideModal.bind(this));
//         // When the user clicks anywhere outside of the modal, close it
//         window.addEventListener('click', this._clickOutsideModalClose.bind(this));
//
//         // Add new task
//         this.addTaskBtn.addEventListener('click', this._showModal.bind(this));
//         this.addInput.addEventListener('keydown', this._createTask.bind(this));
//         this.addBtn.addEventListener('click', this._addNewTask.bind(this));
//
//         // SECTION Background on demand
//
//         // Event delegation (to prevent repeating the listener function for each element)
//         document.querySelector('#time-of-day').addEventListener('click', this._checkForSetBackground.bind(this));
//     }
//
//     _checkForSetBackground(e) {
//         // e.preventDefault();
//         // console.log(e);
//
//         // Matching strategy
//         if (e.target.value !== undefined) {
//             // console.log(e.target.value);
//             this._setBackground(e.target.value);
//         }
//     }
//
//     _escModal(e) {
//         if (e.key === 'Escape')
//             this.modal.style.display = "none";
//     }
//
//     _clickOutsideModalClose(e) {
//         if (e.target === this.modal)
//             this.modal.style.display = "none";
//     }
//
//     _showModal() {
//         this.modal.style.display = "block";
//         document.getElementById('input-task').focus();
//     }
//
//     _hideModal() {
//         this.modal.style.display = "none";
//     }
//
//     _createTask(e) {
//         if (e.key === 'Enter')
//             this._addNewTask();
//     }
//
//     _setBackground(method) {
//         let currentHour = 0; // Default
//
//         if (method === 'automatic') {
//             currentHour = new Date().getHours();
//         } else if (method === 'morning') {
//             currentHour = 7;
//         } else if (method === 'afternoon') {
//             currentHour = 12;
//         } else if (method === 'night') {
//             currentHour = 19;
//         }
//
//         const background = document.querySelector('body');
//         background.className = ""; // Remove all properties
//
//         // if (currentHour > 6 && currentHour < 12) {
//         //     // Morning
//         //     background.classList.add('background-morning');
//         //     document.querySelector('#morning').checked = true;
//         // } else if (currentHour >= 12 && currentHour < 19) {
//         //     // Afternoon
//         //     background.classList.add('background-afternoon');
//         //     document.querySelector('#afternoon').checked = true;
//         // } else {
//         //     // Night
//         //     if (method !== 'manual') {
//         //         background.classList.add('background-night');
//         //         document.querySelector('#night').checked = true;
//         //     }
//         // }
//         background.classList.add('background-night');
//         background.classList.add('background-stretch');
//     }
//
//     _lineThroughText(i) {
//         const itemToLineThrough = Array.from(document.querySelectorAll('.todo--tasks-list--item--description'));
//         itemToLineThrough[i].classList.toggle('todo--tasks-list--item--description--checked');
//     }
//
//     _checkCheckBox(checkBox) {
//         const processItem = function (element, i) {
//             const toggleCheckBox = function () {
//                 element.classList.toggle('todo--tasks-list--item--checkbox--checked');
//                 this.itemsList[i].completed = !this.itemsList[i].completed;
//                 this._lineThroughText(i);
//                 this._setLocalStorage();
//             }
//
//             if (this.itemsList[i].completed) {
//                 element.classList.toggle('todo--tasks-list--item--checkbox--checked');
//                 this._lineThroughText(i);
//             }
//             element.addEventListener('click', toggleCheckBox.bind(this));
//         }
//
//         checkBox.forEach(processItem.bind(this));
//
//     }
//
//     _displayTasks() {
//         const list = document.getElementById('todo--tasks-list--items-list');
//         // Clear list
//         const li = document.querySelectorAll('li');
//         li.forEach(element => {
//             element.remove();
//         })
//
//         // Get items from local storage
//         // this._getLocalStorage();
//
//         // Display list
//         this.itemsList.reverse().forEach((_, i) => {
//             list.insertAdjacentHTML('afterbegin', `<li class="todo--tasks-list--item">
// <!--            <div class="edit-task"><img src="./images/edit.png" alt="" width="16px" height="16px"/>-->
// <!--                <div class="delete-text">Edit</div>-->
// <!--            </div>-->
//             <div class="todo--tasks-list--item--description">${this.itemsList[i].task}</div>
//             <div class="delete-task"><img src="./images/remove.png" alt="" width="16px" height="16px"/>
//                 <div class="delete-text">Delete</div>
//             </div>
//         </li>`);
//         });
//         this.itemsList.reverse();
//
//         // Checkboxes
//         const checkBox = document.querySelectorAll('.todo--tasks-list--item--checkbox');
//         this._checkCheckBox(checkBox);
//
//         // Delete buttons
//         this._updateDeleteButtons();
//     }
//
//     _updateDeleteButtons() {
//         const deleteButtons = document.querySelectorAll('.delete-task');
//         deleteButtons.forEach((button) => {
//             button.removeEventListener('click', () => {
//             });
//         });
//         deleteButtons.forEach((button, i) => {
//             button.addEventListener('click', () => {
//                 // console.log('click:', i);
//                 // console.log(Array.from(document.querySelectorAll('li'))[i]);
//                 this.itemsList.splice(i, 1);
//
//                 this._setLocalStorage();
//                 this._displayTasks();
//             });
//         });
//     }
//
//     _addNewTask() {
//         const newTask = {};
//         const inputTask = document.getElementById('input-task');
//
//         if (inputTask.value !== '') {
//             newTask.task = inputTask.value;
//             const dueDate = document.getElementById('due-date--input').value;
//             if (dueDate !== '') {
//                 const dueDateArr = dueDate.split('-');
//                 newTask.dueDate = `${dueDateArr[2]}/${dueDateArr[1]}/${dueDateArr[0]}`;
//             }
//             newTask.completed = false;
//             this.itemsList.unshift(newTask);
//
//             this._setLocalStorage();
//
//             this._displayTasks();
//
//             this.modal.style.display = "none";
//             inputTask.value = '';
//
//         } else {
//             inputTask.style.border = '1px solid red';
//             inputTask.focus();
//             setTimeout(() => inputTask.style.border = '1px solid #c9c9c9', 500);
//         }
//     }
//
//     _setHeaderDate() {
//         const locale = navigator.language;
//
//         const dateOptionsDay = {
//             weekday: 'long',
//         }
//         const dateOptionsDate = {
//             day: 'numeric',
//             month: 'long',
//             year: 'numeric',
//         }
//         const day = new Intl.DateTimeFormat(locale, dateOptionsDay).format(new Date());
//         const date = new Intl.DateTimeFormat(locale, dateOptionsDate).format(new Date());
//     }
//
//     _setLocalStorage() {
//         localStorage.setItem('tasks', JSON.stringify(this.itemsList));
//     }
//
//     _getLocalStorage() {
//         return;
//         // const data = JSON.parse(localStorage.getItem('tasks'));
//         //
//         // if (!data) return;
//         //
//         // this.itemsList = data;
//     }
//
//     _init() {
//         this._setBackground('automatic');
//         this._displayTasks();
//     }
// }

// const app = new App();
