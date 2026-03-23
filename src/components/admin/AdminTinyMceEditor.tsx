'use client';

import dynamic from 'next/dynamic';

/** Match installed `tinymce` package for CDN plugin/skin resolution. */
const TINYMCE_VERSION = '8.3.2';
const tinymceScriptSrc = `https://cdn.jsdelivr.net/npm/tinymce@${TINYMCE_VERSION}/tinymce.min.js`;

export type AdminTinyMceEditorProps = {
  id?: string;
  value: string;
  onChange: (html: string) => void;
  disabled?: boolean;
};

const Editor = dynamic(() => import('@tinymce/tinymce-react').then((m) => m.Editor), {
  ssr: false,
  loading: () => (
    <div className="min-h-[240px] rounded-lg border border-white/20 bg-white/5 flex items-center justify-center text-white/50 text-sm">
      Loading editor…
    </div>
  ),
});

export default function AdminTinyMceEditor({ id, value, onChange, disabled }: AdminTinyMceEditorProps) {
  return (
    <div className={disabled ? 'opacity-70 pointer-events-none' : ''}>
      <Editor
        id={id ?? 'tinymce-editor'}
        licenseKey="gpl"
        tinymceScriptSrc={tinymceScriptSrc}
        value={value}
        onEditorChange={(content: string) => onChange(content)}
        disabled={disabled}
        init={{
          height: 280,
          min_height: 200,
          menubar: false,
          skin: 'oxide-dark',
          content_css: 'dark',
          plugins: 'lists link autoresize code',
          toolbar:
            'undo redo | blocks | bold italic underline strikethrough | alignleft aligncenter alignright | bullist numlist | link removeformat | code',
          branding: false,
          promotion: false,
          elementpath: false,
          resize: true,
          autoresize_bottom_margin: 12,
          max_height: 560,
          content_style: 'body { font-family: system-ui, -apple-system, sans-serif; font-size: 15px; line-height: 1.5; }',
        }}
      />
    </div>
  );
}
