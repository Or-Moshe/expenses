const express = require('express');
const router = express.Router();

const { getExpensesDetails } = require('../controllers/openai');
const { storeExpenses } = require('../controllers/mongo');
const { handleSaveCategoriesGoals, handleStoreExpenses } = require('../handlers/handler');

router.post('/storeExpenses', handleStoreExpenses);
router.post('/saveCategoriesGoals', handleSaveCategoriesGoals);

router.post('/webhook', (req, res) => {
    try {
        console.log("body", JSON.stringify(req.body));
        const entries = req.body.entry; // Get the "entry" array
        
        if (entries && entries.length > 0) {
            entries.forEach(entry => {
                const changes = entry.changes;

                if (changes && changes.length > 0) {
                    changes.forEach(change => {
                        const value = change.value;

                        if (value.messages && value.messages.length > 0) {
                            value.messages.forEach(message => {
                                if (message.type === 'text') {
                                    const senderPhone = message.from; // Sender's phone number
                                    const messageText = message.text.body; // Text message content
                                    console.log(`Message received from ${senderPhone}: ${messageText}`);
                                }
                            });
                        }
                    });
                }
            });
        }

        res.sendStatus(200); // Acknowledge the webhook
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.sendStatus(500);
    }
});

// Export the router
module.exports = router; 