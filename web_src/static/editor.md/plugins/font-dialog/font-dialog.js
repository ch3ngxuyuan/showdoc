/*!
 * Font dialog plugin for Editor.md
 *
 * @file        font-dialog.js
 * @author      silence
 * @version     1.0.0
 * @updateTime  2021-02-17
 * {@font       https://github.com/pandao/editor.md}
 * @license     MIT
 */

(function() {

    var factory = function (exports) {

		var pluginName   = "font-dialog";

		exports.fn.fontDialog = function() {

			var _this       = this;
			var cm          = this.cm;
            var editor      = this.editor;
            var settings    = this.settings;
            var selection   = cm.getSelection();
            var lang        = this.lang;
            var fontLang    = {
                    title       : "Font",
                    textTitle   : "Text",
                    colorTitle  : "Color",
                    sizeTitle   : "Size",
                    styleTitle  : "Style"
            };
            var classPrefix = this.classPrefix;
			var dialogName  = classPrefix + pluginName, dialog;

			cm.focus();

            if (editor.find("." + dialogName).length > 0)
            {
                dialog = editor.find("." + dialogName);
                dialog.find("[data-text]").val(selection);
                dialog.find("[data-color]").val("#000");
                dialog.find("[data-size]").val("3");

                this.dialogShowMask(dialog);
                this.dialogLockScreen();
                dialog.show();
            }
            else
            {
                var dialogHTML = "<div class=\"" + classPrefix + "form\">" +
                                "<label>" + fontLang.textTitle + "</label>" +
                                "<input type=\"text\" value=\"" + selection + "\" data-text />" +
                                "<br/>" +
                                "<label>" + fontLang.colorTitle + "</label>" +
                                "<input type=\"text\" value=\"#000\" data-color />" +
                                "<br/>" +
                                "<label>" + fontLang.sizeTitle + "</label>" +
                                "<input type=\"text\" value=\"3\" data-size />" +
                                "<br/>" +
                                "<label>" + fontLang.styleTitle + "</label>" +
                                "<input type=\"text\" value=\"\" data-style />" +
                                "<br/>" +
                            "</div>";

                dialog = this.createDialog({
                    title      : fontLang.title,
                    width      : 380,
                    height     : 281,
                    content    : dialogHTML,
                    mask       : settings.dialogShowMask,
                    drag       : settings.dialogDraggable,
                    lockScreen : settings.dialogLockScreen,
                    maskStyle  : {
                        opacity         : settings.dialogMaskOpacity,
                        backgroundColor : settings.dialogMaskBgColor
                    },
                    buttons    : {
                        enter  : [lang.buttons.enter, function() {
                            var text   = this.find("[data-text]").val();
                            var color   = this.find("[data-color]").val();
                            var size = this.find("[data-size]").val();
                            var style = this.find("[data-style]").val();

                            var str = "",c="",s="",ss="";
                            if (style != ""){
                                ss=' style="'+style+'"';
                            }
                            if (color != ""){
                                c=' color='+color;
                            }
                            if (size != ""){
                                s=' size='+size;
                            }
                            str = "<font"+c+s+ss+">"+text+"</font>";

                            cm.replaceSelection(str);

                            this.hide().lockScreen(false).hideMask();

                            return false;
                        }],

                        cancel : [lang.buttons.cancel, function() {                                   
                            this.hide().lockScreen(false).hideMask();

                            return false;
                        }]
                    }
                });
			}
		};

	};
    
	// CommonJS/Node.js
	if (typeof require === "function" && typeof exports === "object" && typeof module === "object")
    { 
        module.exports = factory;
    }
	else if (typeof define === "function")  // AMD/CMD/Sea.js
    {
		if (define.amd) { // for Require.js

			define(["editormd"], function(editormd) {
                factory(editormd);
            });

		} else { // for Sea.js
			define(function(require) {
                var editormd = require("./../../editormd");
                factory(editormd);
            });
		}
	} 
	else
	{
        factory(window.editormd);
	}

})();
