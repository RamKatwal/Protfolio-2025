"use client";

import { Globe } from "lucide-react";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";

interface UrlMetadata {
  title: string | null;
  description: string | null;
  favicon: string | null;
  website_name: string | null;
  website_image: string | null;
  url: string;
}

interface LinkPreviewProps {
  href: string;
  children: ReactNode | string | null;
  className?: string;
}

const isEmail = (str: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);

const isValidHttpUrl = (str: string): boolean => {
  try {
    const url = new URL(str);
    return /^(http|https):$/.test(url.protocol);
  } catch {
    return false;
  }
};

export function LinkPreview({
  href,
  children,
  className = "cursor-pointer rounded-md bg-gray-100 px-2 py-0.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 hover:text-gray-900 inline-block",
}: LinkPreviewProps) {
  const elementRef = useRef<HTMLAnchorElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [validFavicon, setValidFavicon] = useState(true);
  const [validImage, setValidImage] = useState(true);
  const [metadata, setMetadata] = useState<UrlMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const isValidUrl =
    href &&
    isValidHttpUrl(href) &&
    !isEmail(href) &&
    !href.startsWith("mailto:");

  // Fetch metadata when in view
  useEffect(() => {
    if (!isInView || !isValidUrl || metadata) return;

    let isMounted = true;

    async function fetchMetadata() {
      setIsLoading(true);
      setError(null);

      try {
        // Use a CORS proxy to fetch the URL
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(href)}`;
        
        // Suppress browser extension errors
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(proxyUrl, {
          signal: controller.signal,
          headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          },
        }).catch((fetchError) => {
          // Suppress extension-related errors
          if (fetchError.name === 'AbortError') {
            throw new Error("Request timeout");
          }
          throw fetchError;
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error("Failed to fetch URL");
        }

        const html = await response.text();

        // Extract metadata from HTML
        const getMetaTag = (name: string): string | null => {
          const patterns = [
            new RegExp(
              `<meta[^>]*property=["']${name}["'][^>]*content=["']([^"']*)["']`,
              "i"
            ),
            new RegExp(
              `<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']*)["']`,
              "i"
            ),
            new RegExp(
              `<meta[^>]*content=["']([^"']*)["'][^>]*property=["']${name}["']`,
              "i"
            ),
            new RegExp(
              `<meta[^>]*content=["']([^"']*)["'][^>]*name=["']${name}["']`,
              "i"
            ),
          ];

          for (const pattern of patterns) {
            const match = html.match(pattern);
            if (match) return match[1];
          }
          return null;
        };

        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        const urlObj = new URL(href);

        const data: UrlMetadata = {
          title:
            getMetaTag("og:title") ||
            getMetaTag("twitter:title") ||
            titleMatch?.[1] ||
            null,
          description:
            getMetaTag("og:description") ||
            getMetaTag("twitter:description") ||
            getMetaTag("description") ||
            null,
          website_image:
            getMetaTag("og:image") || getMetaTag("twitter:image") || null,
          favicon:
            getMetaTag("icon") ||
            getMetaTag("shortcut icon") ||
            `${urlObj.origin}/favicon.ico`,
          website_name: getMetaTag("og:site_name") || urlObj.hostname,
          url: href,
        };

        if (isMounted) {
          setMetadata(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          // Suppress browser extension errors
          const error = err as Error;
          if (error.message?.includes('runtime.lastError') || 
              error.message?.includes('Receiving end does not exist')) {
            // Silently ignore browser extension errors
            setIsLoading(false);
            return;
          }
          
          // If proxy fails, show basic URL info as fallback
          try {
            const urlObj = new URL(href);
            setMetadata({
              title: urlObj.hostname,
              description: null,
              favicon: `${urlObj.origin}/favicon.ico`,
              website_name: urlObj.hostname,
              website_image: null,
              url: href,
            });
            setIsLoading(false);
          } catch (fallbackErr) {
            setError(error);
            setIsLoading(false);
          }
        }
      }
    }

    fetchMetadata();

    return () => {
      isMounted = false;
    };
  }, [isInView, isValidUrl, href, metadata]);

  // Set up intersection observer to detect when element is in view
  useEffect(() => {
    const element = elementRef.current;
    if (!element || !href) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      {
        rootMargin: "100px", // Start fetching 100px before element comes into view
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [href]);

  if (!href) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          ref={elementRef}
          href={href}
          className={className}
          rel="noopener noreferrer"
          target="_blank"
        >
          {children}
        </a>
      </TooltipTrigger>
      <TooltipContent className="max-w-[280px] border border-zinc-700 bg-zinc-900 p-3 text-white shadow-lg">
        {isLoading ? (
          <div className="flex justify-center p-5">
            <div className="size-5 animate-spin rounded-full border-2 border-zinc-700 border-t-white" />
          </div>
        ) : error || !isValidUrl ? (
          <div className="flex items-center gap-2 p-3 text-red-400">
            <Globe className="size-4" />
            <span className="text-sm">
              {!isValidUrl ? "Invalid URL" : "Failed to load preview"}
            </span>
          </div>
        ) : metadata ? (
          <div className="flex w-full flex-col gap-2">
            {/* Website Image */}
            {metadata.website_image && validImage && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={metadata.website_image}
                  alt="Website preview"
                  fill
                  className="rounded-lg object-cover"
                  onError={() => setValidImage(false)}
                />
              </div>
            )}

            {/* Website Name & Favicon */}
            {(metadata.website_name || (metadata.favicon && validFavicon)) && (
              <div className="flex items-center gap-2">
                {metadata.favicon && validFavicon ? (
                  <Image
                    width={20}
                    height={20}
                    alt="Favicon"
                    className="size-5 rounded-full"
                    src={metadata.favicon}
                    onError={() => setValidFavicon(false)}
                  />
                ) : (
                  <Globe className="size-5 text-gray-400" />
                )}
                {metadata.website_name && (
                  <div className="truncate text-sm font-semibold">
                    {metadata.website_name}
                  </div>
                )}
              </div>
            )}

            {/* Title */}
            {metadata.title && (
              <div className="truncate text-sm font-medium text-white">
                {metadata.title}
              </div>
            )}

            {/* Description */}
            {metadata.description && (
              <div className="line-clamp-3 text-xs text-gray-400 w-full">
                {metadata.description}
              </div>
            )}

            {/* URL Link */}
            <div className="truncate text-xs text-primary">
              {href.replace("https://", "").replace("http://", "")}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 p-3">
            <Globe className="size-4 text-gray-400" />
            <span className="text-sm text-gray-400">No preview available</span>
          </div>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
