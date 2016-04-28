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
      * `BrowserIndex (infinite scroll)`
        * `BrowserIndexItem`
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
