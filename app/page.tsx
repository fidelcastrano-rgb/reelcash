import type { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';

export const metadata: Metadata = {
  title: 'Prop Money & Australian Prop Money For Sale | Realistic Movie Props',
  description: 'Buy premium realistic prop money and Australian prop money for film, TV, photography, and training. High-fidelity, non-reflective replica currency stacks in USD, GBP, and EUR.',
  alternates: {
    canonical: 'https://reelbills.com',
  },
  keywords: [
    'Prop Money',
    'Australian Prop Money',
    'Realistic Prop Money',
    'Movie Prop Money',
    'Prop Money For Sale',
    'film prop money',
    'TV prop money',
    'Production prop money',
    'Photography prop money',
    'Australian movie props',
    'Realistic prop notes',
    'Replica prop currency',
    'Film production supplies',
    'Theatre production props',
    'Training simulation props'
  ],
  openGraph: {
    title: 'Prop Money & Australian Prop Money For Sale | Reel Cash',
    description: 'Premium realistic prop money and dynamic Australian prop money for productions. Tactical intaglio color plating, 70% cotton-linen blends with non-glare finish.',
    url: 'https://reelbills.com',
    type: 'website',
    images: [
      {
        url: 'https://reelbills.com/IMGIYUTRT.png',
        width: 1200,
        height: 630,
        alt: 'Reel Cash & Co Premium Replicas'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prop Money & Australian Prop Money For Sale | Real Tactile Replicas',
    description: 'Buy high-fidelity prop money and Australian prop money designed with non-reflective matte coat for 4K video shoots.',
    images: ['https://reelbills.com/IMGIYUTRT.png']
  }
};

export default function Page() {
  const unifiedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://reelbills.com/#organization",
        "name": "Reel Cash and Currency",
        "alternateName": "Reel Bills Inc",
        "url": "https://reelbills.com",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://reelbills.com/#logo",
          "url": "https://reelbills.com/IMGIYUTRT.png",
          "caption": "Reel Cash and Currency Corporate Logo"
        },
        "image": {
          "@id": "https://reelbills.com/#logo"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "availableLanguage": "en"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://reelbills.com/#website",
        "url": "https://reelbills.com",
        "name": "Reel Cash and Currency",
        "description": "Prop Money & Australian Prop Money for Film Productions",
        "publisher": {
          "@id": "https://reelbills.com/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://reelbills.com/products?search={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://reelbills.com/#localbusiness",
        "name": "Reel Cash and Currency",
        "image": "https://reelbills.com/IMGIYUTRT.png",
        "url": "https://reelbills.com",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Melbourne",
          "addressRegion": "VIC",
          "postalCode": "3000",
          "addressCountry": "AU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -37.8136,
          "longitude": 144.9631
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://reelbills.com/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://reelbills.com"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://reelbills.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is prop money and why is realistic prop money preferred for filming?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Prop money refers to high-fidelity, printed replica banknotes engineered primarily for movie, television, and photography productions. Realistic prop money is crucial because modern 4K and 8K ultra-high-definition film cameras easily catch pixelation, flat surfaces, and unrealistic paper glare. Choosing premium realistic replica money ensures movie sets maintain high cinematic standards and full aesthetic realism under intense spot arrays."
            }
          },
          {
            "@type": "Question",
            "name": "Where can I find high-quality Australian prop money for sale that complies with film laws?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If you are looking for compliant Australian prop money for sale, Reel Cash offers the world's most trusted theatrical play banknotes specifically designed for television productions, theatrical performances, and corporate financial drills. Every replica Australian note features clear, permanent regulatory markings indicating its status as movie props, satisfying play money rules while preserving high-definition under-camera fidelity."
            }
          },
          {
            "@type": "Question",
            "name": "What makes your realistic prop money look identical to real currency under a camera pan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our premium realistic prop money is manufactured using a specialty 70% raw cotton and 30% linen fiber substrate instead of standard wood-pulp paper. This gives the notes an authentic tactile cash crackle and correct density. Additionally, raised intaglio plate color-printing matches accurate color profiles, and a non-reflective matte sealing finish prevents artificial light reflection. The result is completely undetectable movie prop money under close-ups and fast pans."
            }
          },
          {
            "@type": "Question",
            "name": "Is it legal to buy movie prop money online, and what regulatory standards do they follow?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, buying and owning movie prop money is entirely legal when used for lawful purposes including theatrical stages, film productions, educational training, and private novelty collections. Our replica banknotes comply with all international currency reproduction regulations. They are printed with alternative, non-matching design details, feature single-sided or double-sided compliance overlays, and use modified features to prevent misuse while guaranteeing under-camera excellence."
            }
          },
          {
            "@type": "Question",
            "name": "Does your Australian prop money feature double-sided micro-engraving?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. Our top-tier Australian prop money is detailed with high-precision double-sided lithographic micro-printing that ensures correct face-to-back configuration. These prop banknotes match the exact red-orange color spectrums of standard polymer currencies, making them a preferred choice for production designers looking for realistic prop notes and theatrical cash stacks."
            }
          },
          {
            "@type": "Question",
            "name": "Can realistic prop money for sale resist standard iodine teller detection pens?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our advanced realistic prop money is formulated to possess premium fiber structures that do not react with standard chemical teller pens (the iodine markers stay amber/yellow instead of turning dark purple or black). This chemical behavior makes them highly reliable for commercial cash teller training, security response simulations, and intense close-up banking scenes."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use movie prop money stacks in commercial cash-counting machines?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Because our realistic prop notes are engineered with precise mechanical thickness, tensile stiffness, and balanced friction coefficients, they stand up to high-speed commercial rollers and counting machines. They flow smoothly through bank gears and counting systems without wrinkling or causing mechanical jams."
            }
          },
          {
            "@type": "Question",
            "name": "How fast is delivery when ordering prop money for sale for an active film studio?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer rapid worldwide shipping vectors with anonymous dispatch within 24 hours of confirmation. All orders of movie prop money are vacuum-sealed inside sterile opaque double-kraft cardboard packages to protect them against ambient humidity and shipping wear. Tracking codes are updated securely so your production timeline stays on track."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between cheap novelty notes and our premium production prop money?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Cheap novelty notes are printed on standard wood-pulp copier paper, which is excessively stiff and produces a major 'paper sheen' or highlight glare under studio lighting. Our premium movie prop money uses true archival cotton-blend substrates with intaglio color plating. Our notes hold a deep matte finish that absorbs light, feels correct, and sounds identical to real cash during handled fanning or counting."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer volume discounts for large corporate simulations and studio bulk orders?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we offer extensive bulk pricing and highly customized currency stack packages for big-budget film productions, international TV networks, global military training simulation programs, and financial education centers. You can easily configure and order replica currency stacks, wrapped bank teller bricks, and custom bundles under our secure checkout catalog."
            }
          }
        ]
      },
      {
        "@type": "CollectionPage",
        "@id": "https://reelbills.com/#collection",
        "name": "Premium Prop Money & Australian Prop Money Catalog",
        "url": "https://reelbills.com/products",
        "description": "Exquisite catalog of high-fidelity replica banknotes, realistic prop notes, and theatrical cash stacks for film, TV, and professional simulation training.",
        "hasPart": [
          {
            "@type": "Product",
            "name": "USD $100 Master Replica (New Series)",
            "image": "https://propcounterfeitnotes.com/public/upload/product/buy-100-us-dollar-bills.224webp",
            "description": "Ultra-realistic $100 US Dollar prop money banknotes designed with non-reflective matte sealing, intaglio relief detail, and premium raw cotton-linen substrates.",
            "sku": "PROP-USD-100",
            "offers": {
              "@type": "Offer",
              "url": "https://reelbills.com/products/100-usd-prop-notes-stack",
              "priceCurrency": "USD",
              "price": "450.00",
              "availability": "https://schema.org/InStock"
            }
          },
          {
            "@type": "Product",
            "name": "Australian GBP £50 Sterling High-Fidelity Polymer",
            "image": "https://propcounterfeitnotes.com/public/upload/product/buy-ps50-gbp-bills.233webp",
            "description": "High-fidelity £50 GBP Sterling banknote replicas made with premium synthetic hybrid polymer paper and alternative design regulatory details.",
            "sku": "PROP-GBP-50",
            "offers": {
              "@type": "Offer",
              "url": "https://reelbills.com/products/50-british-pound-series-prop-notes",
              "priceCurrency": "GBP",
              "price": "500.00",
              "availability": "https://schema.org/InStock"
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(unifiedSchema) }}
      />
      <HomePageClient />
    </>
  );
}
