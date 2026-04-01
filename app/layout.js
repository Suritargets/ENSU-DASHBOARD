import './globals.css';

export const metadata = {
  title: 'ENSU N.V. — Intern Dashboard',
  description: 'Engineering Surveys · Intern Rapportage & PM Evaluatie · Paramaribo, Suriname',
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body className="bg-gray-950 text-gray-100 antialiased">{children}</body>
    </html>
  );
}
