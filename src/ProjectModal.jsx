/**
 * ProjectModal.jsx — Expanded project detail view.
 *
 * Example usage:
 *   import ProjectModal from './ProjectModal';
 *   <ProjectModal project={projects[0]} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
 */

import React, { useState, useEffect, useCallback } from 'react';

export default function ProjectModal({ project, isOpen, onClose }) {
  // --- Carousel state ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset slide index when project changes
  useEffect(() => {
    setCurrentSlide(0);
    setImageLoaded(false);
  }, [project]);

  const mediaLength = project?.media?.length ?? 0;
  const hasMultipleSlides = mediaLength > 1;

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(mediaLength - 1, prev + 1));
  }, [mediaLength]);

  const handleSlideChange = useCallback((newIndex) => {
    setImageLoaded(false);
    setCurrentSlide(newIndex);
  }, []);

  // --- Lock body scroll, Escape to close, arrow keys for carousel ---
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasMultipleSlides) goToPrev();
      if (e.key === 'ArrowRight' && hasMultipleSlides) goToNext();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, hasMultipleSlides, goToPrev, goToNext]);

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

  // --- Render a single media slide inside a fixed-height container ---
  const renderSlide = (item) => {
    if (item.type === 'video') {
      return (
        <div className="h-[60vh] w-full border border-silver/30 bg-noir overflow-hidden">
          <video
            key={item.src}
            src={item.src}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            aria-label={item.alt}
          />
        </div>
      );
    }

    // type === 'image' || type === 'gif'
    return (
      <div className="h-[60vh] w-full border border-silver/30 bg-noir overflow-hidden relative">
        {/* Skeleton loader — visible until image fires onLoad */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-silver/20 animate-pulse" />
        )}
        <img
          key={item.src}
          src={item.src}
          alt={item.alt}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
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

          {/* --- Media carousel --- */}
          {media && media.length > 0 && (
            <div>
              {/* Slide + hover-reveal arrows */}
              <div className="relative group/carousel">
                {/* Active slide */}
                {renderSlide(media[currentSlide])}

                {/* Hover-reveal arrows — hidden for single image */}
                {hasMultipleSlides && (
                  <>
                    {/* Left arrow — fully absent at first slide */}
                    {currentSlide > 0 && (
                      <button
                        onClick={() => handleSlideChange(currentSlide - 1)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10
                                   w-10 h-10 rounded-full bg-noir border border-silver
                                   flex justify-center items-center text-paper
                                   hover:bg-paper hover:text-noir transition-all duration-300 shadow-2xl
                                   opacity-0 group-hover/carousel:opacity-100"
                        aria-label="Previous slide"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 stroke-2">
                          <path strokeLinecap="square" strokeLinejoin="miter" d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                      </button>
                    )}

                    {/* Right arrow — fully absent at last slide */}
                    {currentSlide < mediaLength - 1 && (
                      <button
                        onClick={() => handleSlideChange(currentSlide + 1)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10
                                   w-10 h-10 rounded-full bg-noir border border-silver
                                   flex justify-center items-center text-paper
                                   hover:bg-paper hover:text-noir transition-all duration-300 shadow-2xl
                                   opacity-0 group-hover/carousel:opacity-100"
                        aria-label="Next slide"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 stroke-2">
                          <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Counter + dots — always visible below image, hidden for single image */}
              {hasMultipleSlides && (
                <div className="mt-3 flex items-center justify-center gap-4">
                  {/* Counter */}
                  <span className="font-mono text-xs text-gray-500 tracking-widest">
                    [ {String(currentSlide + 1).padStart(2, '0')} / {String(mediaLength).padStart(2, '0')} ]
                  </span>

                  {/* Dot indicators */}
                  <div className="flex items-center gap-1.5">
                    {media.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSlideChange(idx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                          idx === currentSlide
                            ? 'bg-paper scale-125'
                            : 'bg-gray-600 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
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
