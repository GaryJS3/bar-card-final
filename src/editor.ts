import { LitElement, html, customElement, property, TemplateResult, CSSResult, css, PropertyValues } from 'lit-element';
import { HomeAssistant, fireEvent, LovelaceCardEditor } from 'custom-card-helpers';

import { BarCardConfig } from './types';
import { createEditorConfigArray, arrayMove, hasConfigOrEntitiesChanged } from './helpers';

interface EditorActionConfig {
  action?: string;
  navigation_path?: string;
  url_path?: string;
  service?: string;
}

interface EditorAnimationConfig {
  state?: string;
  speed?: string | number;
}

interface EditorPositionsConfig {
  [key: string]: string | undefined;
}

interface EditorSeverityConfig {
  from?: string | number;
  to?: string | number;
  color?: string;
  icon?: string;
  hide?: boolean;
}

type BaseEditorBarConfig = Omit<
  Partial<BarCardConfig>,
  'animation' | 'positions' | 'severity' | 'tap_action' | 'hold_action' | 'double_tap_action' | 'entities'
>;

interface EditorBarConfig extends BaseEditorBarConfig {
  entity?: string;
  entities?: EditorBarConfig[];
  animation?: EditorAnimationConfig;
  positions?: EditorPositionsConfig;
  severity?: EditorSeverityConfig[];
  tap_action?: EditorActionConfig;
  hold_action?: EditorActionConfig;
  double_tap_action?: EditorActionConfig;
}

interface EditorOption {
  icon: string;
  name: string;
  secondary: string;
  show: boolean;
}

interface EditorEntityOptionGroup {
  show: boolean;
  options: {
    positions: EditorOption;
    bar: EditorOption;
    value: EditorOption;
    severity: EditorOption;
    actions: EditorOption;
    animation: EditorOption;
  };
}

interface EditorOptionsState {
  entities: EditorOption & {
    options: {
      entities: EditorEntityOptionGroup[];
    };
  };
  appearance: EditorOption & {
    options: {
      positions: EditorOption;
      bar: EditorOption;
      value: EditorOption;
      card: EditorOption;
      severity: EditorOption;
      animation: EditorOption;
      actions: EditorOption;
    };
  };
}

interface EditorEventTarget extends EventTarget {
  value?: string | number | boolean;
  checked?: boolean;
  configObject?: EditorBarConfig | EditorAnimationConfig | EditorPositionsConfig | EditorActionConfig;
  configAttribute?: string;
  configAdd?: string;
  configAddObject?: EditorBarConfig;
  configAddValue?: string;
  configArray?: EditorBarConfig[];
  configDirection?: string;
  configIndex?: number;
  index?: number | null;
  severityIndex?: number;
  severityAttribute?: keyof EditorSeverityConfig;
  actionKey?: keyof EditorBarConfig;
  actionAttribute?: keyof EditorActionConfig;
  options?: EditorOption | EditorEntityOptionGroup;
  optionsTarget?: EditorOptionsState | EditorEntityOptionGroup[] | Record<string, EditorOption>;
  ignoreNull?: boolean;
}

