## Component Hierarchy

* `App`
 * `NavbarApp`
   * `SearchIndex`
    * `LoginForm (modal)`
 * `Main`
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
 * `Footer`
