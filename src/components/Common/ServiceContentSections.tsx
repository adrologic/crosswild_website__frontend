export type ContentSection = {
  heading?: string;
  subheading?: string;
  body?: string;
  bullets?: string[];
};

export default function ServiceContentSections({ sections }: { sections: ContentSection[] }) {
  return (
    <>
      {sections.map((s, i) => {
        // First section's heading is the page's single <h1>, all subsequent
        // headings are <h2> so we keep one and only one H1 per page.
        const Heading = i === 0 ? 'h1' : 'h2';
        return (
        <div key={i}>
          {s.heading && (
            <Heading className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{s.heading}</Heading>
          )}
          {s.subheading && (
            <p className="font-semibold text-gray-700 dark:text-gray-300 italic mb-4">{s.subheading}</p>
          )}
          {s.body && (
            <div className="space-y-4 text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">
              {s.body.split('\n\n').map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          )}
          {s.bullets && s.bullets.length > 0 && (
            <ul className="space-y-2 mt-4">
              {s.bullets.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        );
      })}
    </>
  );
}
