define(["./editable-area", "./options", "./options/option", "./column/builder", "../edit", "../../../utils/style-attribute-filter", "../../../utils/style-attribute-mapper", "../../../utils/attribute-filter", "../../../utils/attribute-mapper", "../../../utils/appearance-applier", "mage/translate", "knockout", "underscore"], function (_editableArea, _options, _option, _builder, _edit, _styleAttributeFilter, _styleAttributeMapper, _attributeFilter, _attributeMapper, _appearanceApplier, _translate, _knockout, _underscore) {
  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  var Structural =
  /*#__PURE__*/
  function (_EditableArea) {
    _inheritsLoose(Structural, _EditableArea);

    /**
     * Abstract structural constructor
     *
     * @param parent
     * @param stage
     * @param config
     * @param appearanceApplier
     */
    function Structural(parent, stage, config, appearanceApplier) {
      var _this;

      if (config === void 0) {
        config = {};
      }

      _this = _EditableArea.call(this, stage) || this;
      _this.wrapperStyle = _knockout.observable({
        width: '100%'
      });
      _this.options = [new _option.Option(_this, 'move', '<i></i>', (0, _translate)('Move'), false, ['move-structural'], 10), new _option.Option(_this, 'edit', '<i></i>', (0, _translate)('Edit'), _this.onOptionEdit.bind(_this), ['edit-block'], 50), new _option.Option(_this, 'duplicate', '<i></i>', (0, _translate)('Duplicate'), _this.onOptionDuplicate.bind(_this), ['duplicate-structural'], 60), new _option.Option(_this, 'remove', '<i></i>', (0, _translate)('Remove'), _this.onOptionRemove.bind(_this), ['remove-structural'], 100)];
      _this.optionsInstance = new _options.Options(_this, _this.options);
      _this.children = _knockout.observableArray([]);
      _this.template = 'Gene_BlueFoot/component/stage/structural/abstract.html';
      _this.columnBuilder = new _builder.ColumnBuilder();
      _this.styleAttributeFilter = new _styleAttributeFilter();
      _this.styleAttributeMapper = new _styleAttributeMapper();
      _this.attributeFilter = new _attributeFilter();
      _this.attributeMapper = new _attributeMapper();
      _this.previewChildTemplate = 'Gene_BlueFoot/component/block/preview/children.html';
      _this.renderChildTemplate = 'Gene_BlueFoot/component/block/render/children.html';

      _this.setChildren(_this.children); // Create a new instance of edit for our editing needs


      _this.edit = new _edit(_this, _this.stage.store);
      _this.appearanceApplier = appearanceApplier ? appearanceApplier : new _appearanceApplier({});
      _this.parent = parent;
      _this.config = config;
      return _this;
    }

    var _proto = Structural.prototype;

    _proto.onOptionEdit = function onOptionEdit() {
      this.edit.openAndRender();
    };
    /**
     * Handle duplicate of items
     */


    _proto.onOptionDuplicate = function onOptionDuplicate() {
      this.parent.duplicateChild(this);
    };
    /**
     * Handle block removal
     */


    _proto.onOptionRemove = function onOptionRemove() {
      var _this2 = this;

      this.stage.parent.confirmationDialog({
        title: 'Confirm Item Removal',
        content: 'Are you sure you want to remove this item? The data within this item is not recoverable once removed.',
        actions: {
          confirm: function confirm() {
            // Call the parent to remove the child element
            _this2.parent.emit('blockRemoved', {
              block: _this2
            });
          }
        }
      });
    };
    /**
     * Get css classes for an block
     * Example {'class-name': true}
     *
     * @returns {DataObject}
     */


    _proto.getCss = function getCss() {
      var cssClasses = {};

      if ('css_classes' in this.getData()) {
        this.getData().css_classes.map(function (value, index) {
          return cssClasses[value] = true;
        });
      }

      return cssClasses;
    };
    /**
     * Get stype properties for an block
     * Example {'backgroundColor': '#cccccc'}
     *
     * @returns {DataObject}
     */


    _proto.getStyle = function getStyle() {
      var styleAttributes = this.getData();
      styleAttributes = this.appearanceApplier.apply(styleAttributes);
      return this.styleAttributeMapper.toDom(this.styleAttributeFilter.filter(styleAttributes));
    };
    /**
     * Get attributes for an block
     * Example {'data-role': 'element'}
     *
     * @returns {DataObject}
     */


    _proto.getAttributes = function getAttributes() {
      var data = this.getData();

      _underscore.extend(data, this.config);

      return this.attributeMapper.toDom(this.attributeFilter.filter(data));
    };
    /**
     * Get block data
     *
     * @returns {DataObject}
     */


    _proto.getData = function getData() {
      return this.stage.store.get(this.id);
    };

    return Structural;
  }(_editableArea);

  return Structural;
});
//# sourceMappingURL=abstract.js.map
