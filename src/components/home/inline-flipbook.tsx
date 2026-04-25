"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
} from "react";
import HTMLFlipBook from "react-pageflip";

/* ---- Single flip page ---- */
const FlipPage = forwardRef<HTMLDivElement, { src: string }>(
  function FlipPage({ src }, ref) {
    return (
      <div ref={ref} className="flex items-center justify-center bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          className="h-full w-full object-contain"
          draggable={false}
        />
      </div>
    );
  }
);

/* ---- Inline flipbook ---- */
interface InlineFlipbookProps {
  pages?: string[];
  pdfUrl?: string;
}

export function InlineFlipbook({ pages: initialPages, pdfUrl }: InlineFlipbookProps) {
  const [pages, setPages] = useState<string[]>(initialPages ?? []);
  const [loading, setLoading] = useState(!initialPages && !!pdfUrl);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const flipBookRef = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Load PDF if no pre-rendered pages provided
  useEffect(() => {
    if (initialPages || !pdfUrl) return;
    let cancelled = false;

    async function loadPdf() {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url
        ).toString();

        const pdf = await pdfjsLib.getDocument(pdfUrl!).promise;
        if (cancelled) return;

        const rendered: string[] = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const scale = 2;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext("2d")!;
          await page.render({ canvasContext: ctx, viewport, canvas } as any).promise;
          rendered.push(canvas.toDataURL("image/jpeg", 0.85));
          if (cancelled) return;
        }

        setPages(rendered);
        setLoading(false);
      } catch {
        if (!cancelled) {
          setError("Failed to load document");
          setLoading(false);
        }
      }
    }

    loadPdf();
    return () => { cancelled = true; };
  }, [initialPages, pdfUrl]);

  const onFlip = useCallback((e: any) => {
    setCurrentPage(e.data);
  }, []);

  const goNext = useCallback(() => {
    flipBookRef.current?.pageFlip()?.flipNext();
  }, []);

  const goPrev = useCallback(() => {
    flipBookRef.current?.pageFlip()?.flipPrev();
  }, []);

  // Responsive dimensions based on wrapper width
  const [dimensions, setDimensions] = useState({ width: 300, height: 388 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function updateSize() {
      const vw = window.innerWidth;
      setIsMobile(vw < 768);

      const wrapper = wrapperRef.current;
      const availW = wrapper ? wrapper.clientWidth : vw - 48;
      const pageRatio = 8.5 / 11;

      if (vw < 768) {
        // Mobile: single page, use full width
        const w = Math.min(availW - 16, 380);
        const h = Math.round(w / pageRatio);
        setDimensions({ width: w, height: h });
      } else {
        // Desktop: two-page spread, each page is half the container
        const maxSpreadW = Math.min(availW, 900);
        const w = Math.round(maxSpreadW / 2);
        const h = Math.round(w / pageRatio);
        setDimensions({ width: w, height: h });
      }
    }

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div ref={wrapperRef} className="flex flex-col items-center">
      {/* Flipbook container */}
      <div
        className="relative flex items-center justify-center"
        style={{ minHeight: dimensions.height + 20 }}
      >
        {loading && (
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin border-2 border-border border-t-gold" style={{ borderRadius: "50%" }} />
            <p className="font-display text-xs uppercase tracking-[0.2em] text-muted">Loading pages...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-4">
            <p className="font-display text-sm text-red-500">{error}</p>
            {pdfUrl && (
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="font-display text-xs uppercase tracking-[0.2em] text-gold underline">
                Open PDF directly
              </a>
            )}
          </div>
        )}

        {!loading && !error && pages.length > 0 && (
        // @ts-expect-error -- react-pageflip types incomplete for React 19
        <HTMLFlipBook
          ref={flipBookRef}
          width={dimensions.width}
          height={dimensions.height}
          size="fixed"
          minWidth={150}
          maxWidth={500}
          minHeight={200}
          maxHeight={650}
          showCover={true}
          maxShadowOpacity={0.4}
          mobileScrollSupport={true}
          onFlip={onFlip}
          className="flipbook-inline"
          useMouseEvents={true}
          swipeDistance={30}
          clickEventForward={false}
          usePortrait={isMobile}
          startPage={0}
          drawShadow={true}
          flippingTime={600}
          startZIndex={0}
          autoSize={false}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {pages.map((src, i) => (
            <FlipPage key={i} src={src} />
          ))}
        </HTMLFlipBook>
        )}
      </div>

      {/* Controls */}
      {!loading && !error && pages.length > 0 && (
      <div className="mt-6 flex items-center gap-5">
        <button
          onClick={goPrev}
          disabled={currentPage === 0}
          className="flex h-10 w-10 items-center justify-center border border-gold text-gold disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
              d="M12 15L7 10L12 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <span className="font-display text-[11px] uppercase tracking-[0.2em] text-muted">
          {currentPage + 1} / {pages.length}
        </span>

        <button
          onClick={goNext}
          disabled={currentPage >= pages.length - 1}
          className="flex h-10 w-10 items-center justify-center border border-gold text-gold disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
              d="M8 5L13 10L8 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      )}
    </div>
  );
}
