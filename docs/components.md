## Component Hierarchy

* `App`
 * `NavbarApp (all pages)`
   * `SearchIndex`
   * `SignInForm (modal)`
 * `SplashCarouselApp (/)`
   * `SplashCarouselIndex`
     * `SplashCarouselIndexItem`
 * `BrowserApp (/explore)`
   * `BrowserSelectorIndex`
   * `BrowserResultsIndex (infinite scroll)`
     * `BrowserResultsIndexItem`
 * `CompanyDetailApp  (/explore/:id)`
   * `InvestForm (modal)`
   * `CompanyDetailTabs`
     * `CompanyDetailTabItem`
       * `CompanyUpdatesTabItem`
       * `CompanyCommentsTabItem`
 * `CompanyFormApp`
   * `CompanyFormTabs`
     * `CompanyFormTabItem`
