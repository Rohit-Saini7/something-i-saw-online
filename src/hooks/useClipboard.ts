import { useCallback } from 'react';
import { toast } from 'sonner';

export function useClipboard() {
  const fallbackCopy = useCallback((text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');

    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.top = '0';
    textarea.style.left = '0';

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);

    if (!ok) {
      throw new Error('Fallback copy failed');
    }
    toast.success('Copied to clipboard');
  }, []);

  const copy = useCallback(
    async (text: string) => {
      try {
        //? Prefer native Clipboard API
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          fallbackCopy(text);
        }

        toast.success('Copied to clipboard');
      } catch (err) {
        console.warn('Clipboard copy failed, falling back', err);

        try {
          fallbackCopy(text);
        } catch {
          toast.error('Unable to copy');
        }
      }
    },
    [fallbackCopy]
  );

  return copy;
}
