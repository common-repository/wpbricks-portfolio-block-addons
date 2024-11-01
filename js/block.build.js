/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var __ = wp.i18n.__;
var registerBlockType = wp.blocks.registerBlockType;
var _wp$editor = wp.editor,
    BlockControls = _wp$editor.BlockControls,
    InspectorControls = _wp$editor.InspectorControls,
    ColorPalette = _wp$editor.ColorPalette,
    AlignmentToolbar = _wp$editor.AlignmentToolbar;
var _wp$components = wp.components,
    Panel = _wp$components.Panel,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    TextControl = _wp$components.TextControl,
    SelectControl = _wp$components.SelectControl,
    ServerSideRender = _wp$components.ServerSideRender,
    RangeControl = _wp$components.RangeControl,
    Disabled = _wp$components.Disabled,
    ToggleControl = _wp$components.ToggleControl,
    RadioControl = _wp$components.RadioControl,
    Toolbar = _wp$components.Toolbar;
var addQueryArgs = wp.url.addQueryArgs;

var allCatArray = [];
var allCat = wp.apiFetch({ path: addQueryArgs("/wp/v2/wpbricks-portfolio-cats", { per_page: -1 }) }).then(function (categories) {
    //allCatArray.push({label: 'All', value: 'all'});
    jQuery.each(categories, function (key, val) {
        allCatArray.push({ label: val.name, value: val.slug });
    });
    return allCatArray;
});

