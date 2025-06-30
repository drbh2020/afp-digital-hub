/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */


import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    title: "AFP Digital Hub",
    description: "Portal informativo sobre fondos de pensión en Perú",
    author: "Diego Berastain",
    siteUrl: "https://afp-digital-hub.netlify.app",
    keywords: ["AFP", "pensión", "fondos", "jubilación", "Perú", "calculadora"],
    social: {
      twitter: "@afpdigitalhub",
      linkedin: "afp-digital-hub"
    }
  },
  plugins: [
    // Core Gatsby plugins
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,

    // Styling
    {
      resolve: "gatsby-plugin-styled-components",
      options: {
        displayName: process.env.NODE_ENV === "development"
      }
    },
    
    // PWA & Performance
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `AFP Digital Hub`,
        short_name: `AFP Hub`,
        start_url: `/`,
        background_color: `#ff4f00`,
        theme_color: `#ff4f00`, // https://css-tricks.com/meta-theme-color-and-trickery/
        display: `minimal-ui`,
        icon: `static/images/favicon/favicon-96x96.png`, // This path is relative to the root of the site.
        icons: [
          {
            src: "static/images/favicon/android-icon-36x36.png",
            sizes: "36x36",
            type: "image/png"
          },
          {
            src: "static/images/favicon/android-icon-48x48.png",
            sizes: "48x48",
            type: "image/png"
          },
          {
            src: "static/images/favicon/android-icon-72x72.png",
            sizes: "72x72",
            type: "image/png"
          },
          {
            src: "static/images/favicon/android-icon-96x96.png",
            sizes: "96x96",
            type: "image/png"
          },
          {
            src: "static/images/favicon/android-icon-144x144.png",
            sizes: "144x144",
            type: "image/png"
          },
          {
            src: "static/images/favicon/android-icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "static/images/favicon/apple-icon-57x57.png",
            sizes: "57x57",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "static/images/favicon/apple-icon-60x60.png",
            sizes: "60x60",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "static/images/favicon/apple-icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "static/images/favicon/apple-icon-76x76.png",
            sizes: "76x76",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "static/images/favicon/apple-icon-114x114.png",
            sizes: "114x114",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "static/images/favicon/apple-icon-120x120.png",
            sizes: "120x120",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "static/images/favicon/apple-icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "static/images/favicon/apple-icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "static/images/favicon/apple-icon-180x180.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
    },
    `gatsby-plugin-offline`,

    // Analytics
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [
          process.env.GATSBY_GA_MEASUREMENT_ID || "GA_MEASUREMENT_ID"
        ],
        pluginConfig: {
          head: false,
          respectDNT: true,
          exclude: ["/preview/**"]
        }
      },
    },

    // Content Management
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: "./content/"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./static/images/"
      }
    },

    // Markdown Processing
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1200,
              quality: 90,
              withWebp: true
            }
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants"
        ]
      }
    },

    // SEO & Sitemap
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://afp-digital-hub.netlify.app",
        sitemap: "https://afp-digital-hub.netlify.app/sitemap-index.xml",
        policy: [{ userAgent: "*", allow: "/" }]
      }
    },

    // TypeScript
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-plugin-typescript",
      options: {
        isTSX: true,
        allExtensions: true
      }
    }
  ],

  // GraphQL Type Generation
  graphqlTypegen: true,
  // Performance Optimizations
  flags: {
    FAST_DEV: true, // Enable all experiments aimed at improving develop server start time & develop DX.
    PARALLEL_SOURCING: true, // Run all source plugins at the same time instead of serially. For sites with multiple source plugins, this can speedup sourcing and transforming considerably.
    DEV_SSR: false // Server Side Render (SSR) pages on full reloads during develop. Helps you detect SSR bugs and fix them without needing to do full builds.
  }

}


export default config;