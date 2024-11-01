/**
 * Customizer controls portfolio
 *
 * @package WPBricks
 */



(function ($) {
    "use strict";
    var WPBricks_portfolio = {
        init: function () {
            this.startInit();
        },
        startInit: function () {
            $(document).on("click", ".wpbricks-portfolio-message-cls .notice-dismiss", WPBricks_portfolio.dismissNotice);
            $(document).on("click", ".wpbricks-portfolio-install-recommended-plugin", WPBricks_portfolio.installPlugin);
            $(document).on("click", ".wpbricks-portfolio-activate-recommended-plugin", WPBricks_portfolio.activePlugin);
            $(document).on("wp-plugin-install-success", WPBricks_portfolio.activePlugin);
            $(document).on("wp-plugin-install-error", WPBricks_portfolio.installError);
            $(document).on("wp-plugin-installing", WPBricks_portfolio.pluginInstalling);
            $(document).on("wpbricks-portfolio-active-after-plugin", WPBricks_portfolio.redirectToPlugin);
        },
        redirectToPlugin: function (event, WpBricksLink, activatedSlug) {
            event.preventDefault();

            if (activatedSlug.indexOf("wpbricks") >= 0) {
                window.location.href = WpBricksLink;
            }

        },
        dismissNotice: function (event) {
            event.preventDefault();
            WPBricks_portfolio.ajaxCall();
        },
        installError: function (event, response) {
            var $card = jQuery(".wpbricks-portfolio-install-recommended-plugin");
            $card
                .removeClass("updating-message button-primary")
                .addClass("disabled")
                .html(wp.updates.l10n.installFailedShort);
        },
        pluginInstalling: function (event, args) {
            event.preventDefault();
            var slug = args.slug;
            var $card = jQuery(".wpbricks-portfolio-install-recommended-plugin");
            var activatingText = portfolioNotices.recommendedPluiginInstallingText;
            $card.each(function (index, element) {
                element = jQuery(element);
                if (element.data("slug") === slug) {
                    element.addClass("updating-message");
                    element.html(activatingText);
                }
            });
        },
        installPlugin: function (event) {
            event.preventDefault();

            var $button = jQuery(event.target),
                $document = jQuery(document);

            if ($button.hasClass("updating-message") || $button.hasClass("button-disabled")) {
                return;
            }

            if (wp.updates.shouldRequestFilesystemCredentials && !wp.updates.ajaxLocked) {
                wp.updates.requestFilesystemCredentials(event);

                $document.on("credential-modal-cancel", function () {
                    var $message = $(".wpbricks-portfolio-install-recommended-plugin.updating-message");

                    $message
                        .addClass("wpbricks-portfolio-activate-recommended-plugin")
                        .removeClass("updating-message wpbricks-portfolio-install-recommended-plugin")
                        .text(wp.updates.l10n.installNow);

                    wp.a11y.speak(wp.updates.l10n.updateCancel, "polite");
                });
            }

            wp.updates.installPlugin({
                slug: $button.data("slug")
            });
        },
        activePlugin: function (event, response) {

            event.preventDefault();
            var $message = jQuery(event.target);
            var $init = $message.data("init");
            var activatedSlug;

            if (typeof $init === "undefined") {
                var $message = jQuery(".wpbricks-portfolio-install-recommended-plugin[data-slug=" + response.slug + "]");
                activatedSlug = response.slug;
            } else {
                activatedSlug = $init;
            }

            var $init = $message.data("init");
            var activatingText = portfolioNotices.recommendedPluiginActivatingText;
            var WPBricksSitesLink = portfolioNotices.WPBricksSitesLink;
            var SitesLinkTitle = portfolioNotices.WPBricksSitesLinkTitle;
            var SitesLinkTitleRecommandation = portfolioNotices.WPBricksSitesLinkTitleRecommandation;

            $message.removeClass("install-now installed button-disabled updated-message")
                .addClass("updating-message")
                .html(activatingText);

            setTimeout(function () {
                $.ajax({
                    url: portfolioNotices.ajaxUrl,
                    type: "POST",
                    data: {
                        "action": "wpbricks_portfolio_recommedade_plugin",
                        "init": $init,
                    },
                    success: function (result) {
                        if (result.success) {
                            $(".wpbricks-portfolio-review-notice-container a").attr("href", WPBricksSitesLink);
                            $(".wpbricks-portfolio-review-notice-container a").html(SitesLinkTitle);
                            $(".br_sub_content a.wpbricks-portfolio-install-btn").attr("href", WPBricksSitesLink);
                            $(".br_sub_content a.wpbricks-portfolio-install-btn").html(SitesLinkTitleRecommandation);
                            $message.removeClass("wpbricks-portfolio-install-recommended-plugin updating-message");
                            WPBricks_portfolio.ajaxCall();
                            jQuery(document).trigger("wpbricks-portfolio-active-after-plugin", [WPBricksSitesLink, activatedSlug]);
                        } else {
                            $message.removeClass("updating-message");
                        }
                    }
                })
            }, 1200);
        },
        ajaxCall: function () {
            $.ajax({
                url: portfolioNotices.ajaxUrl,
                type: "POST",
                data: {
                    action: "wpbricks_portfolio_notice_dismiss",
                    nonce: portfolioNotices.wpbricks_portfolio_notice_nonce,
                },
                success: function (result) {
                    //console.log(result);
                }
            });
        },
    }
    $(function () {
        WPBricks_portfolio.init();
    });
})(jQuery);