registerBlockType('wpbricks/bricks-portfolio-block', {
    title: __("Bricks Portfolio"),
    description: __("Bricks Portfolio is a gutenberg block where you can display portgolio list with different categories."),
    icon: wp.element.createElement(
        "svg",
        { version: "1.0", xmlns: "http://www.w3.org/2000/svg",
            width: "24.000000pt", height: "24.000000pt", viewBox: "0 0 24.000000 24.000000",
            preserveAspectRatio: "xMidYMid meet" },
        wp.element.createElement(
            "metadata",
            null,
            "Created by potrace 1.10, written by Peter Selinger 2001-2011"
        ),
        wp.element.createElement(
            "g",
            { transform: "translate(0.000000,24.000000) scale(0.100000,-0.100000)",
                fill: "#ff7f50", stroke: "none" },
            wp.element.createElement("path", { d: "M67 196 c-3 -8 -18 -16 -32 -18 -25 -3 -27 -7 -31 -53 l-4 -50 23 40\r 23 40 72 3 c40 2 72 7 72 12 0 9 -16 11 -85 13 -16 0 -17 1 -2 4 25 6 21 23\r -7 23 -13 0 -26 -6 -29 -14z" }),
            wp.element.createElement("path", { d: "M31 93 c-16 -29 -26 -55 -23 -58 3 -3 44 -5 92 -5 l86 0 27 55 c15\r 31 27 57 27 59 0 2 -41 3 -91 2 l-90 -1 -28 -52z m169 19 c0 -4 -7 -18 -16\r -30 -13 -19 -24 -22 -79 -22 l-63 0 14 30 c15 29 18 30 80 30 35 0 64 -3 64\r -8z" })
        )
    ),
    category: 'bricksblocks',
    attributes: {
        portfolio_cat_show_type: {
            type: 'boolean',
            default: false
        },
        portfolio_columns: {
            type: 'integer',
            default: 4
        },
        portfolioCategory: {
            type: 'array'
        },
        titleFontSize: {
            type: 'integer',
            default: 20
        },
        descFontSize: {
            type: 'integer',
            default: 16
        },
        portfolio_excerpt: {
            type: 'boolean',
            default: false
        },
        excerpt_words_length: {
            type: 'integer',
            default: 30
        },
        display_portfolio_title: {
            type: 'boolean',
            default: false
        },
        display_feature_image: {
            type: 'boolean',
            default: true
        },
        portfolio_tab_fontSize: {
            type: 'number',
            default: 16
        },
        portfolio_tab_fontWeight: {
            type: 'number'
        },
        portfolio_tab_textUppercase: {
            type: 'string'
        },
        portfolio_tab_position: {
            type: "string",
            default: "center"
        },
        portfolio_tab_FontColor: {
            type: "string",
            default: "#000"
        },
        portfolio_marginTop: {
            type: "string",
            default: "25"
        },
        portfolio_marginRight: {
            type: "string",
            default: "0"
        },
        portfolio_marginBottom: {
            type: "string",
            default: "25"
        },
        portfolio_marginLeft: {
            type: "string",
            default: "0"
        },
        portfolio_paddingTop: {
            type: "string",
            default: "0"
        },
        portfolio_paddingRight: {
            type: "string",
            default: "0"
        },
        portfolio_paddingBottom: {
            type: "string",
            default: "0"
        },
        portfolio_paddingLeft: {
            type: "string",
            default: "0"
        }
    },
    edit: function edit(props) {
        var attributes = props.attributes,
            setAttributes = props.setAttributes;
        var portfolio_columns = attributes.portfolio_columns,
            portfolio_cat_show_type = attributes.portfolio_cat_show_type,
            portfolioCategory = attributes.portfolioCategory,
            portfolio_tab_position = attributes.portfolio_tab_position,
            portfolio_tab_fontSize = attributes.portfolio_tab_fontSize,
            portfolio_tab_fontWeight = attributes.portfolio_tab_fontWeight,
            portfolio_tab_textUppercase = attributes.portfolio_tab_textUppercase,
            portfolio_tab_FontColor = attributes.portfolio_tab_FontColor,
            titleFontSize = attributes.titleFontSize,
            descFontSize = attributes.descFontSize,
            portfolio_excerpt = attributes.portfolio_excerpt,
            portfolio_cat_show_columnstype = attributes.portfolio_cat_show_columnstype,
            excerpt_words_length = attributes.excerpt_words_length,
            display_portfolio_title = attributes.display_portfolio_title,
            display_feature_image = attributes.display_feature_image,
            portfolio_marginTop = attributes.portfolio_marginTop,
            portfolio_marginRight = attributes.portfolio_marginRight,
            portfolio_marginBottom = attributes.portfolio_marginBottom,
            portfolio_marginLeft = attributes.portfolio_marginLeft,
            portfolio_paddingTop = attributes.portfolio_paddingTop,
            portfolio_paddingRight = attributes.portfolio_paddingRight,
            portfolio_paddingBottom = attributes.portfolio_paddingBottom,
            portfolio_paddingLeft = attributes.portfolio_paddingLeft;

        return wp.element.createElement(
            "div",
            { className: 'wpbricks-portfolio' },
            wp.element.createElement(
                InspectorControls,
                null,
                wp.element.createElement(
                    PanelBody,
                    { title: __('Category Filter', 'wpbricks-portfolio-block-addons') },
                    wp.element.createElement(
                        PanelRow,
                        null,
                        wp.element.createElement(ToggleControl, {
                            label: "Selected Category (Default: All)",
                            help: portfolio_cat_show_type ? false : true,
                            checked: portfolio_cat_show_type,
                            onChange: function onChange(value) {
                                return setAttributes({ portfolio_cat_show_type: value });
                            }
                        })
                    ),
                    portfolio_cat_show_type && wp.element.createElement(
                        PanelRow,
                        null,
                        wp.element.createElement(SelectControl, {
                            multiple: true,
                            label: __('Select Categories'),
                            value: portfolioCategory,
                            options: allCatArray,
                            onChange: function onChange(value) {
                                return setAttributes({ portfolioCategory: value });
                            }
                        })
                    )
                ),
                wp.element.createElement(
                    PanelBody,
                    { title: __('Tab Setting', 'wpbricks-portfolio-block-addons'), initialOpen: false },
                    wp.element.createElement(
                        PanelRow,
                        null,
                        wp.element.createElement(
                            "div",
                            { className: "col-main-2" },
                            wp.element.createElement(
                                "div",
                                { className: "col-main-inner" },
                                wp.element.createElement(
                                    "label",
                                    { className: "mt10" },
                                    "Font Size"
                                ),
                                wp.element.createElement(TextControl, {
                                    type: "number",
                                    min: "1",
                                    value: portfolio_tab_fontSize,
                                    placeholder: "px",
                                    onChange: function onChange(value) {
                                        return setAttributes({ portfolio_tab_fontSize: parseInt(value) });
                                    }
                                })
                            ),
                            wp.element.createElement(
                                "div",
                                { className: "col-main-inner" },
                                wp.element.createElement(
                                    "label",
                                    { className: "mt10" },
                                    "Font Weight"
                                ),
                                wp.element.createElement(SelectControl, {
                                    value: portfolio_tab_fontWeight,
                                    options: [{ label: "300", value: "300" }, { label: "500", value: "500" }, { label: "600", value: "600" }, { label: "700", value: "700" }, { label: "800", value: "800" }],
                                    onChange: function onChange(value) {
                                        return setAttributes({ portfolio_tab_fontWeight: parseInt(value) });
                                    }
                                })
                            )
                        )
                    ),
                    wp.element.createElement(
                        PanelRow,
                        null,
                        wp.element.createElement(SelectControl, {
                            label: "Select Transform",
                            value: portfolio_tab_textUppercase,
                            options: [{ label: "none", value: "none" }, { label: "Capitalze", value: "capitalize" }, { label: "Uppercae", value: "uppercase" }, { label: "Lowercae", value: "lowercase" }, { label: "Initial", value: "initial" }],
                            onChange: function onChange(value) {
                                return setAttributes({ portfolio_tab_textUppercase: value });
                            }
                        })
                    ),
                    wp.element.createElement(
                        PanelRow,
                        null,
                        wp.element.createElement(
                            "label",
                            null,
                            "Alignment"
                        ),
                        wp.element.createElement(AlignmentToolbar, {
                            value: portfolio_tab_position,
                            onChange: function onChange(newAlignment) {
                                return setAttributes({
                                    portfolio_tab_position: newAlignment === undefined ? "none" : newAlignment
                                });
                            }
                        })
                    ),
                    wp.element.createElement(
                        "label",
                        { className: "mt10" },
                        "Font color"
                    ),
                    wp.element.createElement(ColorPalette, {
                        value: portfolio_tab_FontColor,
                        onChange: function onChange(value) {
                            return setAttributes({
                                portfolio_tab_FontColor: value
                            });
                        }
                    })
                ),
                wp.element.createElement(
                    PanelBody,
                    { title: __('Typography', 'wpbricks-portfolio-block-addons'), initialOpen: false },
                    wp.element.createElement(
                        PanelRow,
                        null,
                        wp.element.createElement(RangeControl, {
                            label: "Columns",
                            value: portfolio_columns,
                            onChange: function onChange(value) {
                                return setAttributes({ portfolio_columns: value });
                            },
                            min: 2,
                            max: 9
                        })
                    ),
                    wp.element.createElement(
                        PanelRow,
                        null,
                        wp.element.createElement(RangeControl, {
                            label: "Title Font Size",
                            value: titleFontSize,
                            onChange: function onChange(value) {
                                return setAttributes({ titleFontSize: value });
                            },
                            min: 10,
                            max: 50
                        })
                    ),
                    wp.element.createElement(
                        PanelRow,
                        null,
                        wp.element.createElement(RangeControl, {
                            label: "Description Font Size",
                            value: descFontSize,
                            onChange: function onChange(value) {
                                return setAttributes({ descFontSize: value });
                            },
                            min: 10,
                            max: 50
                        })
                    )
                ),
                wp.element.createElement(
                    PanelBody,
                    { title: __('Display Content', 'wpbricks-portfolio-block-addons'), initialOpen: false },
                    wp.element.createElement(
                        PanelRow,
                        null,
                        wp.element.createElement(ToggleControl, {
                            label: "Portfolio Excerpt",
                            help: portfolio_excerpt ? true : false,
                            checked: portfolio_excerpt,
                            onChange: function onChange(value) {
                                return setAttributes({ portfolio_excerpt: value });
                            }
                        })
                    ),
                    portfolio_excerpt && wp.element.createElement(
                        PanelRow,
                        null,
                        wp.element.createElement(RangeControl, {
                            label: "Max number of words in excerpt",
                            value: excerpt_words_length,
                            onChange: function onChange(value) {
                                return setAttributes({ excerpt_words_length: value });
                            },
                            min: 10,
                            max: 100
                        })
                    ),
                    wp.element.createElement(
                        PanelRow,
                        null,
                        wp.element.createElement(ToggleControl, {
                            label: "Display Portfolio Title",
                            help: display_portfolio_title ? true : false,
                            checked: display_portfolio_title,
                            onChange: function onChange(value) {
                                return setAttributes({ display_portfolio_title: value });
                            }
                        })
                    ),
                    wp.element.createElement(
                        PanelRow,
                        null,
                        wp.element.createElement(ToggleControl, {
                            label: "Display Feature Image",
                            help: display_feature_image ? true : false,
                            checked: display_feature_image,
                            onChange: function onChange(value) {
                                return setAttributes({ display_feature_image: value });
                            }
                        })
                    )
                ),
                wp.element.createElement(
                    PanelBody,
                    { title: __('Spacing', 'wpbricks-portfolio-block-addons'), initialOpen: false },
                    wp.element.createElement(
                        "label",
                        { "class": "mt20" },
                        "Margin Setting"
                    ),
                    wp.element.createElement(
                        PanelRow,
                        null,
                        wp.element.createElement(
                            "div",
                            { className: "margin-setting" },
                            wp.element.createElement(
                                "div",
                                { className: "col-main-2" },
                                wp.element.createElement(
                                    "div",
                                    {
                                        className: "padd-top col-main-inner",
                                        "data-tooltip": "margin Top"
                                    },
                                    wp.element.createElement(
                                        "label",
                                        null,
                                        "Top"
                                    ),
                                    wp.element.createElement(TextControl, {
                                        type: "number",
                                        min: "1",
                                        value: portfolio_marginTop,
                                        onChange: function onChange(value) {
                                            return setAttributes({ portfolio_marginTop: value });
                                        }
                                    })
                                ),
                                wp.element.createElement(
                                    "div",
                                    {
                                        className: "padd-buttom col-main-inner",
                                        "data-tooltip": "margin Bottom"
                                    },
                                    wp.element.createElement(
                                        "label",
                                        null,
                                        "Bottom"
                                    ),
                                    wp.element.createElement(TextControl, {
                                        type: "number",
                                        min: "1",
                                        value: portfolio_marginBottom,
                                        onChange: function onChange(value) {
                                            return setAttributes({ portfolio_marginBottom: value });
                                        }
                                    })
                                )
                            ),
                            wp.element.createElement(
                                "div",
                                { className: "col-main-2" },
                                wp.element.createElement(
                                    "div",
                                    {
                                        className: "padd-left col-main-inner",
                                        "data-tooltip": "margin Left"
                                    },
                                    wp.element.createElement(
                                        "label",
                                        null,
                                        "Left"
                                    ),
                                    wp.element.createElement(TextControl, {
                                        type: "number",
                                        min: "1",
                                        value: portfolio_marginLeft,
                                        onChange: function onChange(value) {
                                            return setAttributes({ portfolio_marginLeft: value });
                                        }
                                    })
                                ),
                                wp.element.createElement(
                                    "div",
                                    {
                                        className: "padd-right col-main-inner",
                                        "data-tooltip": "margin Right"
                                    },
                                    wp.element.createElement(
                                        "label",
                                        null,
                                        "Right"
                                    ),
                                    wp.element.createElement(TextControl, {
                                        type: "number",
                                        min: "1",
                                        value: portfolio_marginRight,
                                        onChange: function onChange(value) {
                                            return setAttributes({ portfolio_marginRight: value });
                                        }
                                    })
                                )
                            )
                        )
                    ),
                    wp.element.createElement(
                        "label",
                        { className: "mt20" },
                        "Padding Setting"
                    ),
                    wp.element.createElement(
                        PanelRow,
                        null,
                        wp.element.createElement(
                            "div",
                            { className: "padding-setting" },
                            wp.element.createElement(
                                "div",
                                { className: "col-main-2" },
                                wp.element.createElement(
                                    "div",
                                    {
                                        className: "padd-top col-main-inner",
                                        "data-tooltip": "padding Top"
                                    },
                                    wp.element.createElement(
                                        "label",
                                        null,
                                        "Top"
                                    ),
                                    wp.element.createElement(TextControl, {
                                        type: "number",
                                        min: "1",
                                        value: portfolio_paddingTop,
                                        onChange: function onChange(value) {
                                            return setAttributes({ portfolio_paddingTop: value });
                                        }
                                    })
                                ),
                                wp.element.createElement(
                                    "div",
                                    {
                                        className: "padd-buttom col-main-inner",
                                        "data-tooltip": "padding Bottom"
                                    },
                                    wp.element.createElement(
                                        "label",
                                        null,
                                        "Bottom"
                                    ),
                                    wp.element.createElement(TextControl, {
                                        type: "number",
                                        min: "1",
                                        value: portfolio_paddingBottom,
                                        onChange: function onChange(value) {
                                            return setAttributes({ portfolio_paddingBottom: value });
                                        }
                                    })
                                )
                            ),
                            wp.element.createElement(
                                "div",
                                { className: "col-main-2" },
                                wp.element.createElement(
                                    "div",
                                    {
                                        className: "padd-left col-main-inner",
                                        "data-tooltip": "padding Left"
                                    },
                                    wp.element.createElement(
                                        "label",
                                        null,
                                        "Left"
                                    ),
                                    wp.element.createElement(TextControl, {
                                        type: "number",
                                        min: "1",
                                        value: portfolio_paddingLeft,
                                        onChange: function onChange(value) {
                                            return setAttributes({ portfolio_paddingLeft: value });
                                        }
                                    })
                                ),
                                wp.element.createElement(
                                    "div",
                                    {
                                        className: "padd-right col-main-inner",
                                        "data-tooltip": "padding Right"
                                    },
                                    wp.element.createElement(
                                        "label",
                                        null,
                                        "Right"
                                    ),
                                    wp.element.createElement(TextControl, {
                                        type: "number",
                                        min: "1",
                                        value: portfolio_paddingRight,
                                        onChange: function onChange(value) {
                                            return setAttributes({ portfolio_paddingRight: value });
                                        }
                                    })
                                )
                            )
                        )
                    )
                )
            ),
            wp.element.createElement(ServerSideRender, { block: "wpbricks/bricks-portfolio-block", attributes: attributes })
        );
    },
    save: function save(props) {
        return null;
    }
});

/***/ })
/******/ ]);