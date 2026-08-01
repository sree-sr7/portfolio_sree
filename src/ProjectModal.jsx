/**
 * ProjectModal.jsx — Expanded project detail view.
 *
 * Example usage:
 *   import ProjectModal from './ProjectModal';
 *   <ProjectModal project={projects[0]} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
 */

import React, { useEffect } from 'react';

export default function ProjectModal({ project, isOpen, onClose }) {
  // --- Lock body scroll & listen for Escape ---
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const {
    number,
    title,
    category,
    stack,
    desc,
    longDescription,
    media,
    repoUrl,
    repoVisibility,
    demoUrl,
  } = project;

  // --- Media renderer ---
  const renderMedia = (item, idx) => {
    const sharedClasses =
      'w-full object-cover border border-silver/30';

    if (item.type === 'video') {
      return (
        <video
          key={idx}
          src={item.src}
          autoPlay
          muted
          loop
          playsInline
          className={sharedClasses}
          aria-label={item.alt}
        />
      );
    }

    // type === 'image' || type === 'gif'
    return (
      <img
        key={idx}
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className={sharedClasses}
      />
    );
  };

  return (
    // --- Backdrop ---
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* --- Modal panel --- */}
      <div
        className="relative bg-noir border border-silver w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col
                   [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-noir [&::-webkit-scrollbar-thumb]:bg-silver [&::-webkit-scrollbar-thumb]:rounded-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ====== HEADER ====== */}
        <div className="sticky top-0 z-10 bg-noir/95 backdrop-blur-sm border-b border-silver/30 p-8 pb-6">
          {/* Top row: number · badge · close */}
          <div className="flex justify-between items-start w-full mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-gray-500">
                {number}
              </span>
              <span className="font-mono text-xs border border-silver px-2 py-1 rounded-full text-gray-400 uppercase">
                {category}
              </span>
            </div>

            <button
              onClick={onClose}
              className="text-sm font-mono text-gray-500 font-bold hover:text-paper hover:underline underline-offset-4 decoration-2 transition-colors"
            >
              [ CLOSE ]
            </button>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-paper leading-tight">
            {title}
          </h2>
        </div>

        {/* ====== BODY ====== */}
        <div className="p-8 pt-6 flex flex-col gap-8">
          {/* Long description */}
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            {longDescription || desc}
          </p>

          {/* --- Media --- */}
          {media && media.length > 0 && (
            <div
              className={
                media.length === 1
                  ? ''
                  : 'grid grid-cols-1 sm:grid-cols-2 gap-4'
              }
            >
              {media.map((item, idx) => renderMedia(item, idx))}
            </div>
          )}

          {/* --- Tech stack tags --- */}
          <div className="pt-6 border-t border-silver/30">
            <span className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3 block">
              Stack
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-3">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="text-sm font-mono text-gray-500 font-bold"
                >
                  [{tech}]
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ====== FOOTER ====== */}
        <div className="p-8 pt-0">
          <div className="pt-6 border-t border-silver/30 flex flex-wrap items-center gap-4">
            {/* Repo link or private notice */}
            {repoVisibility === 'public' && repoUrl ? (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono font-bold text-gray-400 border border-silver px-4 py-2 rounded-full
                           hover:bg-paper hover:text-noir hover:border-paper transition-all duration-300 uppercase"
              >
                [ VIEW REPOSITORY ]
              </a>
            ) : repoVisibility === 'private' ? (
              <span className="text-sm font-mono font-bold text-gray-500 border border-silver/30 px-4 py-2 rounded-full uppercase select-none">
                [ PRIVATE REPOSITORY — AVAILABLE ON REQUEST ]
              </span>
            ) : null}

            {/* Demo link */}
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono font-bold text-gray-400 border border-silver px-4 py-2 rounded-full
                           hover:bg-paper hover:text-noir hover:border-paper transition-all duration-300 uppercase"
              >
                [ LIVE DEMO ]
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
