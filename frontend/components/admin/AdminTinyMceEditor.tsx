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
            'autoresize advlist lists link image table charmap anchor searchreplace visualblocks code fullscreen insertdatetime media preview help wordcount formatpainter',
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough superscript subscript formatpainter | forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist | link image table | removeformat code',
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
          table_default_attributes: {
            border: '1',
          },
          content_style:
            '@import url("https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap"); body { font-family: system-ui, -apple-system, sans-serif; font-size: 15px; line-height: 1.5; }',
        }}
      />
    </div>
  );
}
