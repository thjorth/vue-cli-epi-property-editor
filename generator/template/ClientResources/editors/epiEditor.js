define([
    "dojo/_base/array",
    "dojo/query",
    "dojo/on",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-construct",

    "dijit/_CssStateMixin",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",

    "epi/epi",
    "epi/shell/widget/_ValueRequiredMixin",
    "epi-cms/_ContentContextMixin"

],
    function (
        array,
        query,
        on,
        declare,
        lang,
        domConstruct,

        _CssStateMixin,
        _Widget,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,

        epi,
        _ValueRequiredMixin,
        _ContentContextMixin
    ) {
        return declare("<%= options.editorName %>", [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin, _CssStateMixin, _ValueRequiredMixin, _ContentContextMixin], {

            templateString: '\
<div class="">\
	<input style=\"visibility: hidden; font-size: 0;\" type=\"text\" data-dojo-attach-point=\"<%= options.editorName %>Value\" data-dojo-attach-event=\"onchange:_onChange\" />\
	<main id="facetsSelector"></main>\
</div>',
            intermediateChanges: true,
            value: null,
            postCreate: function () {
                this.inherited(arguments);
                this._loadCssFile();
                setTimeout(this._loadScriptFiles.bind(this), 0);
                this._bindEvents();
            },
            startup: function () {
            },
            getCurrentLanguage: function () {
                var context = this.getCurrentContext();
                return context.language;
            },
            _loadScriptFiles: function () {
                if (!document.getElementById('facets-selector-init-module')) {
                    var vendor = document.createElement('script');
                    vendor.src = '/ClientResources/Editors/<%= options.editorName %>/chunk-vendors.js';
                    document.body.appendChild(vendor);

                    var editor = document.createElement('script');
                    //editor.type = 'module';
                    editor.src = '/ClientResources/Editors/<%= options.editorName %>/app.js';
                    editor.id = "facets-selector-init-module";
                    document.body.appendChild(editor);

                    var intervalId = setInterval(function () {
                        if (window.facetsselector) {
                            // var event = new CustomEvent('facetsselector:serversideupdate', { detail: this.value });
                            // document.body.dispatchEvent(event);
                            window.facetsselector.init(this.getCurrentLanguage());
                            clearInterval(intervalId);
                        }
                    }.bind(this), 500);
                }
                else {
                    // var event = new CustomEvent('facetsselector:serversideupdate', { detail: this.value });
                    // document.body.dispatchEvent(event);
                    window.facetsselector.init(this.getCurrentLanguage());
                }
            },
            _onClientReady: function () {
                var event = new CustomEvent('<%= options.editorNameLC %>:serversideupdate', { detail: this.value });
                document.body.dispatchEvent(event);
            },
            _setValueAttr: function (value) {
                this._setValue(value);
                this.facetsValue.value = value;
            },
            _onClientChange: function (e, v) {
                if (this.facetsValue) {
                    this.facetsValue.value = e.detail;
                }
                this._setValue(e.detail, true);
            },
            _onChange(e) {
                this._set('value', e.target.value);
                this.onChange(this.value);
            },
            _bindEvents: function (myself) {
                document.body.addEventListener('<%= options.editorNameLC %>:clientsideupdate', this._onClientChange.bind(this));
                document.body.addEventListener('<%= options.editorNameLC %>:ready', this._onClientReady.bind(this));
            },
            _setValue: function (value, surpress) {
                if (!surpress) {
                    var event = new CustomEvent('<%= options.editorNameLC %>:serversideupdate', { detail: value });
                    document.body.dispatchEvent(event);
                }

                //avoids running this if the widget already is started
                if (this._started && epi.areEqual(this.value, value)) {
                    return;
                }

                // set value to this widget (and notify observers). 
                this._set("value", value);


                if (this._started) {
                    // Trigger change event
                    this.onChange(value);
                }
            },
            _loadCssFile: function () {
                function insertCssLink(path, id) {
                    var $ = document;
                    if (!$.getElementById(id)) {
                        var head = $.getElementsByTagName('head')[0];
                        var link = $.createElement('link');
                        link.id = id;
                        link.rel = 'stylesheet';
                        link.type = 'text/css';
                        link.href = path;
                        link.media = 'all';
                        head.appendChild(link);
                    }
                }
                insertCssLink('/ClientResources/Editors/<%= options.editorName %>/app.css', '<%= options.editorName %>Style');
            },
        });
    });
