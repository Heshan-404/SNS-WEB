// app/products/MainContent.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function MainContentInternal({ children }: { children: React.ReactNode }) {
  // This hook will re-render this component when the search params change
  const searchParams = useSearchParams();

  // We create a key that is unique to the current URL's query string
  // The .toString() is important!
  const key = searchParams.toString();

  return (
    // By giving the main element a key, we tell React to discard the old
    // one and create a new one when the filters/page change.
    // This forces the Suspense boundary (your loading.tsx) to trigger.
    <main key={key} className="flex-1 p-4 md:p-0 md:mt-8">
      {children}
    </main>
  );
}

// We wrap our component in a Suspense boundary because useSearchParams
// needs it when used in a page that is statically rendered.
export default function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <MainContentInternal>{children}</MainContentInternal>
    </Suspense>
  )
}