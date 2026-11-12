import { useEffect } from "react";
import { photoSrc } from "../config/portfolio";
import { site } from "../config/site";

function upsertMeta(name: string, content: string, attribute: "name" | "property" = "name") {
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export function Seo() {
  useEffect(() => {
    document.title = site.title;
    upsertMeta("description", site.description);
    upsertMeta("og:title", site.title, "property");
    upsertMeta("og:description", site.description, "property");
    upsertMeta("og:image", photoSrc(site.heroPhotoId, 1600), "property");

    const data = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: site.photographerName,
      description: site.description,
      url: site.url,
      image: photoSrc(site.heroPhotoId, 1600),
      email: site.email,
      telephone: site.phoneDisplay,
      priceRange: "$75–$400",
      areaServed: "New York City",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Times Square",
        addressLocality: "New York",
        addressRegion: "NY",
        addressCountry: "US",
      },
      sameAs: [site.instagramUrl],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "studio-jsonld";
    script.text = JSON.stringify(data);
    document.getElementById("studio-jsonld")?.remove();
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return null;
}
