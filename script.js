function initEmbeddedMessaging() {
		try {
			embeddedservice_bootstrap.settings.language = 'en_US'; // For example, enter 'en' or 'en-US'

			embeddedservice_bootstrap.init(
				'00DHp00000G1Y0d',
				'SDO_Messaging_for_Web',
				'https://storm-4e92a595745941.my.site.com/ESWSDOMessagingforWeb1732454419616',
				{
					scrt2URL: 'https://storm-4e92a595745941.my.salesforce-scrt.com'
				}
			);
		} catch (err) {
			console.error('Error loading Embedded Messaging: ', err);
		}
	};

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
