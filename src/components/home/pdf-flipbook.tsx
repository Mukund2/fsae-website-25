"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
} from "react";
import HTMLFlipBook from "react-pageflip";
import { X } from "lucide-react";

/* ---- PDF Page Renderer ---- */
interface PageProps {
  src: string;
  pageNum: number;
}

const FlipPage = forwardRef<HTMLDivElement, PageProps>(function FlipPage(
  { src },
  ref
) {
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
});

/* ---- Main Flipbook Modal ---- */
interface PdfFlipbookProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

export function PdfFlipbook({ pdfUrl, title, onClose }: PdfFlipbookProps) {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const flipBookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load PDF and render pages to canvas
  useEffect(() => {
    let cancelled = false;

    async function loadPdf() {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url
        ).toString();

        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        if (cancelled) return;

        setTotalPages(pdf.numPages);
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
      } catch (err) {
        if (!cancelled) {
          setError("Failed to load newsletter");
          setLoading(false);
        }
      }
    }

    loadPdf();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const onFlip = useCallback((e: any) => {
    setCurrentPage(e.data);
  }, []);

  const goNext = useCallback(() => {
    flipBookRef.current?.pageFlip()?.flipNext();
  }, []);

  const goPrev = useCallback(() => {
    flipBookRef.current?.pageFlip()?.flipPrev();
  }, []);

  // Compute flipbook dimensions from container
  const [dimensions, setDimensions] = useState({ width: 400, height: 560 });

  useEffect(() => {
    function updateSize() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Leave room for header/footer in modal
      const availH = vh - 160;
      const availW = vw - 80;
      // Letter-ish aspect ratio (8.5 x 11)
      const pageRatio = 8.5 / 11;
      let h = Math.min(availH, 700);
      let w = Math.round(h * pageRatio);
      if (w > availW / 2) {
        w = Math.round(availW / 2);
        h = Math.round(w / pageRatio);
      }
      // On mobile, show single page
      if (vw < 768) {
        w = Math.min(availW - 20, 400);
        h = Math.round(w / pageRatio);
      }
      setDimensions({ width: w, height: h });
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Header */}
      <div className="flex w-full items-center justify-between px-6 py-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
            Newsletter
          </p>
          <h3 className="font-display text-lg uppercase tracking-tight text-white md:text-xl">
            {title}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center text-white/70 hover:text-white"
          aria-label="Close"
        >
          <X size={24} />
        </button>
      </div>

      {/* Flipbook area */}
      <div
        ref={containerRef}
        className="flex flex-1 items-center justify-center"
      >
        {loading && (
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin border-2 border-white/20 border-t-gold" style={{ borderRadius: "50%" }} />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
              Loading pages...
            </p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-4">
            <p className="font-mono text-sm text-red-400">{error}</p>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.2em] text-gold underline"
            >
              Open PDF directly
            </a>
          </div>
        )}

        {!loading && !error && pages.length > 0 && (
          // @ts-expect-error -- react-pageflip types incomplete for React 19
          <HTMLFlipBook
            ref={flipBookRef}
            width={dimensions.width}
            height={dimensions.height}
            size="fixed"
            minWidth={200}
            maxWidth={600}
            minHeight={280}
            maxHeight={840}
            showCover={true}
            maxShadowOpacity={0.5}
            mobileScrollSupport={true}
            onFlip={onFlip}
            className="flipbook-container"
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
              <FlipPage key={i} src={src} pageNum={i + 1} />
            ))}
          </HTMLFlipBook>
        )}
      </div>

      {/* Footer controls */}
      <div className="flex w-full items-center justify-center gap-6 px-6 py-4">
        <button
          onClick={goPrev}
          disabled={currentPage === 0}
          className="flex h-10 w-10 items-center justify-center border border-white/20 text-white disabled:opacity-20 disabled:cursor-not-allowed"
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

        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
          {currentPage + 1} / {totalPages}
        </span>

        <button
          onClick={goNext}
          disabled={currentPage >= totalPages - 1}
          className="flex h-10 w-10 items-center justify-center border border-white/20 text-white disabled:opacity-20 disabled:cursor-not-allowed"
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

        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 font-mono text-[11px] uppercase tracking-[0.2em] text-gold hover:text-white"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}
