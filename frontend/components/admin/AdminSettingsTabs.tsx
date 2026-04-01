'use client';

import { useRouter } from 'next/navigation';

export type AdminSettingsTabItem = { id: string; label: string };

export default function AdminSettingsTabs({
  basePath,
  tabs,
  activeId,
}: {
  basePath: string;
  tabs: AdminSettingsTabItem[];
  activeId: string;
}) {
  const router = useRouter();
  if (tabs.length <= 1) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Section">
      {tabs.map((tab) => {
        const selected = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selected}
            className={`rounded-xl px-4 py-2 text-sm font-medium border transition-colors ${
              selected
                ? 'bg-white/15 border-white/30 text-white'
                : 'border-white/15 text-white/70 hover:bg-white/10'
            }`}
            onClick={() => router.replace(`${basePath}?tab=${encodeURIComponent(tab.id)}`)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
