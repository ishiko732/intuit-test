// Define a type for the sections of the EULA
type EULASection = {
  title: string;
  content: string;
};

// Sample content for each section
const sections: EULASection[] = [
  {
    title: 'Introduction',
    content:
      'This EULA is a legal agreement between the app provider and the user. By using the app, you agree to these terms.',
  },
  {
    title: 'License Grant',
    content:
      'This license is non-exclusive and non-transferable. You are prohibited from reverse engineering or redistributing the app.',
  },
  {
    title: 'User Obligations',
    content:
      'You agree to use the app only for lawful purposes and comply with this EULA.',
  },
  {
    title: 'Intellectual Property',
    content: 'The app and its content are owned by [Your Company Name].',
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
