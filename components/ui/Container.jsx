/**
 * Container — consistent page max-width wrapper.
 * Replaces the copy-pasted `const shell` in every page.
 */
export default function Container({ children, className = "" }) {
  return (
    <div className={`relative mx-auto w-full max-w-shell px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}
