import express from 'express';
const router = express.Router();

router.get('/faqs', (req, res) => {
  res.json([
    { q: 'How do I request blood?', a: 'Go to the Request Blood tab, fill in your details, and submit the form.' },
    { q: 'How can I check if I am eligible to donate blood?', a: 'Use the Eligibility tab to complete the checklist.' },
    { q: 'Can I edit my profile?', a: 'Yes. Go to the Profile tab and click Save Changes after editing.' },
    { q: 'How will I receive blood?', a: 'Once a matching donor is found, you will be contacted through your registered details.' },
    { q: 'What should I do if I entered wrong information?', a: 'Go to Profile and update your information or contact support.' },
    { q: 'Are my medical details secure?', a: 'Yes, your data is protected and only used for blood matching and support.' },
    { q: 'How do I know if a donor has responded?', a: 'You will receive a notification in the Notifications tab.' },
    { q: 'Can I cancel a request?', a: 'Yes, visit the My Requests tab and click Cancel on the request you wish to delete.' },
    { q: 'What does “Urgent” mean when requesting?', a: 'It signals high priority, and the system tries to alert nearby donors faster.' }
  ]);
});

export default router;
