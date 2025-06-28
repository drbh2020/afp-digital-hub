/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

import path from "path"
import type { GatsbyNode } from "gatsby"

interface QueryResult {
  allMarkdownRemark: {
    nodes: {
      id: string
      frontmatter: {
        slug: string
        title: string
      }
    }[]
  }
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions

  // Blog posts
  const blogTemplate = path.resolve("src/templates/blog-post.tsx")

  const result = await graphql<QueryResult>(`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/blog/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          id
          frontmatter {
            slug
            title
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error loading blog posts`, result.errors)
    return
  }

  const posts = result.data?.allMarkdownRemark?.nodes

  posts?.forEach((post: any) => {
    createPage({
      path: `/blog/${post.frontmatter.slug}`,
      component: blogTemplate,
      context: {
        id: post.id
      }
    })
  })
}

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ 
  actions 
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@/components": path.resolve(__dirname, "src/components"),
        "@/atoms": path.resolve(__dirname, "src/components/atoms"),
        "@/molecules": path.resolve(__dirname, "src/components/molecules"),
        "@/organisms": path.resolve(__dirname, "src/components/organisms"),
        "@/templates": path.resolve(__dirname, "src/components/templates"),
        "@/pages": path.resolve(__dirname, "src/components/pages"),
        "@/hooks": path.resolve(__dirname, "src/hooks"),
        "@/utils": path.resolve(__dirname, "src/utils"),
        "@/types": path.resolve(__dirname, "src/types"),
        "@/schemas": path.resolve(__dirname, "src/schemas"),
        "@/styles": path.resolve(__dirname, "src/styles"),
        "@/data": path.resolve(__dirname, "src/data"),
        "@/context": path.resolve(__dirname, "src/context")
      }
    }
  })
}