@customElement('bar-card-editor')
export class BarCardEditor extends LitElement implements LovelaceCardEditor {
  @property() public hass?: HomeAssistant;
  @property() private _config: EditorBarConfig = {};
  @property() private _toggle?: boolean;
  private _configArray: EditorBarConfig[] = [];
  private _entityOptionsArray: EditorEntityOptionGroup[] = [];
  private _options!: EditorOptionsState;

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    return hasConfigOrEntitiesChanged(this, changedProps, true);
  }

  public setConfig(config: BarCardConfig): void {
    this._config = { ...config };
    this._configArray = [];
    this._entityOptionsArray = [];

    if (!config.entity && !config.entities) {
      this._config.entity = 'none';
    }
    if (this._config.entity) {
      this._configArray.push({ entity: config.entity });
      this._config.entities = [{ entity: config.entity }];
      delete this._config.entity;
    }

    this._configArray = createEditorConfigArray(this._config);

    if (this._config.animation) {
      if (Object.entries(this._config.animation).length === 0) {
        delete this._config.animation;
        this._emitConfigChanged();
      }
    }
    if (this._config.positions) {
      if (Object.entries(this._config.positions).length === 0) {
        delete this._config.positions;
        this._emitConfigChanged();
      }
    }

    for (const entityConfig of this._configArray) {
      if (entityConfig.animation) {
        if (Object.entries(entityConfig.animation).length === 0) {
          delete entityConfig.animation;
        }
      }
      if (entityConfig.positions) {
        if (Object.entries(entityConfig.positions).length === 0) {
          delete entityConfig.positions;
        }
      }
    }
    this._config.entities = this._configArray;
    this._emitConfigChanged();

    const barOptions = {
      icon: 'format-list-numbered',
      name: 'Bar',
      secondary: 'Bar settings.',
      show: false,
    };

    const valueOptions = {
      icon: 'numeric',
      name: 'Value',
      secondary: 'Value settings.',
      show: false,
    };

    const cardOptions = {
      icon: 'card-bulleted',
      name: 'Card',
      secondary: 'Card settings.',
      show: false,
    };

    const positionsOptions = {
      icon: 'arrow-expand-horizontal',
      name: 'Positions',
      secondary: 'Set positions of card elements.',
      show: false,
    };

    const actionsOptions = {
      icon: 'gesture-tap',
      name: 'Actions',
      secondary: 'Configure tap, hold and double tap actions.',
      show: false,
    };

    const severityOptions = {
      icon: 'exclamation-thick',
      name: 'Severity',
      secondary: 'Define bar colors based on value.',
      show: false,
    };

    const animationOptions = {
      icon: 'animation',
      name: 'Animation',
      secondary: 'Define animation settings.',
      show: false,
    };

    const entityOptions = {
      show: false,
      options: {
        positions: { ...positionsOptions },
        bar: { ...barOptions },
        value: { ...valueOptions },
        severity: { ...severityOptions },
        actions: { ...actionsOptions },
        animation: { ...animationOptions },
      },
    };

    this._configArray.forEach(() => {
      this._entityOptionsArray.push({ ...entityOptions });
    });
    this._options = {
      entities: {
        icon: 'tune',
        name: 'Entities',
        secondary: 'Manage card entities.',
        show: true,
        options: {
          entities: this._entityOptionsArray,
        },
      },
      appearance: {
        icon: 'palette',
        name: 'Appearance',
        secondary: 'Customize the global name, icon, etc.',
        show: false,
        options: {
          positions: positionsOptions,
          bar: barOptions,
          value: valueOptions,
          card: cardOptions,
          severity: severityOptions,
          animation: animationOptions,
          actions: actionsOptions,
        },
      },
    };
  }

  protected render(): TemplateResult | void {
    return html`
      <div class="editor-shell">${this._createEntitiesElement()} ${this._createAppearanceElement()}</div>
    `;
  }

  private _emitConfigChanged(): void {
    fireEvent(this, 'config-changed', { config: this._config as BarCardConfig });
  }

  private _getEntityHint(config: EditorBarConfig): string {
    if (!this.hass || !config.entity) {
      return 'Choose an entity id to configure bar-specific settings.';
    }

    const stateObj = this.hass.states[config.entity];
    if (!stateObj) {
      return 'Entity not found in Home Assistant yet. Verify the entity id.';
    }

    const friendlyName = stateObj.attributes.friendly_name || config.entity;
    return `${friendlyName}: ${stateObj.state}`;
  }

  private _renderHelperText(text: string): TemplateResult {
    return html`
      <div class="helper-text">${text}</div>
    `;
  }

  private _renderEmptyState(title: string, description: string): TemplateResult {
    return html`
      <div class="empty-state">
        <div class="empty-title">${title}</div>
        <div class="empty-description">${description}</div>
      </div>
    `;
  }

  private _renderToggleField(label: string, configObject, configAttribute: string): TemplateResult {
    const checked = !!configObject[configAttribute];
    return html`
      <div class="toggle-card">
        <ha-formfield .label=${label}>
          <ha-switch
            ?checked=${checked}
            .configAttribute=${configAttribute}
            .configObject=${configObject}
            .value=${!checked}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>
      </div>
    `;
  }

  private _renderChevron(show: boolean): TemplateResult {
    return html`
      <ha-icon class="chevron" .icon=${show ? `mdi:chevron-up` : `mdi:chevron-down`}></ha-icon>
    `;
  }

  private _renderFieldAction(actionConfig, config): TemplateResult {
    return html`
      <div class="field-card action-card">
        <div class="action-row">
          <label class="select-label">${actionConfig.label} Action</label>
          <select
            class="editor-select"
            @change=${this._updateAction}
            .configObject=${config}
            .actionKey=${actionConfig.key}
            .actionAttribute=${'action'}
          >
            <option value="" ?selected=${!(config[actionConfig.key] && config[actionConfig.key].action)}>none</option>
            <option
              value="more-info"
              ?selected=${config[actionConfig.key] && config[actionConfig.key].action === 'more-info'}
            >
              more-info
            </option>
            <option
              value="toggle"
              ?selected=${config[actionConfig.key] && config[actionConfig.key].action === 'toggle'}
            >
              toggle
            </option>
            <option
              value="navigate"
              ?selected=${config[actionConfig.key] && config[actionConfig.key].action === 'navigate'}
            >
              navigate
            </option>
            <option value="url" ?selected=${config[actionConfig.key] && config[actionConfig.key].action === 'url'}
              >url</option
            >
            <option
              value="call-service"
              ?selected=${config[actionConfig.key] && config[actionConfig.key].action === 'call-service'}
            >
              call-service
            </option>
          </select>
          ${config[actionConfig.key]
            ? html`
                <ha-icon
                  class="ha-icon-large clear-icon"
                  icon="mdi:close"
                  @click=${this._updateAction}
                  .value=${''}
                  .configObject=${config}
                  .actionKey=${actionConfig.key}
                  .actionAttribute=${'action'}
                ></ha-icon>
              `
            : html`
                <span class="action-spacer"></span>
              `}
        </div>
        ${config[actionConfig.key] && config[actionConfig.key].action === 'navigate'
          ? html`
              <paper-input
                label="${actionConfig.label} Navigation Path"
                .value="${config[actionConfig.key].navigation_path ? config[actionConfig.key].navigation_path : ''}"
                editable
                .configObject=${config}
                .actionKey=${actionConfig.key}
                .actionAttribute=${'navigation_path'}
                @value-changed=${this._updateAction}
              ></paper-input>
            `
          : ''}
        ${config[actionConfig.key] && config[actionConfig.key].action === 'url'
          ? html`
              <paper-input
                label="${actionConfig.label} URL"
                .value="${config[actionConfig.key].url_path ? config[actionConfig.key].url_path : ''}"
                editable
                .configObject=${config}
                .actionKey=${actionConfig.key}
                .actionAttribute=${'url_path'}
                @value-changed=${this._updateAction}
              ></paper-input>
            `
          : ''}
        ${config[actionConfig.key] && config[actionConfig.key].action === 'call-service'
          ? html`
              <paper-input
                label="${actionConfig.label} Service"
                .value="${config[actionConfig.key].service ? config[actionConfig.key].service : ''}"
                editable
                .configObject=${config}
                .actionKey=${actionConfig.key}
                .actionAttribute=${'service'}
                @value-changed=${this._updateAction}
              ></paper-input>
            `
          : ''}
      </div>
    `;
  }

  private _createActionsElement(index): TemplateResult {
    let config;
    let options;
    if (index === null) {
      options = this._options.appearance.options.actions;
      config = this._config;
    } else {
      options = this._options.entities.options.entities[index].options.actions;
      config = this._configArray[index];
    }

    const actionConfigs = [
      { key: 'tap_action', label: 'Tap' },
      { key: 'hold_action', label: 'Hold' },
      { key: 'double_tap_action', label: 'Double Tap' },
    ];

    return html`
      <div class="category">
        <div
          class="sub-category"
          @click=${this._toggleThing}
          .options=${options}
          .optionsTarget=${this._options.appearance.options}
        >
          <div class="row">
            <ha-icon .icon=${`mdi:${options.icon}`}></ha-icon>
            <div class="title">${options.name}</div>
            ${this._renderChevron(options.show)}
          </div>
          <div class="secondary">${options.secondary}</div>
        </div>
        ${options.show
          ? html`
              <div class="value">
                ${this._renderHelperText('Actions inherit Home Assistant behavior. Leave them empty to keep defaults.')}
                ${actionConfigs.map(actionConfig => this._renderFieldAction(actionConfig, config))}
              </div>
            `
          : ''}
      </div>
    `;
  }

  private _createEntitiesValues(): TemplateResult[] {
    if (!this.hass || !this._config) {
      return [html``];
    }

    const options = this._options.entities;
    const entityArray = this._config.entities || this._configArray;
    const valueElementArray: TemplateResult[] = [];
    for (const config of this._configArray) {
      const index = this._configArray.indexOf(config);
      valueElementArray.push(html`
        <div class="sub-category entity-row field-card entity-card">
          <div class="entity-toggle">
            <div
              class="entity-meta-toggle"
              @click=${this._toggleThing}
              .options=${options.options.entities[index]}
              .optionsTarget=${options.options.entities}
              .index=${index}
            >
              options
            </div>
            <ha-icon
              icon="mdi:chevron-${options.options.entities[index].show ? 'up' : 'down'}"
              @click=${this._toggleThing}
              class="chevron entity-chevron"
              .options=${options.options.entities[index]}
              .optionsTarget=${options.options.entities}
              .index=${index}
            ></ha-icon>
          </div>
          <div class="value entity-main-field">
            <paper-input
              label="Entity"
              @value-changed=${this._valueChanged}
              .configAttribute=${'entity'}
              .configObject=${this._configArray[index]}
              .value=${config.entity}
            >
            </paper-input>
            ${this._renderHelperText(this._getEntityHint(config))}
          </div>
          <div class="stack-actions icon-group">
            ${index !== 0
              ? html`
                  <ha-icon
                    class="ha-icon-large"
                    icon="mdi:arrow-up"
                    @click=${this._moveEntity}
                    .configDirection=${'up'}
                    .configArray=${entityArray}
                    .arrayAttribute=${'entities'}
                    .arraySource=${this._config}
                    .index=${index}
                  ></ha-icon>
                `
              : html`
                  <ha-icon icon="mdi:arrow-up" class="ha-icon-large muted-icon"></ha-icon>
                `}
            ${index !== this._configArray.length - 1
              ? html`
                  <ha-icon
                    class="ha-icon-large"
                    icon="mdi:arrow-down"
                    @click=${this._moveEntity}
                    .configDirection=${'down'}
                    .configArray=${entityArray}
                    .arrayAttribute=${'entities'}
                    .arraySource=${this._config}
                    .index=${index}
                  ></ha-icon>
                `
              : html`
                  <ha-icon icon="mdi:arrow-down" class="ha-icon-large muted-icon"></ha-icon>
                `}
            <ha-icon
              class="ha-icon-large"
              icon="mdi:close"
              @click=${this._removeEntity}
              .configAttribute=${'entity'}
              .configArray=${'entities'}
              .configIndex=${index}
            ></ha-icon>
          </div>
        </div>
        ${options.options.entities[index].show
          ? html`
              <div class="options nested-options">
                ${this._createBarElement(index)} ${this._createValueElement(index)}
                ${this._createPositionsElement(index)} ${this._createSeverityElement(index)}
                ${this._createAnimationElement(index)} ${this._createActionsElement(index)}
              </div>
            `
          : ''}
      `);
    }
    return valueElementArray;
  }

  private _createEntitiesElement(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }
    const options = this._options.entities;

    return html`
      <div class="card-config">
        <div class="option" @click=${this._toggleThing} .options=${options} .optionsTarget=${this._options}>
          <div class="row">
            <ha-icon .icon=${`mdi:${options.icon}`}></ha-icon>
            <div class="title">${options.name}</div>
            ${this._renderChevron(options.show)}
          </div>
          <div class="secondary">${options.secondary}</div>
        </div>
        ${options.show
          ? html`
              <div class="card-background section-scroll">
                ${this._configArray.length > 0
                  ? this._createEntitiesValues()
                  : this._renderEmptyState('No entities yet', 'Add your first entity to start configuring bars.')}
                <div class="sub-category add-row">
                  <ha-fab
                    mini
                    icon="mdi:plus"
                    @click=${this._addEntity}
                    .configArray=${this._configArray}
                    .configAddValue=${'entity'}
                    .sourceArray=${this._config.entities}
                  ></ha-fab>
                </div>
              </div>
            `
          : ''}
      </div>
    `;
  }

  private _createAppearanceElement(): TemplateResult {
    if (!this.hass) {
      return html``;
    }
    const options = this._options.appearance;
    return html`
      <div class="card-config">
        <div class="option" @click=${this._toggleThing} .options=${options} .optionsTarget=${this._options}>
          <div class="row">
            <ha-icon .icon=${`mdi:${options.icon}`}></ha-icon>
            <div class="title">${options.name}</div>
            ${this._renderChevron(options.show)}
          </div>
          <div class="secondary">${options.secondary}</div>
        </div>
        ${options.show
          ? html`
              <div class="card-background">
                ${this._createCardElement()} ${this._createBarElement(null)} ${this._createValueElement(null)}
                ${this._createPositionsElement(null)} ${this._createSeverityElement(null)}
                ${this._createAnimationElement(null)} ${this._createActionsElement(null)}
              </div>
            `
          : ''}
      </div>
    `;
  }

  private _createBarElement(index): TemplateResult {
    let options;
    let config;
    if (index !== null) {
      options = this._options.entities.options.entities[index].options.bar;
      config = this._configArray[index];
    } else {
      options = this._options.appearance.options.bar;
      config = this._config;
    }
    return html`
      <div class="category" id="bar">
        <div
          class="sub-category"
          @click=${this._toggleThing}
          .options=${options}
          .optionsTarget=${this._options.appearance.options}
        >
          <div class="row">
            <ha-icon .icon=${`mdi:${options.icon}`}></ha-icon>
            <div class="title">${options.name}</div>
            ${this._renderChevron(options.show)}
          </div>
          <div class="secondary">${options.secondary}</div>
        </div>
        ${options.show
          ? html`
              <div class="value">
                ${this._renderHelperText('Use CSS values like 40px, 100%, or theme colors to fine-tune the bar.')}
                <div>
                  <label class="select-label">Direction</label>
                  <select
                    class="editor-select"
                    @change=${this._valueChanged}
                    .configObject=${config}
                    .configAttribute=${'direction'}
                    .ignoreNull=${true}
                  >
                    <option value="right" ?selected=${!config.direction || config.direction === 'right'}>right</option>
                    <option value="up" ?selected=${config.direction === 'up'}>up</option>
                  </select>
                  ${config.direction
                    ? html`
                        <ha-icon
                          class="ha-icon-large"
                          icon="mdi:close"
                          @click=${this._valueChanged}
                          .value=${''}
                          .configAttribute=${'direction'}
                          .configObject=${config}
                        ></ha-icon>
                      `
                    : ''}
                </div>
                ${index !== null
                  ? html`
                      <paper-input
                        label="Name"
                        .value="${config.name ? config.name : ''}"
                        editable
                        .configAttribute=${'name'}
                        .configObject=${config}
                        @value-changed=${this._valueChanged}
                      ></paper-input>
                    `
                  : ''}
                <paper-input
                  label="Icon"
                  .value="${config.icon ? config.icon : ''}"
                  editable
                  .configAttribute=${'icon'}
                  .configObject=${config}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Height"
                  .value="${config.height ? config.height : ''}"
                  editable
                  .configAttribute=${'height'}
                  .configObject=${config}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Width"
                  .value="${config.width ? config.width : ''}"
                  editable
                  .configAttribute=${'width'}
                  .configObject=${config}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Color"
                  .value="${config.color ? config.color : ''}"
                  editable
                  .configAttribute=${'color'}
                  .configObject=${config}
                  @value-changed=${this._valueChanged}
                ></paper-input>
              </div>
            `
          : ''}
      </div>
    `;
  }

  private _createAnimationElement(index): TemplateResult {
    let options;
    let config;
    if (index !== null) {
      options = this._options.entities.options.entities[index].options.animation;
      config = this._configArray[index];
    } else {
      options = this._options.appearance.options.animation;
      config = this._config;
    }
    config.animation = { ...config.animation };
    return html`
      <div class="category" id="bar">
        <div
          class="sub-category"
          @click=${this._toggleThing}
          .options=${options}
          .optionsTarget=${this._options.appearance.options}
        >
          <div class="row">
            <ha-icon .icon=${`mdi:${options.icon}`}></ha-icon>
            <div class="title">${options.name}</div>
            ${this._renderChevron(options.show)}
          </div>
          <div class="secondary">${options.secondary}</div>
        </div>
        ${options.show
          ? config.animation
            ? html`
                <div class="value">
                  ${this._renderHelperText('Animation can be turned on globally or per entity. Speed is in seconds.')}
                  <div>
                    <label class="select-label">State</label>
                    <select
                      class="editor-select"
                      @change=${this._valueChanged}
                      .configAttribute=${'state'}
                      .configObject=${config.animation}
                      .index=${index}
                      .ignoreNull=${true}
                    >
                      <option value="on" ?selected=${config.animation.state === 'on'}>on</option>
                      <option value="off" ?selected=${!config.animation.state || config.animation.state === 'off'}>
                        off
                      </option>
                    </select>
                    ${config.animation.state
                      ? html`
                          <ha-icon
                            class="ha-icon-large"
                            icon="mdi:close"
                            @click=${this._valueChanged}
                            .value=${''}
                            .configAttribute=${'state'}
                            .configObject=${config.animation}
                            .index=${index}
                          ></ha-icon>
                        `
                      : ''}
                  </div>
                  <paper-input
                    label="Speed"
                    .value="${config.animation.speed ? config.animation.speed : ''}"
                    editable
                    @value-changed=${this._valueChanged}
                    .configAttribute=${'speed'}
                    .configObject=${config.animation}
                    .index=${index}
                  ></paper-input>
                </div>
              `
            : html`
                <div class="value">
                  ${this._renderHelperText('Set a state to create the animation block, then fine-tune the speed.')}
                  <div>
                    <label class="select-label">State</label>
                    <select
                      class="editor-select"
                      @change=${this._valueChanged}
                      .configObject=${config}
                      .configAttribute=${'state'}
                      .configAdd=${'animation'}
                      .index=${index}
                      .ignoreNull=${true}
                    >
                      <option value="">select</option>
                      <option value="on">on</option>
                      <option value="off">off</option>
                    </select>
                  </div>
                  <paper-input
                    label="Speed"
                    editable
                    .value=${''}
                    @value-changed=${this._valueChanged}
                    .configAttribute=${'speed'}
                    .configObject=${config}
                    .configAdd=${'animation'}
                    .index=${index}
                  ></paper-input>
                </div>
              `
          : ''}
      </div>
    `;
  }

  private _createSeverityElement(index): TemplateResult {
    let options;
    let config;
    if (index !== null) {
      options = this._options.entities.options.entities[index].options.severity;
      config = this._configArray[index];
    } else {
      options = this._options.appearance.options.severity;
      config = this._config;
    }
    const arrayLength = config.severity ? config.severity.length : 0;
    return html`
      <div class="category" id="bar">
        <div
          class="sub-category"
          @click=${this._toggleThing}
          .options=${options}
          .optionsTarget=${this._options.appearance.options}
        >
          <div class="row">
            <ha-icon .icon=${`mdi:${options.icon}`}></ha-icon>
            <div class="title">${options.name}</div>
            ${this._renderChevron(options.show)}
          </div>
          <div class="secondary">${options.secondary}</div>
        </div>
        ${options.show
          ? html`
              <div class="card-background section-scroll severity-scroll">
                ${arrayLength > 0
                  ? html`
                      ${this._createSeverityValues(index)}
                    `
                  : this._renderEmptyState(
                      'No severity rules',
                      'Add ranges to map values to colors, icons, or hide rules.',
                    )}
                <div class="sub-category add-row">
                  <ha-fab mini icon="mdi:plus" @click=${this._addSeverity} .index=${index}></ha-fab>
                </div>
              </div>
            `
          : ''}
      </div>
    `;
  }

  private _createSeverityValues(index): TemplateResult[] {
    let config;
    if (index === null) {
      config = this._config;
    } else {
      config = this._configArray[index];
    }
    const severityValuesArray: TemplateResult[] = [];
    for (const severity of config.severity) {
      const severityIndex = config.severity.indexOf(severity);
      severityValuesArray.push(html`
        <div class="sub-category severity-row field-card">
          <div class="value severity-fields">
            <div class="inline-fields">
              <paper-input
                label="From"
                type="number"
                .value="${severity.from || severity.from === 0 ? severity.from : ''}"
                editable
                .severityAttribute=${'from'}
                .index=${index}
                .severityIndex=${severityIndex}
                @value-changed=${this._updateSeverity}
              ></paper-input>
              <paper-input
                label="To"
                type="number"
                .value="${severity.to ? severity.to : ''}"
                editable
                .severityAttribute=${'to'}
                .index=${index}
                .severityIndex=${severityIndex}
                @value-changed=${this._updateSeverity}
              ></paper-input>
            </div>
            <div class="inline-fields">
              <paper-input
                label="Color"
                .value="${severity.color ? severity.color : ''}"
                editable
                .severityAttribute=${'color'}
                .index=${index}
                .severityIndex=${severityIndex}
                @value-changed=${this._updateSeverity}
              ></paper-input>
              <paper-input
                label="Icon"
                .value="${severity.icon ? severity.icon : ''}"
                editable
                .severityAttribute=${'icon'}
                .index=${index}
                .severityIndex=${severityIndex}
                @value-changed=${this._updateSeverity}
              ></paper-input>
            </div>
            <div class="toggle-card compact-toggle">
              <ha-formfield label="Hide">
                <ha-switch
                  ?checked=${!!severity.hide}
                  .severityAttribute=${'hide'}
                  .index=${index}
                  .severityIndex=${severityIndex}
                  .value=${!severity.hide}
                  @change=${this._updateSeverity}
                ></ha-switch>
              </ha-formfield>
            </div>
          </div>
          <div class="stack-actions icon-group">
            ${severityIndex !== 0
              ? html`
                  <ha-icon
                    class="ha-icon-large"
                    icon="mdi:arrow-up"
                    @click=${this._moveSeverity}
                    .configDirection=${'up'}
                    .index=${index}
                    .severityIndex=${severityIndex}
                  ></ha-icon>
                `
              : html`
                  <ha-icon icon="mdi:arrow-up" class="ha-icon-large muted-icon"></ha-icon>
                `}
            ${severityIndex !== config.severity.length - 1
              ? html`
                  <ha-icon
                    class="ha-icon-large"
                    icon="mdi:arrow-down"
                    @click=${this._moveSeverity}
                    .configDirection=${'down'}
                    .index=${index}
                    .severityIndex=${severityIndex}
                  ></ha-icon>
                `
              : html`
                  <ha-icon icon="mdi:arrow-down" class="ha-icon-large muted-icon"></ha-icon>
                `}
            <ha-icon
              class="ha-icon-large"
              icon="mdi:close"
              @click=${this._removeSeverity}
              .index=${index}
              .severityIndex=${severityIndex}
            ></ha-icon>
          </div>
        </div>
      `);
    }
    return severityValuesArray;
  }

  private _createCardElement(): TemplateResult {
    if (!this.hass) {
      return html``;
    }
    const config = this._config;
    const options = this._options.appearance.options.card;
    return html`
      <div class="category" id="card">
        <div
          class="sub-category"
          @click=${this._toggleThing}
          .options=${options}
          .optionsTarget=${this._options.appearance.options}
        >
          <div class="row">
            <ha-icon .icon=${`mdi:${options.icon}`}></ha-icon>
            <div class="title">${options.name}</div>
            ${this._renderChevron(options.show)}
          </div>
          <div class="secondary">${options.secondary}</div>
        </div>
        ${options.show
          ? html`
              <div class="value-container">
                ${this._renderHelperText(
                  'Card-level settings apply to the whole stack and work best when shared across entities.',
                )}
                <paper-input
                  editable
                  label="Header Title"
                  .value="${config.title ? config.title : ''}"
                  .configObject=${config}
                  .configAttribute=${'title'}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  class="value-number"
                  type="number"
                  label="Columns"
                  .value=${config.columns ? config.columns : ''}
                  .configObject=${config}
                  .configAttribute=${'columns'}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <div>
                  <label class="select-label">Stack</label>
                  <select
                    class="editor-select"
                    @change=${this._valueChanged}
                    .configObject=${config}
                    .configAttribute=${'stack'}
                  >
                    <option value="" ?selected=${!config.stack}>none</option>
                    <option value="horizontal" ?selected=${config.stack === 'horizontal'}>horizontal</option>
                  </select>
                </div>
                <div class="toggle-grid">
                  ${this._renderToggleField('Entity Row', config, 'entity_row')}
                  ${this._renderToggleField('Entity Config', config, 'entity_config')}
                </div>
              </div>
            `
          : ''}
      </div>
    `;
  }

  private _createPositionsValues(index): TemplateResult[] {
    const defaultPositions = {
      icon: 'outside',
      indicator: 'outside',
      name: 'inside',
      minmax: 'off',
      value: 'inside',
    };
    let config;
    if (index === null) {
      config = this._config;
    } else {
      config = this._configArray[index];
    }
    config.positions = { ...config.positions };
    const positionElementsArray: TemplateResult[] = [];
    const objectKeys = Object.keys(defaultPositions);
    for (const position of objectKeys) {
      if (config.positions[position]) {
        positionElementsArray.push(html`
          <div class="value">
            <label class="select-label">${position}</label>
            <select
              class="editor-select"
              @change=${this._valueChanged}
              .configAttribute=${position}
              .configObject=${config.positions}
              .ignoreNull=${true}
            >
              <option value="inside" ?selected=${config.positions[position] === 'inside'}>inside</option>
              <option value="outside" ?selected=${config.positions[position] === 'outside'}>outside</option>
              <option value="off" ?selected=${config.positions[position] === 'off'}>off</option>
            </select>
            <ha-icon
              class="ha-icon-large"
              icon="mdi:close"
              @click=${this._valueChanged}
              .value=${''}
              .configAttribute=${position}
              .configObject=${config.positions}
            ></ha-icon>
          </div>
        `);
      } else {
        positionElementsArray.push(html`
          <div class="value">
            <label class="select-label">${position}</label>
            <select
              class="editor-select"
              @change=${this._valueChanged}
              .configAttribute=${position}
              .configObject=${config.positions}
            >
              <option value="">default</option>
              <option value="inside">inside</option>
              <option value="outside">outside</option>
              <option value="off">off</option>
            </select>
          </div>
        `);
      }
    }
    return positionElementsArray;
  }

  private _createPositionsElement(index): TemplateResult {
    if (!this.hass) {
      return html``;
    }

    let options;
    if (index === null) {
      options = this._options.appearance.options.positions;
    } else {
      options = this._options.entities.options.entities[index].options.positions;
    }
    return html`
      <div class="category">
        <div
          class="sub-category"
          @click=${this._toggleThing}
          .options=${options}
          .optionsTarget=${this._options.appearance.options}
        >
          <div class="row">
            <ha-icon .icon=${`mdi:${options.icon}`}></ha-icon>
            <div class="title">${options.name}</div>
            ${this._renderChevron(options.show)}
          </div>
          <div class="secondary">${options.secondary}</div>
        </div>
        ${options.show
          ? html`
              <div class="positions-grid">${this._createPositionsValues(index)}</div>
              ${this._renderHelperText(
                'For advanced combinations, YAML still supports values beyond these quick presets.',
              )}
            `
          : ``}
      </div>
    `;
  }

  private _createValueElement(index): TemplateResult {
    if (!this.hass) {
      return html``;
    }

    let options;
    let config;
    if (index !== null) {
      options = this._options.entities.options.entities[index].options.value;
      config = this._configArray[index];
    } else {
      options = this._options.appearance.options.value;
      config = this._config;
    }

    return html`
      <div class="category" id="value">
        <div
          class="sub-category"
          @click=${this._toggleThing}
          .options=${options}
          .optionsTarget=${this._options.appearance.options}
        >
          <div class="row">
            <ha-icon .icon=${`mdi:${options.icon}`}></ha-icon>
            <div class="title">${options.name}</div>
            ${this._renderChevron(options.show)}
          </div>
          <div class="secondary">${options.secondary}</div>
        </div>
        ${options.show
          ? html`
              <div class="value">
                ${this._renderHelperText(
                  'Min, max, and target support simple numbers here. Use YAML for entity-driven objects.',
                )}
                <div class="toggle-grid">
                  ${this._renderToggleField('Limit Value', config, 'limit_value')}
                  ${this._renderToggleField('Complementary', config, 'complementary')}
                </div>
                <paper-input
                  class="value-number"
                  label="Decimal"
                  type="number"
                  .value="${config.decimal ? config.decimal : ''}"
                  editable
                  .configAttribute=${'decimal'}
                  .configObject=${config}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  class="value-number"
                  type="number"
                  label="Min"
                  .value="${config.min ? config.min : ''}"
                  editable
                  .configAttribute=${'min'}
                  .configObject=${config}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  class="value-number"
                  type="number"
                  label="Max"
                  .value="${config.max ? config.max : ''}"
                  editable
                  .configAttribute=${'max'}
                  .configObject=${config}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  class="value-number"
                  type="number"
                  label="Target"
                  .value="${config.target ? config.target : ''}"
                  editable
                  .configAttribute=${'target'}
                  .configObject=${config}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Unit of Measurement"
                  .value="${config.unit_of_measurement ? config.unit_of_measurement : ''}"
                  editable
                  .configAttribute=${'unit_of_measurement'}
                  .configObject=${config}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Attribute"
                  .value="${config.attribute ? config.attribute : ''}"
                  editable
                  .configAttribute=${'attribute'}
                  .configObject=${config}
                  @value-changed=${this._valueChanged}
                ></paper-input>
              </div>
            `
          : ''}
      </div>
    `;
  }

  private _updateAction(ev): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.currentTarget || ev.target;
    const configObject = target.configObject;
    const actionKey = target.actionKey;
    const actionAttribute = target.actionAttribute;

    if (!configObject || !actionKey || !actionAttribute) {
      return;
    }

    if (!configObject[actionKey]) {
      configObject[actionKey] = {};
    }

    if (target.value === '') {
      delete configObject[actionKey][actionAttribute];
    } else {
      configObject[actionKey][actionAttribute] = target.value;
    }

    if (Object.keys(configObject[actionKey]).length === 0) {
      delete configObject[actionKey];
    }

    this._config.entities = this._configArray;
    this._emitConfigChanged();
  }

  private _toggleThing(ev): void {
    const target = ev.currentTarget || ev.target;
    const options = target.options;
    const show = !options.show;
    if (target.optionsTarget) {
      if (Array.isArray(target.optionsTarget)) {
        for (const options of target.optionsTarget) {
          options.show = false;
        }
      } else {
        for (const [key] of Object.entries(target.optionsTarget)) {
          target.optionsTarget[key].show = false;
        }
      }
    }
    options.show = show;
    this._toggle = !this._toggle;
  }

  private _addEntity(ev): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.currentTarget || ev.target;
    let newObject;
    if (target.configAddObject) {
      newObject = target.configAddObject;
    } else {
      newObject = { [target.configAddValue]: '' };
    }
    const newArray = target.configArray.slice();
    newArray.push(newObject);
    this._config.entities = newArray;
    this._emitConfigChanged();
  }

  private _moveEntity(ev): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.currentTarget || ev.target;
    let newArray = target.configArray.slice();
    if (target.configDirection == 'up') newArray = arrayMove(newArray, target.index, target.index - 1);
    else if (target.configDirection == 'down') newArray = arrayMove(newArray, target.index, target.index + 1);
    this._config.entities = newArray;
    this._emitConfigChanged();
  }

  private _removeEntity(ev): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.currentTarget || ev.target;
    const entitiesArray: EditorBarConfig[] = [];
    let index = 0;
    for (const config of this._configArray) {
      if (target.configIndex !== index) {
        entitiesArray.push(config);
      }
      index++;
    }
    const newConfig = { [target.configArray]: entitiesArray };
    this._config = Object.assign(this._config, newConfig);
    this._emitConfigChanged();
  }

  private _addSeverity(ev): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.currentTarget || ev.target;

    let severityArray;
    if (target.index === null) {
      severityArray = this._config.severity;
    } else {
      severityArray = this._config.entities ? this._config.entities[target.index].severity : undefined;
    }

    if (!severityArray) {
      severityArray = [];
    }

    const newObject = { from: '', to: '', color: '' };
    const newArray = severityArray.slice();
    newArray.push(newObject);

    if (target.index === null) {
      this._config.severity = newArray;
    } else {
      this._configArray[target.index].severity = newArray;
    }
    this._config.entities = this._configArray;
    this._emitConfigChanged();
  }

  private _moveSeverity(ev): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.currentTarget || ev.target;

    let severityArray;
    if (target.index === null) {
      severityArray = this._config.severity;
    } else {
      severityArray = this._config.entities ? this._config.entities[target.index].severity : undefined;
    }

    if (!severityArray) {
      return;
    }

    let newArray = severityArray.slice();
    if (target.configDirection == 'up') {
      newArray = arrayMove(newArray, target.severityIndex, target.severityIndex - 1);
    } else if (target.configDirection == 'down') {
      newArray = arrayMove(newArray, target.severityIndex, target.severityIndex + 1);
    }

    if (target.index === null) {
      this._config.severity = newArray;
    } else {
      this._configArray[target.index].severity = newArray;
    }
    this._config.entities = this._configArray;
    this._emitConfigChanged();
  }

  private _removeSeverity(ev): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.currentTarget || ev.target;

    let severityArray;
    if (target.index === null) {
      severityArray = this._config.severity;
    } else {
      severityArray = this._configArray[target.index].severity;
    }

    const clonedArray = severityArray.slice();
    const newArray: EditorSeverityConfig[] = [];
    let arrayIndex = 0;
    for (const severity of clonedArray) {
      if (target.severityIndex !== arrayIndex) {
        newArray.push(severity);
      }
      arrayIndex++;
    }
    if (target.index === null) {
      if (newArray.length === 0) {
        delete this._config.severity;
      } else {
        this._config.severity = newArray;
      }
    } else {
      if (newArray.length === 0) {
        delete this._configArray[target.index].severity;
      } else {
        this._configArray[target.index].severity = newArray;
      }
    }
    this._config.entities = this._configArray;
    this._emitConfigChanged();
  }

  private _updateSeverity(ev): void {
    const target = ev.currentTarget || ev.target;

    let severityArray;
    if (target.index === null) {
      severityArray = this._config.severity;
    } else {
      severityArray = this._configArray[target.index].severity;
    }
    const newSeverityArray: EditorSeverityConfig[] = [];
    for (const index in severityArray) {
      if (target.severityIndex == index) {
        const clonedObject = { ...severityArray[index] };
        const newObject = { [target.severityAttribute]: target.value };
        const mergedObject = Object.assign(clonedObject, newObject);
        if (target.value == '') {
          delete mergedObject[target.severityAttribute];
        }
        newSeverityArray.push(mergedObject);
      } else {
        newSeverityArray.push(severityArray[index]);
      }
    }

    if (target.index === null) {
      this._config.severity = newSeverityArray;
    } else {
      this._configArray[target.index].severity = newSeverityArray;
    }
    this._config.entities = this._configArray;
    this._emitConfigChanged();
  }

  private _valueChanged(ev): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.currentTarget || ev.target;
    if (target.configObject[target.configAttribute] == target.value) {
      return;
    }

    if (target.configAdd && target.value !== '') {
      target.configObject = Object.assign(target.configObject, {
        [target.configAdd]: { [target.configAttribute]: target.value },
      });
    }
    if (target.configAttribute && target.configObject && !target.configAdd) {
      if (target.value == '' || target.value === false) {
        if (target.ignoreNull == true) return;
        delete target.configObject[target.configAttribute];
      } else {
        target.configObject[target.configAttribute] = target.value;
      }
    }
    this._config.entities = this._configArray;
    this._emitConfigChanged();
  }

  static get styles(): CSSResult {
    return css`
      .editor-shell {
        display: grid;
        gap: 16px;
      }
      .option {
        padding: 14px 16px;
        cursor: pointer;
        border-radius: 14px;
        background: var(--ha-card-background, var(--paper-card-background-color));
        border: 1px solid var(--divider-color);
        box-shadow: var(--ha-card-box-shadow, none);
      }
      .options {
        background: var(--primary-background-color);
        border-radius: 14px;
        padding: 12px;
        margin-top: 10px;
      }
      .sub-category {
        cursor: pointer;
        border-radius: 12px;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 12px;
        pointer-events: none;
      }
      .chevron {
        margin-left: auto;
      }
      .title {
        font-weight: 600;
        pointer-events: none;
      }
      .secondary {
        padding-left: 36px;
        color: var(--secondary-text-color);
        margin-top: 4px;
        pointer-events: none;
      }
      .value {
        padding: 10px 8px 2px;
        display: grid;
        gap: 10px;
      }
      .value-container {
        padding: 10px 8px 2px;
        display: grid;
        gap: 10px;
      }
      .value-number {
        max-width: 160px;
      }
      ha-fab {
        margin: 8px;
      }
      ha-switch {
        padding: 6px 0;
      }
      .card-background {
        background: var(--ha-card-background, var(--paper-card-background-color));
        border-radius: 16px;
        padding: 12px;
        border: 1px solid var(--divider-color);
        margin-top: 10px;
      }
      .category {
        background: #0000;
        margin-top: 8px;
      }
      .ha-icon-large {
        cursor: pointer;
        margin: 0px 4px;
      }
      .editor-select {
        width: 100%;
        box-sizing: border-box;
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        color: var(--primary-text-color);
        padding: 8px;
        margin: 6px 0 0;
      }
      .select-label {
        display: block;
        color: var(--secondary-text-color);
        font-size: 12px;
        margin-bottom: 4px;
      }
      .helper-text {
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.45;
      }
      .empty-state {
        padding: 18px 16px;
        border: 1px dashed var(--divider-color);
        border-radius: 12px;
        text-align: center;
        color: var(--secondary-text-color);
      }
      .empty-title {
        color: var(--primary-text-color);
        font-weight: 600;
        margin-bottom: 4px;
      }
      .empty-description {
        font-size: 13px;
        line-height: 1.45;
      }
      .card-config {
        display: block;
      }
      .nested-options {
        margin: 10px 0 0 12px;
      }
      .field-card {
        background: color-mix(
          in srgb,
          var(--secondary-background-color, var(--primary-background-color)) 78%,
          transparent
        );
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        padding: 12px;
      }
      .entity-card,
      .severity-row,
      .action-card {
        margin-bottom: 10px;
      }
      .entity-row,
      .severity-row {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        align-items: center;
        gap: 10px;
        padding: 8px 0;
      }
      .entity-toggle {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 32px;
      }
      .entity-meta-toggle {
        font-size: 10px;
        line-height: 1;
        opacity: 0.6;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        margin-bottom: 4px;
      }
      .entity-main-field {
        min-width: 0;
      }
      .action-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(160px, 220px) auto;
        align-items: end;
        gap: 8px;
      }
      .action-spacer {
        width: 24px;
        height: 24px;
      }
      .clear-icon {
        align-self: end;
      }
      .positions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 8px 12px;
      }
      .inline-fields {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
      }
      .stack-actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .icon-group {
        gap: 4px;
        padding-left: 8px;
        border-left: 1px solid var(--divider-color);
      }
      .toggle-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 10px;
      }
      .toggle-card {
        padding: 10px 12px;
        border-radius: 12px;
        background: color-mix(in srgb, var(--primary-background-color) 70%, transparent);
        border: 1px solid var(--divider-color);
      }
      .compact-toggle {
        max-width: 140px;
      }
      .severity-fields {
        padding: 0;
      }
      .muted-icon {
        opacity: 0.25;
      }
      .add-row {
        display: flex;
        justify-content: flex-end;
      }
      .section-scroll {
        max-height: 420px;
        overflow: auto;
      }
      .severity-scroll {
        max-height: 460px;
      }
      @media (max-width: 600px) {
        .entity-row,
        .severity-row,
        .action-row {
          grid-template-columns: 1fr;
        }
        .entity-toggle,
        .stack-actions {
          justify-self: start;
          align-items: flex-start;
        }
        .inline-fields {
          grid-template-columns: 1fr;
        }
        .icon-group {
          border-left: 0;
          padding-left: 0;
        }
      }
    `;
  }
}
// @ts-expect-error
window.customCards = window.customCards || [];
// @ts-expect-error
window.customCards.push({
  type: 'bar-card',
  name: 'Bar Card',
  preview: false, // Optional - defaults to false
  description: 'A customizable bar card.', // Optional
});
