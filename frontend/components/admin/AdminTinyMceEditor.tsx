'use client';

import dynamic from 'next/dynamic';

/** Match installed `tinymce` package for CDN plugin/skin resolution. */
const TINYMCE_VERSION = '8.3.2';
const tinymceScriptSrc = `https://cdn.jsdelivr.net/npm/tinymce@${TINYMCE_VERSION}/tinymce.min.js`;

// --- Section: Dynamic TinyMCE editor wrapper (admin rich text) ---

export type AdminTinyMceEditorProps = {
  id?: string;
  value: string;
  onChange: (html: string) => void;
  disabled?: boolean;
  allowEmbeddedCode?: boolean;
  warnPasteSanitize?: boolean;
};

function decodeHtmlEntities(input: string): string {
  if (typeof window === 'undefined' || !input) return input;
  const textarea = document.createElement('textarea');
  textarea.innerHTML = input;
  return textarea.value;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function plainTextToHtml(input: string): string {
  return escapeHtml(input).replace(/\r?\n/g, '<br>');
}

function htmlToPlainText(input: string): string {
  if (!input) return '';
  if (typeof window === 'undefined') return input.replace(/<[^>]*>/g, ' ');
  const doc = new DOMParser().parseFromString(input, 'text/html');
  return (doc.body.textContent ?? '').replace(/\u00a0/g, ' ');
}

const Editor = dynamic(() => import('@tinymce/tinymce-react').then((m) => m.Editor), {
  ssr: false,
  loading: () => (
    <div className="min-h-[240px] rounded-lg border border-white/20 bg-white/5 flex items-center justify-center text-white/50 text-sm">
      Loading editor…
    </div>
  ),
});

export default function AdminTinyMceEditor({
  id,
  value,
  onChange,
  disabled,
  allowEmbeddedCode = false,
  warnPasteSanitize = true,
}: AdminTinyMceEditorProps) {
  return (
    /* ==================== TINYMCE EDITOR ==================== */
    <div className={disabled ? 'opacity-70 pointer-events-none' : ''}>
      <Editor
        id={id ?? 'tinymce-editor'}
        licenseKey="gpl"
        tinymceScriptSrc={tinymceScriptSrc}
        value={value}
        onEditorChange={(content: string) => onChange(content)}
        disabled={disabled}
        init={{
          width: '100%',
          height: 320,
          min_height: 220,
          menubar: false,
          skin: 'oxide-dark',
          content_css: 'dark',
          plugins:
            'autoresize advlist lists link image table charmap anchor searchreplace visualblocks code fullscreen insertdatetime media preview help wordcount paste',
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough superscript subscript | forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist | link image table | removeformat code | pasteplaintext',
          font_family_formats:
            'ZCOOL XiaoWei=ZCOOL XiaoWei,serif; Arial=arial,helvetica,sans-serif; Helvetica=helvetica,sans-serif; Georgia=georgia,palatino,serif; Tahoma=tahoma,arial,helvetica,sans-serif; Times New Roman=times new roman,times,serif; Verdana=verdana,geneva,sans-serif',
          branding: false,
          promotion: false,
          elementpath: false,
          resize: true,
          autoresize_bottom_margin: 12,
          max_height: 560,
          image_title: true,
          automatic_uploads: true,
          image_caption: true,
          paste_as_text: !allowEmbeddedCode,
          paste_data_images: false,
          paste_preprocess: (_plugin, args) => {
            const raw = String(args.content ?? '');
            if (!raw) return;

            if (!allowEmbeddedCode) {
              const plain = htmlToPlainText(decodeHtmlEntities(raw)).trim();
              args.content = plainTextToHtml(plain);
              if (warnPasteSanitize) {
                window.setTimeout(() => {
                  window.alert('Pasted content will be sanitized to plain text. HTML/CSS/JavaScript is removed.');
                }, 0);
              }
              return;
            }

            // Some external sources put escaped HTML on the clipboard (`&lt;p&gt;...`).
            // Decode once so TinyMCE can parse it as real blocks instead of literal tags.
            if (!/&(?:lt|gt|amp|quot|#39);/i.test(raw)) return;
            const decoded = decodeHtmlEntities(raw);
            if (decoded !== raw && /<[a-z][\s\S]*>/i.test(decoded)) {
              args.content = decoded;
            }
          },
          setup: (editor) => {
            const insertClipboardAsPlainText = async () => {
              try {
                if (!navigator?.clipboard?.readText) return;
                const text = await navigator.clipboard.readText();
                if (typeof text !== 'string') return;
                // Keep Unicode as-is; only escape HTML syntax then preserve line breaks.
                editor.insertContent(plainTextToHtml(text));
              } catch {
                // Let browser default paste fallback when clipboard permission is unavailable.
              }
            };

            editor.ui.registry.addButton('pasteplaintext', {
              text: 'Paste Text',
              tooltip: 'Paste plain text (Ctrl+Shift+V)',
              onAction: () => {
                void insertClipboardAsPlainText();
              },
            });

            editor.addShortcut('meta+shift+v', 'Paste plain text', () => {
              void insertClipboardAsPlainText();
            });
            editor.addShortcut('ctrl+shift+v', 'Paste plain text', () => {
              void insertClipboardAsPlainText();
            });
          },
          table_default_attributes: {
            border: '1',
          },
          ...(allowEmbeddedCode
            ? {
                verify_html: false,
                valid_elements: '*[*]',
                extended_valid_elements:
                  'script[type|src|async|defer|charset],style[type|media|scoped],iframe[src|width|height|name|align|allow|allowfullscreen|frameborder|scrolling|class|id|style|title],link[rel|href|type|media|sizes]',
              }
            : null),
          content_style:
            '@import url("https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap"); body { font-family: system-ui, -apple-system, sans-serif; font-size: 15px; line-height: 1.5; }',
        }}
      />
    </div>
  );
}
