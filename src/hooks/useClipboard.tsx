import { useCallback } from 'react';
import { toast } from 'sonner';

export function useClipboard() {
  const fallbackCopy = useCallback((text: string) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;

      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      textarea.style.top = '0';
      textarea.style.left = '0';

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);

      if (!ok) throw new Error();
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Unable to copy');
    }
  }, []);

  const copy = useCallback(
    async (text: string) => {
      //? Prefer native Clipboard API
      if (navigator?.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(text);
          toast.success('Copied to clipboard');
          return;
        } catch (e) {
          console.warn(
            'navigator?.clipboard is undefined, using Fallback method.',
            e
          );
        }
      }

      //? Fallback for iOS Safari
      fallbackCopy(text);
    },
    [fallbackCopy]
  );

  return copy;
}
