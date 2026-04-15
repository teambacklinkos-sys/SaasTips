import { useState } from 'react';
import { Share2, Copy, Check, X as XIcon, Globe, ExternalLink } from 'lucide-react';
import Modal from '../ui/Modal';
import { useModal } from '../../context/ModalContext';
import { useToast } from '../../context/ToastContext';

export default function ShareModal() {
  const { modal, payload, closeModal } = useModal();
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  const isOpen = modal === 'share';
  const title = payload?.title || 'SaaSTips Article';
  const url = payload?.url || window.location.href;

  const handleClose = () => {
    closeModal();
    setTimeout(() => setCopied(false), 300);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      addToast('Link copied to clipboard!', 'info');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast('Could not copy — please copy the URL manually.', 'error');
    }
  };

  const encTitle = encodeURIComponent(title);
  const encUrl = encodeURIComponent(url);

  const socials = [
    {
      label: 'Share on X',
      icon: XIcon,
      href: `https://twitter.com/intent/tweet?text=${encTitle}&url=${encUrl}`,
      color: 'hover:bg-slate-900 hover:text-white',
    },
    {
      label: 'Share on LinkedIn',
      icon: Globe,
      href: `https://www.linkedin.com/shareArticle?mini=true&title=${encTitle}&url=${encUrl}`,
      color: 'hover:bg-blue-700 hover:text-white',
    },
    {
      label: 'Open article',
      icon: ExternalLink,
      href: url,
      color: 'hover:bg-slate-100 hover:text-slate-900',
    },
  ];

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="p-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4">
            <Share2 size={22} className="text-indigo-600" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">Share this article</h2>
          <p className="text-slate-500 text-sm mt-1 line-clamp-2 max-w-xs">{title}</p>
        </div>

        {/* Copy link */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 mb-4">
          <span className="flex-1 text-xs text-slate-500 truncate">{url}</span>
          <button
            onClick={handleCopy}
            className={`shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition
              ${copied
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
          >
            {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy</>}
          </button>
        </div>

        {/* Social buttons */}
        <div className="flex flex-col gap-2">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 transition ${s.color}`}
              >
                <Icon size={16} />
                {s.label}
              </a>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
