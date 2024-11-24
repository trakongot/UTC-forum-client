import { ScrollArea } from "@/components/ui/scroll-area";

async function TermsAndCondition() {
  const termsContent = [
    {
      title: "1. Introduction",
      content:
        "Welcome to Threads! By accessing or using our app, you agree to these terms and conditions. Please read them carefully before using our services.",
    },
    {
      title: "2. User Responsibilities",
      content:
        "You are responsible for maintaining the confidentiality of your account and ensuring all activities under your account comply with our guidelines.",
    },
    {
      title: "3. Prohibited Activities",
      content: [
        "Posting content that is illegal, abusive, or harmful.",
        "Engaging in activities that harm or exploit other users.",
        "Attempting to hack or disrupt our services.",
      ],
    },
    {
      title: "4. Termination of Services",
      content:
        "We reserve the right to suspend or terminate your account if you violate our terms or engage in prohibited activities.",
    },
    {
      title: "5. Changes to Terms",
      content:
        "Threads may update these terms at any time. We encourage you to review this page periodically for updates.",
    },
    {
      title: "6. Contact Us",
      content:
        "If you have any questions about these terms, please contact us at: legal@threadsapp.com.",
    },
  ];

  return (
    <ScrollArea className="h-[800px] pb-24 px-24">
      <section className="bg-gray-50 dark:bg-slate-800" id="terms">
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Terms and Conditions
            </h1>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Effective Date: January 1, 2024
            </p>
          </div>

          <div className="space-y-6">
            {termsContent.map((section, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {section.title}
                </h2>
                {Array.isArray(section.content) ? (
                  <ul className="mt-3 list-disc pl-6 text-gray-600 dark:text-slate-400">
                    {section.content.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-gray-600 dark:text-slate-400">
                    {section.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScrollArea>
  );
}

export default TermsAndCondition;
