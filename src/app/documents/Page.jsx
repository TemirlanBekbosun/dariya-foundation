"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Document, Page, pdfjs } from "react-pdf";
import privateDoc from "../../pdf/Firstdocument.pdf";
import ustav from "../../pdf/Seconddocument.pdf";
import { X } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const documents = [
  { title: "Свидетельство о регистрации ", file: privateDoc },
  { title: "Устав фонда ", file: ustav },
];

function PdfModal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = originalOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="modal-overlay" onClick={handleBackgroundClick}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
        >
          <X size={18} />
        </button>
        {title && <h3>{title}</h3>}
        {children}
      </div>
    </div>,
    document.body,
  );
}

export default function DocumentsPage() {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(100); // начальное приближение
  const containerRef = useRef(null);

  // Отслеживаем ширину контейнера для PDF
  const updateWidth = useCallback(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      // Небольшой отступ, чтобы не прилипало вплотную
      setPageWidth(width > 0 ? width : 400);
    }
  }, []);

  useEffect(() => {
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [updateWidth]);

  useEffect(() => {
    // На случай ресайза окна, когда модалка открыта
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  useEffect(() => {
    if (selectedDoc) {
      // Даём браузеру кадр на отрисовку модалки, затем измеряем
      requestAnimationFrame(() => {
        updateWidth();
      });
    }
  }, [selectedDoc, updateWidth]);

  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Документы</span>
        <h1 className="h1">Официальные документы фонда</h1>
        <p className="section__intro">
          Нажмите на документ, чтобы просмотреть его.
        </p>

        <div className="docs-grid">
          {documents.map((doc) => (
            <button
              key={doc.title}
              type="button"
              className="doc-card"
              onClick={() => setSelectedDoc(doc)}
            >
              <div className="doc-card__content">
                <span className="doc-card__icon">📄</span>
                <div>
                  <strong>{doc.title}</strong>
                  <small>PDF</small>
                </div>
              </div>
              <span className="doc-card__arrow">↗</span>
            </button>
          ))}
        </div>

        <PdfModal
          isOpen={Boolean(selectedDoc)}
          onClose={() => setSelectedDoc(null)}
          title={selectedDoc?.title}
        >
          <div className="doc-modal doc-modal--pdf" ref={containerRef}>
            <Document
              file={selectedDoc?.file}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <p className="doc-modal__loading">Загрузка документа…</p>
              }
              error={
                <p className="doc-modal__error">
                  Не удалось загрузить PDF. Попробуйте открыть его{" "}
                  <a
                    href={selectedDoc?.file}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    в новой вкладке
                  </a>
                </p>
              }
            >
              {Array.from(new Array(numPages), (_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={pageWidth}
                />
              ))}
            </Document>
            <p className="doc-modal__note">
              Если документ состоит из нескольких страниц, листайте вниз.
            </p>
          </div>
        </PdfModal>
      </div>
    </section>
  );
}
