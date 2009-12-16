var styleElm = document.createElement("style");
// styleElm.title = "__adthwart__"; // For debugging
chrome.extension.sendRequest({reqtype: "get-experimental-enabled-state"}, function(response) {
    if(response.enabled && response.experimentalEnabled && !document.domain.match(/mail.google.com$/)) {
        console.log("hey");
        styleElm.innerText = "img, object, iframe, embed { visibility: hidden }\n.oM, #mbEnd, .adcolumn, #A9AdsMiddleBoxTop,#A9AdsOutOfStockWidgetTop,#A9AdsServicesWidgetTop,#AdContainerTop,#AdHeader,#AdRectangle,#AdShowcase_F1,#AdSky23,#AdsContent,#AdText,#Ad_Center1,#Ad_Top,#AdvertMPU23b,#Advertorial,#BigBoxAd,#content_ad_top,#ContentAd1,#ContentAd2,#ContentAdPlaceHolder1,#ContentAdPlaceHolder2,#footer_ad_block,#FooterAd,#FooterAdBlock,#HEADERAD,#HeroAd,#SectionAd300-250,#SidebarAdContainer,#XEadLeaderboard,#XEadSkyscraper,#ad-300x250Div,#ad-728,#ad-banner,#ad-bottom,#ad-front-footer,#ad-front-sponsoredlinks,#ad-halfpage,#ad-label,#ad-leaderboard,#ad-leaderboard-bottom,#ad-leaderboard-top,#ad-left,#ad-lrec,#ad-medium-rectangle,#ad-middlethree,#ad-middletwo,#ad-rectangle,#ads-rhs,#ad-righttop,#ad-skyscraper,#ad-space,#ad-splash,#ad-target,#ad-top,#ad-wrap-right,#ad-wrapper1,#ad-yahoo-simple,#ad1,#ad125x125,#ad160x600,#ad1Sp,#ad2,#ad2Sp,#ad3,#ad300,#ad300-250,#ad300x150,#ad300x250,#ad336,#ad526x250,#ad600,#adB,#adBanner,#adBanner120x600,#adBannerTable,#adBar,#adFps,#adFtofrs,#adGroup1,#adHeader,#adL,#adMiddle0Frontpage,#adMiniPremiere,#adPlaceHolderRight,#adsbottom,#adSenseModule,#adSlider,#adSpace300_ifrMain,#adSpot-sponsoredlinks,#adSpot-textbox1,#adSpot-widestrip,#adStaticA,#adStrip,#adSuperPremiere,#adTag1,#adTag2,#adTop,#adUnit,#ad_160x600,#ad_190x90,#ad_300,#ad_300x250,#ad_468_60,#ad_728_foot,#ad_728x90,#ad_banner_top,#ad_bar,#ad_box_colspan,#ad_center_monster,#ad_head,#ad_island,#ad_leaderBoard,#ad_leaderboard,#ad_middle,#ad_rectangle,#ad_related_links_div_program,#ad_space,#adbottom,#adbox,#adcolumnwrapper,#adframe:not(frameset),#adhead,#adhead_g,#adheader,#adlinkws,#admid,#admiddle3left,#adposition-C,#adposition3,#adposition4,#adright,#adright2,#ads-block,#ads-bot,#ads-dell,#ads-horizontal,#ads-lrec,#ads-top,#ads300,#ads336x280,#ads7,#adsID,#ads_catDiv,#ads_top,#adsense,#adsense-text,#AdSkyscraper,#adsonar,#adspace-300x250,#adSpace_footer,#adSpace_top,#adsright,#adTableCell,#adtech_takeover,#adtop,#advert-boomer,#advert-header,#advert-leaderboard,#advert_leaderboard,#advert_mpu,#advertise-now,#advertisement,#advertisement160x600,#advertisement728x90,#advertisementLigatus,#advertisementPrio2,#advertiserLinks,#advertising,#advertising-skyscraper,#adv_google_300,#adv_google_728,#adwords-4-container,#adwrapper,#adxtop,#adzoneBANNER,#annoying_ad,#ap_adframe,#article-box-ad,#articleAdReplacement,#articleSideAd,#article_ad,#atlasAdDivGame,#banner_ad,#banner-ad,#banner-ads,#bannerAdTop,#banner_ad,#banner_topad,#bannerad,#bigAd,#bigBoxAd,#billboard_ad,#block-ad_cube-1,#block_advert,#blox-big-ad,#blox-halfpage-ad,#blox-tile-ad,#botad,#bottom_ad,#bottom-ad-container,#bottom-ads,#bottomAd,#bottomAdSenseDiv,#bottomRightAdSpace,#bottom_ad_area,#bottom_ads,#bottom_overture,#bottom_player_adv,#bottom_sponsor_ads,#bottom_sponsored_links,#bottom_text_ad,#bottomad,#boxAdContainer,#boxad1,#boxad2,#boxad3,#boxad4,#boxad5,#bps-header-ad-container,#btr_horiz_ad,#button-ads-horizontal,#button_ad_wrap,#cellAd,#channel_ad,#channel_ads,#cnnRR336ad,#cnnTopAd,#colRightAd,#column4-google-ads,#common_right_lower_player_adspace,#common_right_player_adspace,#common_top_adspace,#containerLocalAds,#containerMrecAd,#content-ad-header,#contentAd,#contentad,#content_ad_square,#content_ads_content,#content_box_300body_sponsoredoffers,#content_box_adright300_google,#contentads,#contentinlineAd,#contextualad,#cubeAd,#cubead,#cubead-2,#cube_ads,#cube_ads_inner,#divWrapper_Ad,#div_video_ads,#dlads,#ds-mpu,#exads,#featuredAdContainer2,#featuredAds,#feed_links_ad_container,#first_ad_unit,#fl_hdrAd,#footer-sponsored,#footer_ad,#footerAdDiv,#fusionad,#ga_300x250,#game-info-ad,#global_header_ad_area,#google-ad,#google-ad-art,#google-ad-tower,#google-ads,#google-adsense-mpusize,#google-ads-bottom,#google-ads-left-side,#googleAfcContainer,#google_ad,#google_ads,#googleads,#halfPageAd,#hdtv_ad_ss,#header-ad,#header-ads,#header-advert,#headerAd,#HeaderAdsBlock,#headerAdContainer,#headerTopAd,#header_ad,#header_leaderboard_ad_container,#headerad,#headeradbox,#headline_ad,#homeTopRightAd,#home_ad,#home_spensoredlinks,#HouseAd,#houseAd,#inlinead,#inlinegoogleads,#insider_ad_wrapper,#instoryad,#int-ad,#interstitial_ad_wrapper,#j_ad,#lateAd,#lg-banner-ad,#leaderad,#leaderboard-ad,#leaderboard-bottom-ad,#leftSectionAd300-100,#left_adspace,#leftad,#LeftAdF1,#LeftAdF2,#linkAds,#longAdSpace,#main-ad,#main_ad,#main_rec_ad,#mastad,#masthead_ad,#medRecAd,#menuAds,#mid-ad300x250,#mid_mpu,#middlead,#mini-ad,#module_box_ad,#mpu,#mpuAd,#mpuDiv,#mpu_banner,#mpu_holder,#mpuad,#n_sponsor_ads,#navi_banner_ad_780,#new_topad,#noresultsads,#northad,#page-header-ad,#page_content_top_ad,#pcworldAdBottom,#pcworldAdTop,#portlet-advertisement-left,#portlet-advertisement-right,#priceGrabberAd,#promo-ad,#ps-vertical-ads,#pub468x60,#rail_ad1,#rail_ad2,#realEstateAds,#rectangle-ad,#rectangle_ad,#region-top-ad,#rh-ad-container,#rh_tower_ad,#right-ad,#rightAd,#rightAd300x250,#rightColAd,#right_ad_wrapper,#rightad,#rightbar-ad,#rightside_ad,#RightSponsoredAd,#rotatingads,#rtMod_ad,#search-google-ads,#secondBoxAdContainer,#sew-ad1,#shoppingads,#side-ad-container,#sideBarAd,#side_ad_wrapper,#sidead,#sidebar-125x125-ads,#sidebar-125x125-ads-below-index,#sidebar-ads,#sidebar_sponsoredresult_body,#sidebarad,#site_top_ad,#skyAd,#skyScrapperAd,#skyscraperAd,#skyscraper_advert,#sm-banner-ad,#small_ad,#smallerAd,#speeds_ads,#sphereAd,#splinks,#sponlink,#sponLinkDiv_1,#spons_left,#sponseredlinks,#sponsorAd1,#sponsorAd2,#sponsor_panSponsor,#sponsored,#sponsored-links,#SponsoredAd,#sponsoredLinks,#sponsoredList,#sponsoredResults,#sponsored_links,#sponsoredlinks,#sponsoredlinks_cntr,#sponsoredresults_top,#spotlightad,#squareAd,#squareAdSpace,#sticky-ad,#stickyBottomAd,#story-ad-a,#story-sponsoredlinks,#storyAdWrap,#subpage-ad-right,#subpage-ad-top,#swads,#synch-ad,#template_ad_leaderboard,#tertiary_advertising,#textAd,#textAds,#text_advert,#themis-ads,#tile-ad,#tmglBannerAd,#top-ad,#top-ads,#top-ads-tabs,#topAd,#topAd728x90,#topAdBanner,#topAdSenseDiv,#topAds,#topBannerAd,#top-advertisement,#top_ad_area,#top_ad_wrapper,#top_ads,#top_advertise,#top_advertising,#top_player_adv,#topadblock,#topcustomad,#towerad,#twogamesAd,#upperad,#vert_ad,#vertical_ad,#vertical_ads,#video_overlay_ad,#walltopad,#welcomeAdsContainer,#welcome_ad_mrec,#wgtAd,#wrapAdRight,#wrapAdTop,#yahoo-ads,#yahoo_ads,#yan-sponsored,#ybf-ads,#ymap_adbanner,#yn-gmy-ad-lrec,#ygrp-sponsored-links,#yreSponsoredLinks,.AdBox,.AdContainerBox308,.AdSpace,.AdUnit,.Ad_C,.Ad_D_Wrapper,.Ad_E_Wrapper,.Ad_Right,.Ads,.AdvertisementTextTag,.BlockAd,.DeptAd,.FT_Ad,.FlatAds,.MD_adZone,.RightSponsoredAdTitle,.SidebarAd,.StandardAdLeft,.StandardAdRight,.TextAd,.TopAd,.ad-160x600,.ad-300,.ad-300-blog,.ad-300x100,.ad-300x250,.ad-728,.ad-background,.ad-banner,.ad-bigsize,.ad-block,.ad-div,.ad-google,.ad-gray,.ad-homeleaderboard,.ad-island,.ad-leaderboard,.ad-links,.ad-medium,.ad-medium-two,.ad-other,.ad-poster,.ad-rect,.ad-rectangle,.ad-rectangle-text,.ad-section,.ad-sidebar300,.ad-slot,.ad-space,.ad-space-mpu-box,.ad-spot,.ad_spot_b,.ad_spot_c,.ad-text,.ad-tile,.ad-top,.ad-wrap,.ad1,.ad2,.ad3,.ad160,.ad300,.ad310,.ad300x250,.ad300x250Top,.ad300x600,.ad336x280,.ad468,.ad620x70,.ad728x90,.adAgate,.adBanner,.adBoxSingle,.adCMRight,.adColumn,.adContainer,.adCreative,.adFrame,.adFullWidthMiddle,.adGoogle,.adHeader,.adHeadline,.adHolder,.adHome300x250,.adInNews,.adLeaderboard,.adLeft,.adMkt2Colw,.adModule,.adNewsChannel,.adRight,.adServer,.adSpBelow,.adSpot,.adSquare,.adSuperboard,.adText,.adTout,.adTxt,.adWithTab,.ad_160,.ad_300,.ad_300x250,.ad_336x280,.ad_600,.ad_728,.ad_728x90,.ad_amazon,.ad_block_338,.ad-bottom,.ad_bottom_leaderboard,.ad_box,.ad_box2,.ad_contain,.ad_container,.ad_footer,.ad-holder,.ad_leader,.ad_leaderboard,.ad_lrec,.ad_medrect,.ad_mpu,.ad_mrec,.ad_mrec_title_article,.ad_notice,.ad_p360,.ad_right,.ad_sidebar,.ad_skyscraper,.ad_slug_table,.ad_space,.ad_square_top,.ad_top,.ad_top_leaderboard,.ad_tower,.ad_unit,.ad_wide,.ad_wrap,.ad_wrapper_fixed,.ad_zone,.adarea,.adbanner,.adbannerright,.adbar,.adbot,.adbottom,.adbox_366x280,.adbox_468X60,.adcode,.adcolumn_wrapper,.adcontainer,.adcopy,.addiv,.adfoot,.adhead,.adheader,.adinside,.adjlink,.adLabel,.adlabel-horz,.adlabel-vert,.adline,.adlist,.adlnklst,.admodule,.admpu,.adnotice,.adpadding,.adright,.ads-banner,.ads-sidebar,.ads2,.adsBox,.adsTextHouse,.ads_728x90,.ads_container,.ads_div,.adscreen,.adsection_a2,.adsense,.adsense-heading,.adsingle,.adslogan,.adspace,.adspacer,.adstrip,.adsWithUs,.adtag,.adtop,.AdUnit300,.advIdentifier,.adverTag,.adver_cont_below,.advert_cont,.advert-text,.advertContainer,.advertRight,.advertText,.advert_box,.advert_leaderboard,.advertise,.advertise-horz,.advertise-vert,.advertiseContainer,.advertisement,.advertisement-block,.advertisement-top,.advertisement468,.advertisementColumnGroup,.advertisement_header,.advertising,.advertising-header,.advertisingTable,.advertisment_two,.advertorial,.adverts,.advt,.adwrapper,.adwrapper-lrec,.anchorAd,.aolSponsoredLinks,.aopsadvert,.article_ad,.article-ads,.articleAd,.articleAdsL,.article_adbox,.banner-ad,.banner-ads,.bannerAd,.banner_300x250,.banner_728x90,.banner_ad,.bannerad,.barkerAd,.bigAd,.big_ads,.bigad,.block_ad,.blocked-ads,.blog-ads-container,.blogAdvertisement,.blog_ad,.body_ad,.body_sponsoredresults_bottom,.body_sponsoredresults_middle,.body_sponsoredresults_top,.bottomAd,.bottomad,.bottomrightrailAd,.boxAd,.box_ad,.box_content_ads,.bps-ad-wrapper,.bps-advertisement,.bps-advertisement-inline-ads,.bullet-sponsored-links,.buttonAd,.cb_footer_sponsor,.cb_navigation_ad,.cdmainlineSearchAdParent,.cdsidebarSearchAdParent,.centerAd,.centerad,.clearerad,.cm_ads,.cnn_adcntr300x100,.cnn_adspc336cntr,.cnn_adtitle,.cnn160AdFooter,.cnnAd,.cnnMosaic160Container,.cnnStoreAd,.cnnStoryElementBoxAd,.cnnWCAdBox,.cnnWireAdLtgBox,.column2-ad,.content_ad,.contenttextad,.cpmstarHeadline,.cpmstarText,.ct_ad,.cubeAd,.cube_ads,.darla_ad,.dc-ad,.deckAd,.detailMpu,.dmco_advert_iabrighttitle,.dynamic_ad,.ec-ads,.ez-clientAd,.f_Ads,.featuredAds,.featuredadvertising,.flagads,.flash_advert,.flashad,.flexiad,.flipbook_v2_sponsor_ad,.footerAd,.footerTextAd,.footer_ad,.footer_ads,.ftdContentAd,.full_ad_box,.g3rtn-ad-site,.gads_cb,.gglAds,.google-ads,.google-right-ad,.google468_60,.googleAd,.googleAdSense,.googleAd_body,.googleAds,.googleAdsense,.googleProfileAd,.googleads_title,.gpAds,.gradientAd,.h_Ads,.hd_advert,.headerAdvert,.header_advertisment,.homeMediumAdGroup,.highlightsAd,.home-ad-links,.homeAd,.homepage-ad,.horizontalAd,.houseAdsStyle,.hp_ad_cont,.hp_t_ad,.hp_w_ad,.idMultiAd,.in-page-ad,.in-story-text-ad,.indy_googleads,.inline-mpu-left,.inline_ad_title,.innerad,.inpostad,.islandAd,.inlineSideAd,.largeRectangleAd,.leader_ad,.leftad,.LeftTowerAd,.link_advertise,.live-search-list-ad-container,.lowerAds,.main-tabs-ad-block,.main_ad,.main_adbox,.marginadsthin,.marketing-ad,.mdl-ad,.messageBoardAd,.micro_ad,.miniad,.mod-ad-lrec,.mod-ad-n,.mod_admodule,.module-ad-small,.module-ads,.mpu-ad,.midad,.modulegad,.mpu-title,.mpuAd,.mpuContainer,.mpuTextAd,.mpu_ad,.mwaads,.naviad,.nba300Ad,.nbaT3Ad160,.nbaTwo130Ads,.nbc_ad_carousel_wrp,.newad,.normalAds,.nrAds,.oas-bottom-ads,.oio-banner-zone,.oio-link-sidebar,.oio-zone-position,.onethirdadholder,.openx,.openx-ad,.ov_spns,.partnersTextLinks,.player_ad_box,.player_page_ad_box,.pnp_ad,.podSponsoredLink,.post_ad,.prebodyads,.promoAd,.promoAds,.puff-advertorials,.quigo-ad,.qzvAdDiv,.rectad,.rectangleAd,.rectanglead,.RelatedAds,.result_ad,.rght300x250,.rhs-ad,.rhs-ads-panel,.right_ad,.right_hand_advert_column,.rightad,.rightad_1,.rightad_2,.right-ad,.right-ad2,.rightads,.rightadunit,.rightcol_boxad,.RightTowerAd,.rt_ad1_300x90,.rt_ad_300x250,.rt_ad_call,.savvyad_unit,.sb-ad-sq-bg,.sb_adsN,.sb_adsW,.sbAdUnitContainer,.searchAd,.searchSponsoredResultsBox,.search_column_results_sponsored,.search_results_sponsored_top,.selfServeAds,.sidbaread,.side-ad,.sidead,.sideadsbox,.sideadvert,.sidebar-text-ad,.sidebarAdUnit,.sidebarAdvert,.sidebar_ad,.sidebarad,.sidebarad_bottom,.sideheadnarrowad,.sideheadsponsorsad,.singleAd,.singleAdsContainer,.skinAd,.skin_ad_638,.skyAd,.sky_ad,.sky-ad,.skyscraper-ad,.smallSkyAd1,.smallSkyAd2,.small_ads,.specialAd175x90,.spl_ad,.spl_ad2,.spl_ad_plus,.splitAd,.spons-link,.sponslink,.sponsor-links,.sponsor_line,.sponsorArea,.sponsored_links_title_container_top,.sponsored_links_top,.sponsored_links_title_container,.sponsored-links,.sponsored-post,.SponsoredAdTitle,.sponsoredLinks,.sponsored_by,.sponsored_links,.sponsored-chunk,.sponsoredibbox,.sponsoredlinks,.square_ad,.squareAd,.squared_ad,.store-ads,.story_right_adv,.subcontent-ad,.supercommentad_left,.supercommentad_right,.surveyad,.tadsanzeige,.tadsbanner,.tadselement,.tbl_ad,.teaser_adtiles,.text-ad-links,.text_ads,.textad,.textAds,.textlink-ads,.thisIsAd,.thisIsAnAd,.ticket-ad,.title_adbig,.toolad,.top-ad-space,.topAdvertisement,.topBannerAd,.top_ad,.top_ad_wrapper,.topad,.topadbox,.topadspot,.top_advert,.topcontentadvertisement,.topstoriesad,.ts-ad_unit_bigbox,.ts-banner_ad,.ttlAdsensel,.twoColumnAd,.tx_smartadserver_pi1,.txt-ads,.type_promoads,.usenext,.wide-ad,.wideAdTable,.wide_ads,.wikia_ad_placeholder,.withAds,.y7-advertisement,.yahoo_ads,.yahoo-sponsored,.ygrp-ad,.yrail_ad_wrap,.yrail_ads,.ysponsor,.ysmsponsor{ visibility: hidden }";
    }
    document.documentElement.insertBefore(styleElm, null);
});
