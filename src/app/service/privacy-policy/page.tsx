type PrivacySection = {
  title: string;
  content: string;
};

//Sample content for each section
const sections: PrivacySection[] = [
  {
    title: 'Introduction',
    content:
      'This Privacy Policy outlines our commitment to safeguarding your personal information.',
  },
  {
    title: 'Information Collection',
    content:
      'We collect personal and financial information to provide and enhance our services.',
  },
  {
    title: 'Use of Information',
    content:
      'Information collected is used to improve service delivery and process transactions.',
  },
  {
    title: 'Information Sharing and Disclosure',
    content:
      'We share information only under specific conditions, such as with business partners or to comply with the law.',
  },
  // Add more sections as needed
];

export default async function Page() {
  return (
    <>
      <div>
        {sections.map((section) => (
          <div key={section.title}>
            <h1>{section.title}</h1>
            <p>{section.content}</p>
          </div>
        ))}
      </div>
    </>
  );
}
