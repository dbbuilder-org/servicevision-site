/**
 * Easter Egg Component
 * Renders a hidden HTML comment in the page source for curious developers
 */

export default function EasterEgg() {
  const message = `
================================================================================

    👋 Hey there, curious developer!

    You found our easter egg! We love people who dig into source code.

    We'd love to hear from you! Write us at info@servicevision.net and tell us:

    • What brought you here?
    • What do you find interesting, good, bad, or improvable about our site?
    • Recommend ONE way we could incorporate AI into our site

    Include "SOURCE CODE EXPLORER" in your subject line, and if your feedback
    is thoughtful, we'll send you a $50 gift card as a thank you!

    Built with Next.js, Tailwind CSS, and Vercel
    Design inspired by Tailwind UI

    - The ServiceVision Team

================================================================================
`;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `/* ${message} */`,
      }}
    />
  );
}
