import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  structuredData?: object;
}

/**
 * A component that dynamically updates document head tags for SEO.
 * It handles title, meta tags, Open Graph, Twitter Cards, and JSON-LD structured data.
 * This component does not render any visible elements.
 */
const SEO: React.FC<SEOProps> = ({ title, description, keywords, ogImage, structuredData }) => {
  
  /**
   * Helper function to find or create a meta tag and update its content.
   * @param {string} identifier - The value of the 'name' or 'property' attribute.
   * @param {string} content - The new content for the tag.
   * @param {'name' | 'property'} attr - The attribute to use for identifying the tag.
   */
  const updateMetaTag = (identifier: string, content: string, attr: 'name' | 'property' = 'name') => {
    let element = document.querySelector(`meta[${attr}='${identifier}']`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attr, identifier);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Update Standard Meta Tags
    updateMetaTag('description', description);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // 3. Update Open Graph (for Facebook, LinkedIn, etc.)
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    if (ogImage) {
      updateMetaTag('og:image', ogImage, 'property');
    }

    // 4. Update Twitter Card Tags
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    if (ogImage) {
      updateMetaTag('twitter:image', ogImage);
    }

    // 5. Handle JSON-LD Structured Data
    const scriptId = 'structured-data-script';
    // FIX: Cast element to HTMLScriptElement to allow setting the 'type' property.
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    if (structuredData) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = scriptId;
        document.head.appendChild(scriptElement);
      }
      scriptElement.type = 'application/ld+json';
      scriptElement.innerHTML = JSON.stringify(structuredData);
    } else if (scriptElement) {
      // Clean up the script tag if no structured data is provided on a subsequent render
      scriptElement.remove();
    }

  }, [title, description, keywords, ogImage, structuredData]);

  return null; // This component does not render anything to the DOM
};

export default SEO;