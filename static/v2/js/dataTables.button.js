/*!
 Buttons for DataTables 1.2.2
 ?2016 SpryMedia Ltd - datatables.net/license
 */
(function (d) {
    "function" === typeof define && define.amd ? define(["jquery", "datatables.net"], function (n) {
        return d(n, window, document)
    }) : "object" === typeof exports ? module.exports = function (n, o) {
        n || (n = window);
        if (!o || !o.fn.dataTable)o = require("datatables.net")(n, o).$;
        return d(o, n, n.document)
    } : d(jQuery, window, document)
})(function (d, n, o, m) {
    var i = d.fn.dataTable, u = 0, v = 0, j = i.ext.buttons, l = function (a, b) {
        !0 === b && (b = {});
        d.isArray(b) && (b = {buttons: b});
        this.c = d.extend(!0, {}, l.defaults, b);
        b.buttons && (this.c.buttons = b.buttons);
        this.s = {dt: new i.Api(a), buttons: [], listenKeys: "", namespace: "dtb" + u++};
        this.dom = {container: d("<" + this.c.dom.container.tag + "/>").addClass(this.c.dom.container.className)};
        this._constructor()
    };
    d.extend(l.prototype, {
        action: function (a, b) {
            var c = this._nodeToButton(a);
            if (b === m)return c.conf.action;
            c.conf.action = b;
            return this
        }, active: function (a, b) {
            var c = this._nodeToButton(a), e = this.c.dom.button.active, c = d(c.node);
            if (b === m)return c.hasClass(e);
            c.toggleClass(e, b === m ? !0 : b);
            return this
        }, add: function (a, b) {
            var c =
                this.s.buttons;
            if ("string" === typeof b) {
                for (var e = b.split("-"), c = this.s, d = 0, h = e.length - 1; d < h; d++)c = c.buttons[1 * e[d]];
                c = c.buttons;
                b = 1 * e[e.length - 1]
            }
            this._expandButton(c, a, !1, b);
            this._draw();
            return this
        }, container: function () {
            return this.dom.container
        }, disable: function (a) {
            a = this._nodeToButton(a);
            d(a.node).addClass(this.c.dom.button.disabled);
            return this
        }, destroy: function () {
            d("body").off("keyup." + this.s.namespace);
            var a = this.s.buttons.slice(), b, c;
            b = 0;
            for (c = a.length; b < c; b++)this.remove(a[b].node);
            this.dom.container.remove();
            a = this.s.dt.settings()[0];
            b = 0;
            for (c = a.length; b < c; b++)if (a.inst === this) {
                a.splice(b, 1);
                break
            }
            return this
        }, enable: function (a, b) {
            if (!1 === b)return this.disable(a);
            var c = this._nodeToButton(a);
            d(c.node).removeClass(this.c.dom.button.disabled);
            return this
        }, name: function () {
            return this.c.name
        }, node: function (a) {
            a = this._nodeToButton(a);
            return d(a.node)
        }, remove: function (a) {
            var b = this._nodeToButton(a), c = this._nodeToHost(a), e = this.s.dt;
            if (b.buttons.length)for (var g = b.buttons.length - 1; 0 <= g; g--)this.remove(b.buttons[g].node);
            b.conf.destroy && b.conf.destroy.call(e.button(a), e, d(a), b.conf);
            this._removeKey(b.conf);
            d(b.node).remove();
            a = d.inArray(b, c);
            c.splice(a, 1);
            return this
        }, text: function (a, b) {
            var c = this._nodeToButton(a), e = this.c.dom.collection.buttonLiner, e = c.inCollection && e && e.tag ? e.tag : this.c.dom.buttonLiner.tag, g = this.s.dt, h = d(c.node), f = function (a) {
                return "function" === typeof a ? a(g, h, c.conf) : a
            };
            if (b === m)return f(c.conf.text);
            c.conf.text = b;
            e ? h.children(e).html(f(b)) : h.html(f(b));
            return this
        }, _constructor: function () {
            var a =
                this, b = this.s.dt, c = b.settings()[0], e = this.c.buttons;
            c._buttons || (c._buttons = []);
            c._buttons.push({inst: this, name: this.c.name});
            for (var c = 0, g = e.length; c < g; c++)this.add(e[c]);
            b.on("destroy", function () {
                a.destroy()
            });
            d("body").on("keyup." + this.s.namespace, function (b) {
                if (!o.activeElement || o.activeElement === o.body) {
                    var c = String.fromCharCode(b.keyCode).toLowerCase();
                    a.s.listenKeys.toLowerCase().indexOf(c) !== -1 && a._keypress(c, b)
                }
            })
        }, _addKey: function (a) {
            a.key && (this.s.listenKeys += d.isPlainObject(a.key) ? a.key.key :
                a.key)
        }, _draw: function (a, b) {
            a || (a = this.dom.container, b = this.s.buttons);
            a.children().detach();
            for (var c = 0, e = b.length; c < e; c++)a.append(b[c].inserter), b[c].buttons && b[c].buttons.length && this._draw(b[c].collection, b[c].buttons)
        }, _expandButton: function (a, b, c, e) {
            for (var g = this.s.dt, h = 0, b = !d.isArray(b) ? [b] : b, f = 0, r = b.length; f < r; f++) {
                var k = this._resolveExtends(b[f]);
                if (k)if (d.isArray(k))this._expandButton(a, k, c, e); else {
                    var p = this._buildButton(k, c);
                    if (p) {
                        e !== m ? (a.splice(e, 0, p), e++) : a.push(p);
                        if (p.conf.buttons) {
                            var s =
                                this.c.dom.collection;
                            p.collection = d("<" + s.tag + "/>").addClass(s.className);
                            p.conf._collection = p.collection;
                            this._expandButton(p.buttons, p.conf.buttons, !0, e)
                        }
                        k.init && k.init.call(g.button(p.node), g, d(p.node), k);
                        h++
                    }
                }
            }
        }, _buildButton: function (a, b) {
            var c = this.c.dom.button, e = this.c.dom.buttonLiner, g = this.c.dom.collection, h = this.s.dt, f = function (b) {
                return "function" === typeof b ? b(h, k, a) : b
            };
            b && g.button && (c = g.button);
            b && g.buttonLiner && (e = g.buttonLiner);
            if (a.available && !a.available(h, a))return !1;
            var r = function (a,
                              b, c, e) {
                e.action.call(b.button(c), a, b, c, e);
                d(b.table().node()).triggerHandler("buttons-action.dt", [b.button(c), b, c, e])
            }, k = d("<" + c.tag + "/>").addClass(c.className).attr("tabindex", this.s.dt.settings()[0].iTabIndex).attr("aria-controls", this.s.dt.table().node().id).on("click.dtb", function (b) {
                b.preventDefault();
                !k.hasClass(c.disabled) && a.action && r(b, h, k, a);
                k.blur()
            }).on("keyup.dtb", function (b) {
                b.keyCode === 13 && !k.hasClass(c.disabled) && a.action && r(b, h, k, a)
            });
            "a" === c.tag.toLowerCase() && k.attr("href", "#");
            e.tag ? (g = d("<" + e.tag + "/>").html(f(a.text)).addClass(e.className), "a" === e.tag.toLowerCase() && g.attr("href", "#"), k.append(g)) : k.html(f(a.text));
            !1 === a.enabled && k.addClass(c.disabled);
            a.className && k.addClass(a.className);
            a.titleAttr && k.attr("title", a.titleAttr);
            a.namespace || (a.namespace = ".dt-button-" + v++);
            e = (e = this.c.dom.buttonContainer) && e.tag ? d("<" + e.tag + "/>").addClass(e.className).append(k) : k;
            this._addKey(a);
            return {conf: a, node: k.get(0), inserter: e, buttons: [], inCollection: b, collection: null}
        }, _nodeToButton: function (a,
                                    b) {
            b || (b = this.s.buttons);
            for (var c = 0, e = b.length; c < e; c++) {
                if (b[c].node === a)return b[c];
                if (b[c].buttons.length) {
                    var d = this._nodeToButton(a, b[c].buttons);
                    if (d)return d
                }
            }
        }, _nodeToHost: function (a, b) {
            b || (b = this.s.buttons);
            for (var c = 0, e = b.length; c < e; c++) {
                if (b[c].node === a)return b;
                if (b[c].buttons.length) {
                    var d = this._nodeToHost(a, b[c].buttons);
                    if (d)return d
                }
            }
        }, _keypress: function (a, b) {
            var c = function (e) {
                for (var g = 0, h = e.length; g < h; g++) {
                    var f = e[g].conf, r = e[g].node;
                    if (f.key)if (f.key === a)d(r).click(); else if (d.isPlainObject(f.key) &&
                        f.key.key === a && (!f.key.shiftKey || b.shiftKey))if (!f.key.altKey || b.altKey)if (!f.key.ctrlKey || b.ctrlKey)(!f.key.metaKey || b.metaKey) && d(r).click();
                    e[g].buttons.length && c(e[g].buttons)
                }
            };
            c(this.s.buttons)
        }, _removeKey: function (a) {
            if (a.key) {
                var b = d.isPlainObject(a.key) ? a.key.key : a.key, a = this.s.listenKeys.split(""), b = d.inArray(b, a);
                a.splice(b, 1);
                this.s.listenKeys = a.join("")
            }
        }, _resolveExtends: function (a) {
            for (var b = this.s.dt, c, e, g = function (c) {
                for (var e = 0; !d.isPlainObject(c) && !d.isArray(c);) {
                    if (c === m)return;
                    if ("function" === typeof c) {
                        if (c = c(b, a), !c)return !1
                    } else if ("string" === typeof c) {
                        if (!j[c])throw"Unknown button type: " + c;
                        c = j[c]
                    }
                    e++;
                    if (30 < e)throw"Buttons: Too many iterations";
                }
                return d.isArray(c) ? c : d.extend({}, c)
            }, a = g(a); a && a.extend;) {
                if (!j[a.extend])throw"Cannot extend unknown button type: " + a.extend;
                var h = g(j[a.extend]);
                if (d.isArray(h))return h;
                if (!h)return !1;
                c = h.className;
                a = d.extend({}, h, a);
                c && a.className !== c && (a.className = c + " " + a.className);
                var f = a.postfixButtons;
                if (f) {
                    a.buttons || (a.buttons = []);
                    c = 0;
                    for (e = f.length; c < e; c++)a.buttons.push(f[c]);
                    a.postfixButtons = null
                }
                if (f = a.prefixButtons) {
                    a.buttons || (a.buttons = []);
                    c = 0;
                    for (e = f.length; c < e; c++)a.buttons.splice(c, 0, f[c]);
                    a.prefixButtons = null
                }
                a.extend = h.extend
            }
            return a
        }
    });
    l.background = function (a, b, c) {
        c === m && (c = 400);
        a ? d("<div/>").addClass(b).css("display", "none").appendTo("body").fadeIn(c) : d("body > div." + b).fadeOut(c, function () {
            d(this).removeClass(b).remove()
        })
    };
    l.instanceSelector = function (a, b) {
        if (!a)return d.map(b, function (a) {
            return a.inst
        });
        var c =
            [], e = d.map(b, function (a) {
            return a.name
        }), g = function (a) {
            if (d.isArray(a))for (var f = 0, r = a.length; f < r; f++)g(a[f]); else"string" === typeof a ? -1 !== a.indexOf(",") ? g(a.split(",")) : (a = d.inArray(d.trim(a), e), -1 !== a && c.push(b[a].inst)) : "number" === typeof a && c.push(b[a].inst)
        };
        g(a);
        return c
    };
    l.buttonSelector = function (a, b) {
        for (var c = [], e = function (a, b, c) {
            for (var d, g, f = 0, h = b.length; f < h; f++)if (d = b[f])g = c !== m ? c + f : f + "", a.push({
                node: d.node,
                name: d.conf.name,
                idx: g
            }), d.buttons && e(a, d.buttons, g + "-")
        }, g = function (a, b) {
            var f,
                h, i = [];
            e(i, b.s.buttons);
            f = d.map(i, function (a) {
                return a.node
            });
            if (d.isArray(a) || a instanceof d) {
                f = 0;
                for (h = a.length; f < h; f++)g(a[f], b)
            } else if (null === a || a === m || "*" === a) {
                f = 0;
                for (h = i.length; f < h; f++)c.push({inst: b, node: i[f].node})
            } else if ("number" === typeof a)c.push({
                inst: b,
                node: b.s.buttons[a].node
            }); else if ("string" === typeof a)if (-1 !== a.indexOf(",")) {
                i = a.split(",");
                f = 0;
                for (h = i.length; f < h; f++)g(d.trim(i[f]), b)
            } else if (a.match(/^\d+(\-\d+)*$/))f = d.map(i, function (a) {
                return a.idx
            }), c.push({
                inst: b, node: i[d.inArray(a,
                    f)].node
            }); else if (-1 !== a.indexOf(":name")) {
                var j = a.replace(":name", "");
                f = 0;
                for (h = i.length; f < h; f++)i[f].name === j && c.push({inst: b, node: i[f].node})
            } else d(f).filter(a).each(function () {
                c.push({inst: b, node: this})
            }); else"object" === typeof a && a.nodeName && (i = d.inArray(a, f), -1 !== i && c.push({
                inst: b,
                node: f[i]
            }))
        }, h = 0, f = a.length; h < f; h++)g(b, a[h]);
        return c
    };
    l.defaults = {
        buttons: ["copy", "excel", "csv", "pdf", "print"], name: "main", tabIndex: 0, dom: {
            container: {tag: "div", className: "dt-buttons"},
            collection: {tag: "div", className: "dt-button-collection"},
            button: {tag: "a", className: "dt-button", active: "active", disabled: "disabled"},
            buttonLiner: {tag: "span", className: ""}
        }
    };
    l.version = "1.2.2";
    d.extend(j, {
        collection: {
            text: function (a) {
                return a.i18n("buttons.collection", "Collection")
            }, className: "buttons-collection", action: function (a, b, c, e) {
                var a = c.offset(), g = d(b.table().container()), h = !1;
                d("div.dt-button-background").length && (h = d("div.dt-button-collection").offset(), d("body").trigger("click.dtb-collection"));
                e._collection.addClass(e.collectionLayout).css("display",
                    "none").appendTo("body").fadeIn(e.fade);
                var f = e._collection.css("position");
                h && "absolute" === f ? e._collection.css({
                    top: h.top + 5,
                    left: h.left + 5
                }) : "absolute" === f ? (e._collection.css({
                    top: a.top + c.outerHeight(),
                    left: a.left
                }), c = a.left + e._collection.outerWidth(), g = g.offset().left + g.width(), c > g && e._collection.css("left", a.left - (c - g))) : (a = e._collection.height() / 2, a > d(n).height() / 2 && (a = d(n).height() / 2), e._collection.css("marginTop", -1 * a));
                e.background && l.background(!0, e.backgroundClassName, e.fade);
                setTimeout(function () {
                    d("div.dt-button-background").on("click.dtb-collection",
                        function () {
                        });
                    d("body").on("click.dtb-collection", function (a) {
                        var c = d.fn.addBack ? "addBack" : "andSelf";
                        if (!d(a.target).parents()[c]().filter(e._collection).length) {
                            e._collection.fadeOut(e.fade, function () {
                                e._collection.detach()
                            });
                            d("div.dt-button-background").off("click.dtb-collection");
                            l.background(false, e.backgroundClassName, e.fade);
                            d("body").off("click.dtb-collection");
                            b.off("buttons-action.b-internal")
                        }
                    })
                }, 10);
                if (e.autoClose)b.on("buttons-action.b-internal", function () {
                    d("div.dt-button-background").click()
                })
            },
            background: !0, collectionLayout: "", backgroundClassName: "dt-button-background", autoClose: !1, fade: 400
        }, copy: function (a, b) {
            if (j.copyHtml5)return "copyHtml5";
            if (j.copyFlash && j.copyFlash.available(a, b))return "copyFlash"
        }, csv: function (a, b) {
            if (j.csvHtml5 && j.csvHtml5.available(a, b))return "csvHtml5";
            if (j.csvFlash && j.csvFlash.available(a, b))return "csvFlash"
        }, excel: function (a, b) {
            if (j.excelHtml5 && j.excelHtml5.available(a, b))return "excelHtml5";
            if (j.excelFlash && j.excelFlash.available(a, b))return "excelFlash"
        }, pdf: function (a,
                          b) {
            if (j.pdfHtml5 && j.pdfHtml5.available(a, b))return "pdfHtml5";
            if (j.pdfFlash && j.pdfFlash.available(a, b))return "pdfFlash"
        }, pageLength: function (a) {
            var a = a.settings()[0].aLengthMenu, b = d.isArray(a[0]) ? a[0] : a, c = d.isArray(a[0]) ? a[1] : a, e = function (a) {
                return a.i18n("buttons.pageLength", {"-1": "Show all rows", _: "Show %d rows"}, a.page.len())
            };
            return {
                extend: "collection",
                text: e,
                className: "buttons-page-length",
                autoClose: !0,
                buttons: d.map(b, function (a, b) {
                    return {
                        text: c[b], action: function (b, c) {
                            c.page.len(a).draw()
                        }, init: function (b,
                                           c, e) {
                            var d = this, c = function () {
                                d.active(b.page.len() === a)
                            };
                            b.on("length.dt" + e.namespace, c);
                            c()
                        }, destroy: function (a, b, c) {
                            a.off("length.dt" + c.namespace)
                        }
                    }
                }),
                init: function (a, b, c) {
                    var d = this;
                    a.on("length.dt" + c.namespace, function () {
                        d.text(e(a))
                    })
                },
                destroy: function (a, b, c) {
                    a.off("length.dt" + c.namespace)
                }
            }
        }
    });
    i.Api.register("buttons()", function (a, b) {
        b === m && (b = a, a = m);
        this.selector.buttonGroup = a;
        var c = this.iterator(!0, "table", function (c) {
            if (c._buttons)return l.buttonSelector(l.instanceSelector(a, c._buttons),
                b)
        }, !0);
        c._groupSelector = a;
        return c
    });
    i.Api.register("button()", function (a, b) {
        var c = this.buttons(a, b);
        1 < c.length && c.splice(1, c.length);
        return c
    });
    i.Api.registerPlural("buttons().active()", "button().active()", function (a) {
        return a === m ? this.map(function (a) {
            return a.inst.active(a.node)
        }) : this.each(function (b) {
            b.inst.active(b.node, a)
        })
    });
    i.Api.registerPlural("buttons().action()", "button().action()", function (a) {
        return a === m ? this.map(function (a) {
            return a.inst.action(a.node)
        }) : this.each(function (b) {
            b.inst.action(b.node,
                a)
        })
    });
    i.Api.register(["buttons().enable()", "button().enable()"], function (a) {
        return this.each(function (b) {
            b.inst.enable(b.node, a)
        })
    });
    i.Api.register(["buttons().disable()", "button().disable()"], function () {
        return this.each(function (a) {
            a.inst.disable(a.node)
        })
    });
    i.Api.registerPlural("buttons().nodes()", "button().node()", function () {
        var a = d();
        d(this.each(function (b) {
            a = a.add(b.inst.node(b.node))
        }));
        return a
    });
    i.Api.registerPlural("buttons().text()", "button().text()", function (a) {
        return a === m ? this.map(function (a) {
            return a.inst.text(a.node)
        }) :
            this.each(function (b) {
                b.inst.text(b.node, a)
            })
    });
    i.Api.registerPlural("buttons().trigger()", "button().trigger()", function () {
        return this.each(function (a) {
            a.inst.node(a.node).trigger("click")
        })
    });
    i.Api.registerPlural("buttons().containers()", "buttons().container()", function () {
        var a = d(), b = this._groupSelector;
        this.iterator(!0, "table", function (c) {
            if (c._buttons)for (var c = l.instanceSelector(b, c._buttons), d = 0, g = c.length; d < g; d++)a = a.add(c[d].container())
        });
        return a
    });
    i.Api.register("button().add()", function (a,
                                               b) {
        var c = this.context;
        c.length && (c = l.instanceSelector(this._groupSelector, c[0]._buttons), c.length && c[0].add(b, a));
        return this.button(this._groupSelector, a)
    });
    i.Api.register("buttons().destroy()", function () {
        this.pluck("inst").unique().each(function (a) {
            a.destroy()
        });
        return this
    });
    i.Api.registerPlural("buttons().remove()", "buttons().remove()", function () {
        this.each(function (a) {
            a.inst.remove(a.node)
        });
        return this
    });
    var q;
    i.Api.register("buttons.info()", function (a, b, c) {
        var e = this;
        if (!1 === a)return d("#datatables_buttons_info").fadeOut(function () {
            d(this).remove()
        }),
            clearTimeout(q), q = null, this;
        q && clearTimeout(q);
        d("#datatables_buttons_info").length && d("#datatables_buttons_info").remove();
        d('<div id="datatables_buttons_info" class="dt-button-info"/>').html(a ? "<h2>" + a + "</h2>" : "").append(d("<div/>")["string" === typeof b ? "html" : "append"](b)).css("display", "none").appendTo("body").fadeIn();
        c !== m && 0 !== c && (q = setTimeout(function () {
            e.buttons.info(!1)
        }, c));
        return this
    });
    i.Api.register("buttons.exportData()", function (a) {
        if (this.context.length) {
            for (var b = new i.Api(this.context[0]),
                     c = d.extend(!0, {}, {
                         rows: null,
                         columns: "",
                         modifier: {search: "applied", order: "applied"},
                         orthogonal: "display",
                         stripHtml: !0,
                         stripNewlines: !0,
                         decodeEntities: !0,
                         trim: !0,
                         format: {
                             header: function (a) {
                                 return e(a)
                             }, footer: function (a) {
                                 return e(a)
                             }, body: function (a) {
                                 return e(a)
                             }
                         }
                     }, a), e = function (a) {
                    if ("string" !== typeof a)return a;
                    c.stripHtml && (a = a.replace(/<[^>]*>/g, ""));
                    c.trim && (a = a.replace(/^\s+|\s+$/g, ""));
                    c.stripNewlines && (a = a.replace(/\n/g, " "));
                    c.decodeEntities && (t.innerHTML = a, a = t.value);
                    return a
                }, a = b.columns(c.columns).indexes().map(function (a) {
                    var d =
                        b.column(a).header();
                    return c.format.header(d.innerHTML, a, d)
                }).toArray(), g = b.table().footer() ? b.columns(c.columns).indexes().map(function (a) {
                    var d = b.column(a).footer();
                    return c.format.footer(d ? d.innerHTML : "", a, d)
                }).toArray() : null, h = b.rows(c.rows, c.modifier).indexes().toArray(), f = b.cells(h, c.columns).render(c.orthogonal).toArray(), h = b.cells(h, c.columns).nodes().toArray(), j = a.length, k = 0 < j ? f.length / j : 0, l = Array(k), m = 0, n = 0; n < k; n++) {
                for (var o = Array(j), q = 0; q < j; q++)o[q] = c.format.body(f[m], n, q, h[m]), m++;
                l[n] =
                    o
            }
            return {header: a, footer: g, body: l}
        }
    });
    var t = d("<textarea/>")[0];
    d.fn.dataTable.Buttons = l;
    d.fn.DataTable.Buttons = l;
    d(o).on("init.dt plugin-init.dt", function (a, b) {
        if ("dt" === a.namespace) {
            var c = b.oInit.buttons || i.defaults.buttons;
            c && !b._buttons && (new l(b, c)).container()
        }
    });
    i.ext.feature.push({
        fnInit: function (a) {
            var a = new i.Api(a), b = a.init().buttons || i.defaults.buttons;
            return (new l(a, b)).container()
        }, cFeature: "B"
    });
    return l
});