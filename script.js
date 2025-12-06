// Main application script
document.addEventListener('DOMContentLoaded', function() {
    // Select all relevant elements
    const startButton = document.getElementById('start-processing');
    const chatModule = document.getElementById('chat-module');
    const chatInputSection = document.getElementById('chat-input-controls'); 
    const startFinalProcessing = document.getElementById('start-final-processing');
    const chatContainer = document.getElementById('chat-container');

    // --- Helper Functions for Loading/State Management ---

    function showLoading(buttonElement, originalText, isLoading) {
        if (isLoading) {
            buttonElement.disabled = true;
            // Add opacity-50 for disabled/faded color effect
            buttonElement.classList.add('opacity-50');
            // Use flex items-center and remove icon to ensure text and spinner are on one line and centered
            buttonElement.innerHTML = `
                <div class="flex items-center justify-center w-full"> 
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                </div>
            `;
        } else {
            buttonElement.disabled = false;
            // Remove opacity-50
            buttonElement.classList.remove('opacity-50');
            buttonElement.innerHTML = `<span>${originalText}</span><i data-feather="arrow-right" class="ml-2 w-5 h-5"></i>`;
            feather.replace();
        }
    }

    // UI Error Box Function
    function showUIError(message) {
        const errorBox = document.createElement("div");
        errorBox.className =
            "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-3";
        errorBox.innerHTML = `
            <strong class="font-bold">Error:</strong>
            <span class="block sm:inline ml-1">${message}</span>
        `;
        chatContainer.appendChild(errorBox);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // UI Success Box Function
    function showUISuccess(message) {
        const successBox = document.createElement("div");
        successBox.className =
            "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative my-3";
        successBox.innerHTML = `
            <strong class="font-bold">Success:</strong>
            <span class="block sm:inline ml-1">${message}</span>
        `;
        chatContainer.appendChild(successBox);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // --- Initial Processing Button Logic ---

    if (startButton && chatModule) {
        const originalButtonText = "Start AI Processing";
        startButton.addEventListener('click', function(e) {
            e.preventDefault();

            // 1. Show loading state
            showLoading(startButton, originalButtonText, true);

            // 2. Hide loading state and proceed to chat after a brief delay
            setTimeout(() => {
                showLoading(startButton, originalButtonText, false);
                
                chatModule.classList.remove('hidden');
                chatModule.scrollIntoView({ behavior: 'smooth' });
                
                // Add initial AI message
                setTimeout(() => {
                    const aiMessage = document.createElement('div');
                    aiMessage.className = 'flex items-start';
                    aiMessage.innerHTML = `
                        <div class="bg-indigo-100 p-3 rounded-full mr-3">
                            <i data-feather="cpu" class="text-indigo-600 w-5 h-5"></i>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow-sm max-w-3/4">
                            <p class="text-gray-800">Hi there! I'm Story Pilot AI. I have some questions to clarify your requirements:</p>
                            <p class="text-gray-800 mt-2">1. What priority level would you assign to your JIRA tickets (High/Medium/Low)?</p>
                        </div>
                    `;
                    chatContainer.appendChild(aiMessage);
                    feather.replace();
                    // Auto scroll to bottom
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }, 500);
            }, 1500); // Simulate a short delay for the initial check
        });
    }

    // File upload interaction (Original logic preserved)
    const fileUpload = document.getElementById('file-upload');
    const uploadSection = document.querySelector('.border-dashed');
    let uploadedFilesArray = [];
    if (fileUpload && uploadSection) {
        fileUpload.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                uploadedFilesArray = Array.from(e.target.files);
                uploadSection.classList.add('border-indigo-400', 'bg-indigo-50');
                uploadSection.querySelector('p').textContent = e.target.files[0].name;
                uploadSection.querySelector('i').setAttribute('data-feather', 'file-text');
                feather.replace();
            }
        });

        // Drag and drop functionality
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadSection.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadSection.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadSection.addEventListener(eventName, unhighlight, false);
        });

        function highlight() {
            uploadSection.classList.add('border-indigo-500', 'bg-indigo-100');
        }

        function unhighlight() {
            uploadSection.classList.remove('border-indigo-500', 'bg-indigo-100');
            uploadSection.classList.add('border-indigo-400');
        }

        uploadSection.addEventListener('drop', handleDrop, false);

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            fileUpload.files = files;
            uploadedFilesArray = Array.from(files);
            uploadSection.querySelector('p').textContent = files[0].name;
            uploadSection.querySelector('i').setAttribute('data-feather', 'file-text');
            feather.replace();
        }
    }
    // Smooth scroll for anchor links (Original logic preserved)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Chat interaction logic (Original logic preserved)
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const questions = [
        "2. How many minimum subtasks should be created for each story?",
        "3. For the notification system, do you want notifications through email alerts?"
    ];
    let currentQuestion = 0;

    function addUserMessage(message) {
            const userMessage = document.createElement('div');
            userMessage.className = 'flex items-start justify-end';
            userMessage.innerHTML = `
                <div class="bg-white p-4 rounded-lg shadow-sm max-w-3/4">
                    <p class="text-gray-800">${message}</p>
                </div>
                <div class="bg-gray-100 p-3 rounded-full ml-3">
                    <i data-feather="user" class="text-gray-600 w-5 h-5"></i>
                </div>
            `;
            chatContainer.appendChild(userMessage);
            feather.replace();
            // Auto scroll to bottom
            chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function addNextQuestion() {
        if (currentQuestion < questions.length) {
            const aiMessage = document.createElement('div');
            aiMessage.className = 'flex items-start';
            aiMessage.innerHTML = `
                <div class="bg-indigo-100 p-3 rounded-full mr-3">
                    <i data-feather="cpu" class="text-indigo-600 w-5 h-5"></i>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm max-w-3/4">
                    <p class="text-gray-800">${questions[currentQuestion]}</p>
                </div>
            `;
            chatContainer.appendChild(aiMessage);
            currentQuestion++;
            feather.replace();
            // Auto scroll to bottom
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
        else{

            // All questions answered → hide input + show button
            chatInputSection.classList.add("hidden");
            startFinalProcessing.classList.remove("hidden");

            const finalMessage = document.createElement('div');
            finalMessage.className = 'flex items-start';
            finalMessage.innerHTML = `
                <div class="bg-indigo-100 p-3 rounded-full mr-3">
                    <i data-feather="cpu" class="text-indigo-600 w-5 h-5"></i>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm max-w-3/4">
                    <p class="text-gray-800 font-semibold">
                        Great! I have all the information I need.  
                        Click <strong>Start Processing</strong> to generate your JIRA stories.
                    </p>
                </div>
            `;
            chatContainer.appendChild(finalMessage);
            feather.replace();
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }

    if (sendButton && chatInput) {
        sendButton.addEventListener('click', function() {
            const message = chatInput.value.trim();
            if (message) {
                addUserMessage(message);
                chatInput.value = '';
                setTimeout(() => {
                    addNextQuestion();
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }, 1000);
            }
        });

        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && chatInput.value.trim()) {
                addUserMessage(chatInput.value.trim());
                chatInput.value = '';
                setTimeout(() => {
                    addNextQuestion();
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }, 1000);
            }
        });
    }

     // --- Final Processing Button Logic ---

     if (startFinalProcessing) {
        const finalOriginalText = "Start Processing";

        // Function to replace the final processing button with a "Finished" button
        function showFinishedButton() {
            startFinalProcessing.classList.add("hidden");
            
            const finishedButton = document.createElement('button');
            finishedButton.id = 'finished-button';
            // CHANGED: Replaced hardcoded blue background with the gradient-bg class
            finishedButton.className = 'mt-4 w-full gradient-bg hover:shadow-lg text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-md flex items-center justify-center';
            finishedButton.innerHTML = `
                <span>Finished! Jira Stories Created</span>
                <i data-feather="award" class="ml-2 w-5 h-5"></i>
            `;
            
            // Insert after the original button
            startFinalProcessing.parentNode.insertBefore(finishedButton, startFinalProcessing.nextSibling);
            feather.replace();
        }

        startFinalProcessing.addEventListener('click', async function () {
            
            // 1. Show loading state
            showLoading(startFinalProcessing, finalOriginalText, true);

            try {
                const formData = new FormData();
                uploadedFilesArray.forEach(file => formData.append('file', file));

                // Optional metadata
                formData.append('uploadedBy', 'admin');
                formData.append('jsonPrompt', JSON.stringify({ key: 'value' }));

                const response = await fetch('https://storypilot-backend.onrender.com/api/v1/files/upload-file', {
                    method: 'POST',
                    body: formData
                });
                
                // CASE 2 — Server returned error HTTP status
                if (!response.ok) {
                    // Revert state on error
                    showLoading(startFinalProcessing, finalOriginalText, false);
                    showUIError(`Upload failed! Server returned status ${response.status}.`);
                    return;
                }

                // CASE 3 — Response JSON is broken
                let result = null;
                try {
                    result = await response.json();
                } catch (jsonErr) {
                    // Revert state on error
                    showLoading(startFinalProcessing, finalOriginalText, false);
                    showUIError("Server returned invalid JSON.");
                    return;
                }

                console.log("Server response:", result);

                // CASE 4 — SUCCESS: Show success message and 'Finished' button
                showUISuccess("Data successfully sent to the server and stories are created!");
                showFinishedButton(); // Replace with the finished button

            } catch (error) {
                // CASE 5 — Network error / server unreachable / browser blocked request
                console.error("Upload error:", error);
                // Revert state on error
                showLoading(startFinalProcessing, finalOriginalText, false);
                showUIError("Unexpected error occurred while uploading. Please check console for details.");
            }
        });
    }


});