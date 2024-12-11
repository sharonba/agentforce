function initEmbeddedMessaging() {
    try {
        window.embeddedservice_bootstrap.settings.language = 'en_US';
        embeddedservice_bootstrap.settings.enableUserInputForConversationWithBot = false;
        window.embeddedservice_bootstrap.init(
            '00DHs00000Clx3e',
            'SDO_Messaging_Innovation_Day_Glitch_Blue_Horizon',
            'https://storm-afedf835096def.my.site.com/ESWSDOMessagingInnovati1730124818682', {
                scrt2URL: 'https://storm-afedf835096def.my.salesforce-scrt.com'
            }
        );
    } catch (err) {
        console.error('Error loading Embedded Messaging: ', err);
    }
}

window.addEventListener("onEmbeddedMessagingReady", () => {
    embeddedservice_bootstrap.settings.targetElement = document.body.querySelector("#embeddedMessagingContainer");
});

// Handle search button click
var query;

function handleSearch() {
    query = document.getElementById('queryInput').value;
    if(query.trim()) {
        //Show the chat modal
        const chatModal = document.getElementById('embeddedMessagingContainer');
        chatModal.classList.add('show');

        //Setting up the prechat form
        embeddedservice_bootstrap.prechatAPI.setVisiblePrechatFields({
            "_firstName": {
                "value": "Lauren",
                "isEditableByEndUser": false
            },
            "_lastName": {
                "value": "Bailey",
                "isEditableByEndUser": false
            },
            "_email": {
                "value": "rshekhar@salesforce.com",
                "isEditableByEndUser": false
            },
            "_subject": {
                "value": query,
                "isEditableByEndUser": true
            }
        });
        embeddedservice_bootstrap.prechatAPI.setHiddenPrechatFields({
            "Prechat_Language": "English"
        });

        embeddedservice_bootstrap.utilAPI.launchChat();//launch the prechat or chat window automatically
    } else {
        alert('Please enter a search query!');
    }
}

window.addEventListener("onEmbeddedMessagingConversationParticipantChanged", (event) => {
    const participantChangedEntry = JSON.parse(event.detail.conversationEntry.entryPayload).entries[0];
    console.log("participantChangedEntry:" + JSON.stringify(participantChangedEntry));

    if(participantChangedEntry.operation === "add" && participantChangedEntry.participant.role === "Chatbot") {
        // Delay the execution by 2 seconds
        setTimeout(() => {
            embeddedservice_bootstrap.utilAPI.sendTextMessage(query);//pass the initial query automatically to ASA
        }, 1500);
    }
});
