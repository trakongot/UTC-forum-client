import { Button } from '@/components/ui/button';

const policySections = [
  {
    title: '1. Data Collection',
    content: [
      'Account Information: When you register, we collect your username, email address, and other details to create and manage your account.',
      'User Activities: We track the threads you create, interact with, and share to improve our services.',
      'Device Information: This includes your IP address, browser type, and operating system for analytics and security.',
    ],
  },
  {
    title: '2. Data Usage',
    content: [
      'We use your information to provide and enhance our services.',
      'Personalization: Tailoring content and recommendations based on your activity.',
      'Communication: Responding to inquiries and sending updates about our services.',
    ],
  },
  {
    title: '3. Data Sharing',
    content: [
      'Your information is not shared with third parties except:',
      'To comply with legal obligations.',
      'To enhance service functionality through trusted partners.',
    ],
  },
  {
    title: '4. Security Measures',
    content: [
      "We prioritize your data's security with robust technical measures. However, no system is entirely foolproof, and we encourage users to practice safe online habits.",
    ],
  },
  {
    title: '5. User Control',
    content: [
      'You can update or delete your account through the account settings page.',
      'Contact us to request removal of specific personal data.',
    ],
  },
  {
    title: '6. Contact Information',
    content:
      'For questions or concerns about this Privacy Policy, contact us at support@threadsapp.com.',
  },
];

async function PolicyPage() {
  return (
    <div className="px-24 pb-24">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Privacy policy
        </h1>

        <p className="pt-7">
          Welcome to Threads! Your privacy is important to us. This Privacy
          Policy outlines how we handle your personal information when you use
          our application.
        </p>
      </div>
      <div className="text-left">
        {policySections.map((section, index) => (
          <div key={index} className="mb-8">
            {/* Title Styling */}
            <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-200">
              {section.title}
            </h2>
            {/* Content Styling */}
            <div className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              {Array.isArray(section.content) ? (
                section.content.map((item, idx) => (
                  <p key={idx} className="mb-2">
                    {item}
                  </p>
                ))
              ) : (
                <p>{section.content}</p>
              )}
            </div>
          </div>
        ))}
        <Button variant="outline" className="mt-6">
          Return to Home
        </Button>
      </div>
    </div>
  );
}

export default PolicyPage;
