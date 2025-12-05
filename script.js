
// Main application script
document.addEventListener('DOMContentLoaded', function() {
    // Show chat module
    const startButton = document.getElementById('start-processing');
    const chatModule = document.getElementById('chat-module');
    
    if (startButton && chatModule) {
        startButton.addEventListener('click', function(e) {
            e.preventDefault();
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
                const chatContainer = document.getElementById('chat-container');
                chatContainer.appendChild(aiMessage);
                feather.replace();
                // Auto scroll to bottom
                chatContainer.scrollTop = chatContainer.scrollHeight;
}, 500);
        });
    }

    // File upload interaction
const fileUpload = document.getElementById('file-upload');
    const uploadSection = document.querySelector('.border-dashed');
    
    if (fileUpload && uploadSection) {
        fileUpload.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
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
            uploadSection.querySelector('p').textContent = files[0].name;
            uploadSection.querySelector('i').setAttribute('data-feather', 'file-text');
            feather.replace();
        }
    }
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Chat interaction logic
    const chatContainer = document.getElementById('chat-container');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const questions = [
        "2. Should the dashboard include dark mode support from the initial release?",
        "3. For the notification system, do you want in-app notifications only or also email/SMS alerts?",
        "4. Would you like me to create subtasks for each story component?"
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
});