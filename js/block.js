
const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {
    BlockControls,
    InspectorControls,
    ColorPalette,
    AlignmentToolbar
} = wp.editor;
const {
    Panel,
    PanelBody,
    PanelRow,
    TextControl,
    SelectControl,
    ServerSideRender,
    RangeControl,
    Disabled,
    ToggleControl,
    RadioControl,
    Toolbar
} = wp.components;
const {addQueryArgs} = wp.url;
const allCatArray = [];
const allCat = wp.apiFetch(
    {path: addQueryArgs("/wp/v2/wpbricks-portfolio-cats", {per_page: -1})}
).then(categories => {
    //allCatArray.push({label: 'All', value: 'all'});
    jQuery.each(categories, function (key, val) {
        allCatArray.push({label: val.name, value: val.slug}); 
    });
    return allCatArray;
});

registerBlockType('wpbricks/bricks-portfolio-block', {
    title: __("Bricks Portfolio"),
    description: __(
      "Bricks Portfolio is a gutenberg block where you can display portgolio list with different categories."
    ),
    icon: <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
         width="24.000000pt" height="24.000000pt" viewBox="0 0 24.000000 24.000000"
         preserveAspectRatio="xMidYMid meet">
        <metadata>
        Created by potrace 1.10, written by Peter Selinger 2001-2011
        </metadata>
        <g transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)"
        fill="#ff7f50" stroke="none">
        <path d="M67 196 c-3 -8 -18 -16 -32 -18 -25 -3 -27 -7 -31 -53 l-4 -50 23 40
        23 40 72 3 c40 2 72 7 72 12 0 9 -16 11 -85 13 -16 0 -17 1 -2 4 25 6 21 23
        -7 23 -13 0 -26 -6 -29 -14z"/>
        <path d="M31 93 c-16 -29 -26 -55 -23 -58 3 -3 44 -5 92 -5 l86 0 27 55 c15
        31 27 57 27 59 0 2 -41 3 -91 2 l-90 -1 -28 -52z m169 19 c0 -4 -7 -18 -16
        -30 -13 -19 -24 -22 -79 -22 l-63 0 14 30 c15 29 18 30 80 30 35 0 64 -3 64
        -8z"/>
        </g>
        </svg>,
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
            type: 'array',
        },
        titleFontSize: {
            type: 'integer',
            default: 20,
        },
        descFontSize: {
            type: 'integer',
            default: 16,
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
            type: 'number',
        },
        portfolio_tab_textUppercase: {
            type: 'string',
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
        },
    },
    edit: (props) => {

        const {attributes, setAttributes} = props;
        const {
            portfolio_columns,
            portfolio_cat_show_type,
            portfolioCategory,
            portfolio_tab_position,
            portfolio_tab_fontSize,
            portfolio_tab_fontWeight,
            portfolio_tab_textUppercase,
            portfolio_tab_FontColor,
            titleFontSize,
            descFontSize,
            portfolio_excerpt,
            portfolio_cat_show_columnstype,
            excerpt_words_length,
            display_portfolio_title,
            display_feature_image,
            portfolio_marginTop,
            portfolio_marginRight,
            portfolio_marginBottom,
            portfolio_marginLeft,
            portfolio_paddingTop,
            portfolio_paddingRight,
            portfolio_paddingBottom,
            portfolio_paddingLeft,
        } = attributes;
        return (
            <div className={'wpbricks-portfolio'}>
                <InspectorControls>
                    <PanelBody title={__('Category Filter', 'wpbricks-portfolio-block-addons')}>
                        <PanelRow>
                            <ToggleControl
                                label="Selected Category (Default: All)"
                                help={portfolio_cat_show_type ? false : true}
                                checked={portfolio_cat_show_type}
                                onChange={(value) => setAttributes({portfolio_cat_show_type: value})}
                            />
                        </PanelRow>
                        {
                            portfolio_cat_show_type && (
                                <PanelRow>
                                    <SelectControl
                                        multiple
                                        label={__('Select Categories')}
                                        value={portfolioCategory}
                                        options={allCatArray}
                                        onChange={(value) => setAttributes({portfolioCategory: value})}
                                    />
                                </PanelRow>
                            )
                        }
                    </PanelBody>
                    <PanelBody title={__('Tab Setting', 'wpbricks-portfolio-block-addons')}  initialOpen={false}>
                        <PanelRow>
                            <div className="col-main-2">
                                <div className="col-main-inner">
                                    <label className="mt10">Font Size</label>
                                      <TextControl
                                            type="number"
                                            min="1"
                                            value={portfolio_tab_fontSize}
                                            placeholder="px"
                                            onChange={value => setAttributes({ portfolio_tab_fontSize: parseInt(value) })}
                                      />
                                </div>
                            <div className="col-main-inner">
                                <label className="mt10">Font Weight</label>
                                <SelectControl
                                    value={portfolio_tab_fontWeight}
                                    options={[
                                        { label: "300", value: "300" },
                                        { label: "500", value: "500" },
                                        { label: "600", value: "600" },
                                        { label: "700", value: "700" },
                                        { label: "800", value: "800" }
                                    ]}
                                    onChange={value =>
                                        setAttributes({ portfolio_tab_fontWeight: parseInt(value) })
                                    }
                                />
                            </div>
                          </div>
                        </PanelRow>
                        <PanelRow>
                            <SelectControl
                                label="Select Transform"
                                value={portfolio_tab_textUppercase}
                                options={[
                                    { label: "none", value: "none" },
                                    { label: "Capitalze", value: "capitalize" },
                                    { label: "Uppercae", value: "uppercase" },
                                    { label: "Lowercae", value: "lowercase" },
                                    { label: "Initial", value: "initial" }
                                ]}
                                onChange={value => setAttributes({ portfolio_tab_textUppercase: value })}
                            />
                        </PanelRow>
                        <PanelRow>
                            <label>Alignment</label>
                            <AlignmentToolbar
                                value={portfolio_tab_position}
                                onChange={newAlignment =>
                                    setAttributes({
                                        portfolio_tab_position: newAlignment === undefined ? "none" : newAlignment
                                    })
                                }
                            />
                        </PanelRow>
                        <label className="mt10">Font color</label>
                        <ColorPalette
                          value={portfolio_tab_FontColor}
                          onChange={value =>
                            setAttributes({
                              portfolio_tab_FontColor: value
                            })
                          }
                        />
                    </PanelBody>
                    <PanelBody title={__('Typography', 'wpbricks-portfolio-block-addons')}  initialOpen={false}>
                        <PanelRow>
                            <RangeControl
                                label="Columns"
                                value={portfolio_columns}
                                onChange={(value) => setAttributes({portfolio_columns: value})}
                                min={2}
                                max={9}
                            />
                        </PanelRow>
                        <PanelRow>
                            <RangeControl
                                label="Title Font Size"
                                value={titleFontSize}
                                onChange={(value) => setAttributes({titleFontSize: value})}
                                min={10}
                                max={50}
                            />
                        </PanelRow>
                        <PanelRow>
                            <RangeControl
                                label="Description Font Size"
                                value={descFontSize}
                                onChange={(value) => setAttributes({descFontSize: value})}
                                min={10}
                                max={50}
                            />
                        </PanelRow>
                    </PanelBody>
                    <PanelBody title={__('Display Content', 'wpbricks-portfolio-block-addons')}  initialOpen={false}>
                        <PanelRow>
                            <ToggleControl
                                label="Portfolio Excerpt"
                                help={portfolio_excerpt ? true : false}
                                checked={portfolio_excerpt}
                                onChange={(value) => setAttributes({portfolio_excerpt: value})}
                            />
                        </PanelRow>
                        {
                            portfolio_excerpt && (
                                <PanelRow>
                                    <RangeControl
                                        label="Max number of words in excerpt"
                                        value={excerpt_words_length}
                                        onChange={(value) => setAttributes({excerpt_words_length: value})}
                                        min={10}
                                        max={100}
                                    />
                                </PanelRow>
                            )

                        }
                        <PanelRow>
                            <ToggleControl
                                label="Display Portfolio Title"
                                help={display_portfolio_title ? true : false}
                                checked={display_portfolio_title}
                                onChange={(value) => setAttributes({display_portfolio_title: value})}
                            />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label="Display Feature Image"
                                help={display_feature_image ? true : false}
                                checked={display_feature_image}
                                onChange={(value) => setAttributes({display_feature_image: value})}
                            />
                        </PanelRow>
                    </PanelBody>
                    <PanelBody title={__('Spacing', 'wpbricks-portfolio-block-addons')}  initialOpen={false}>
                        <label class="mt20">Margin Setting</label>
                        <PanelRow>
                          <div className="margin-setting">
                            <div className="col-main-2">
                              <div
                                className="padd-top col-main-inner"
                                data-tooltip="margin Top"
                              >
                                <label>Top</label>
                                <TextControl
                                  type="number"
                                  min="1"
                                  value={portfolio_marginTop}
                                  onChange={value => setAttributes({ portfolio_marginTop: value })}
                                />
                              </div>
                              <div
                                className="padd-buttom col-main-inner"
                                data-tooltip="margin Bottom"
                              >
                                <label>Bottom</label>
                                <TextControl
                                  type="number"
                                  min="1"
                                  value={portfolio_marginBottom}
                                  onChange={value => setAttributes({ portfolio_marginBottom: value })}
                                />
                              </div>
                            </div>
                            <div className="col-main-2">
                              <div
                                className="padd-left col-main-inner"
                                data-tooltip="margin Left"
                              >
                                <label>Left</label>
                                <TextControl
                                  type="number"
                                  min="1"
                                  value={portfolio_marginLeft}
                                  onChange={value => setAttributes({ portfolio_marginLeft: value })}
                                />
                              </div>

                              <div
                                className="padd-right col-main-inner"
                                data-tooltip="margin Right"
                              >
                                <label>Right</label>
                                <TextControl
                                  type="number"
                                  min="1"
                                  value={portfolio_marginRight}
                                  onChange={value => setAttributes({ portfolio_marginRight: value })}
                                />
                              </div>
                            </div>
                          </div>
                        </PanelRow>
                        <label className="mt20">Padding Setting</label>
                        <PanelRow>
                          <div className="padding-setting">
                            <div className="col-main-2">
                              <div
                                className="padd-top col-main-inner"
                                data-tooltip="padding Top"
                              >
                                <label>Top</label>
                                <TextControl
                                  type="number"
                                  min="1"
                                  value={portfolio_paddingTop}
                                  onChange={value => setAttributes({ portfolio_paddingTop: value })}
                                />
                              </div>

                              <div
                                className="padd-buttom col-main-inner"
                                data-tooltip="padding Bottom"
                              >
                                <label>Bottom</label>
                                <TextControl
                                  type="number"
                                  min="1"
                                  value={portfolio_paddingBottom}
                                  onChange={value => setAttributes({ portfolio_paddingBottom: value })}
                                />
                              </div>
                            </div>
                            <div className="col-main-2">
                              <div
                                className="padd-left col-main-inner"
                                data-tooltip="padding Left"
                              >
                                <label>Left</label>
                                <TextControl
                                  type="number"
                                  min="1"
                                  value={portfolio_paddingLeft}
                                  onChange={value => setAttributes({ portfolio_paddingLeft: value })}
                                />
                              </div>
                              <div
                                className="padd-right col-main-inner"
                                data-tooltip="padding Right"
                              >
                                <label>Right</label>
                                <TextControl
                                  type="number"
                                  min="1"
                                  value={portfolio_paddingRight}
                                  onChange={value => setAttributes({ portfolio_paddingRight: value })}
                                />
                              </div>
                            </div>
                          </div>
                        </PanelRow>
                    </PanelBody>

                </InspectorControls>
                
                <ServerSideRender block="wpbricks/bricks-portfolio-block" attributes={attributes}/>
                
            </div>
        );
    },
    save: (props) => {
        return null;
    },
});



