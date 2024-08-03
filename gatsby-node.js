exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/product/)) {
    page.matchPath = "/product/*"
    createPage(page)
  }
}