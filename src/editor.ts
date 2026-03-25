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

type ActionKey = 'tap_action' | 'hold_action' | 'double_tap_action';
type SectionKey = 'entities' | 'card' | 'bar' | 'value' | 'positions' | 'severity' | 'animation' | 'actions';
type EditorConfigTarget = EditorBarConfig | EditorAnimationConfig | EditorPositionsConfig | EditorActionConfig;

interface SectionState {
  entities: boolean;
  card: boolean;
  bar: boolean;
  value: boolean;
  positions: boolean;
  severity: boolean;
  animation: boolean;
  actions: boolean;
}

interface ChoiceOption {
  label: string;
  value: string;
}

const DIRECTION_OPTIONS: ChoiceOption[] = [{ label: 'Right', value: 'right' }, { label: 'Up', value: 'up' }];

const POSITION_OPTIONS: ChoiceOption[] = [
  { label: 'Default', value: '' },
  { label: 'Inside', value: 'inside' },
  { label: 'Outside', value: 'outside' },
  { label: 'Off', value: 'off' },
];

const POSITION_KEYS = ['icon', 'indicator', 'name', 'minmax', 'value'];

const ACTION_OPTIONS: ChoiceOption[] = [
  { label: 'None', value: '' },
  { label: 'Info', value: 'more-info' },
  { label: 'Toggle', value: 'toggle' },
  { label: 'Navigate', value: 'navigate' },
  { label: 'URL', value: 'url' },
  { label: 'Service', value: 'call-service' },
];

const ACTION_LABELS: Record<ActionKey, string> = {
  tap_action: 'Tap',
  hold_action: 'Hold',
  double_tap_action: 'Double tap',
};

const DEFAULT_SECTIONS: SectionState = {
  entities: true,
  card: true,
  bar: false,
  value: false,
  positions: false,
  severity: false,
  animation: false,
  actions: false,
};

@customElement('bar-card-editor')
export class BarCardEditor extends LitElement implements LovelaceCardEditor {
  @property() public hass?: HomeAssistant;
  @property() private _config: EditorBarConfig = {};
  @property() private _toggle?: boolean;

  private _configArray: EditorBarConfig[] = [];
  private _sections: SectionState = { ...DEFAULT_SECTIONS };
  private _entityOpen: boolean[] = [];

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    return hasConfigOrEntitiesChanged(this, changedProps, true);
  }

  public setConfig(config: BarCardConfig): void {
    this._config = { ...config };

    if (!this._config.entity && !this._config.entities) {
      this._config.entities = [{ entity: '' }];
    }

    if (this._config.entity) {
      this._config.entities = [{ entity: this._config.entity }];
      delete this._config.entity;
    }

    this._configArray = createEditorConfigArray(this._config) as EditorBarConfig[];
    if (this._configArray.length === 0) {
      this._configArray = [{ entity: '' }];
    }

    this._entityOpen = this._configArray.map((_, index) => index === 0);
    this._sections = { ...DEFAULT_SECTIONS };
    this._syncAndEmit();
  }

  protected render(): TemplateResult {
    if (!this.hass) {
      return html``;
    }

    return html`
      <div class="editor-shell">
        <div class="editor-note">
          <div class="note-title">Rebuilt editor</div>
          <div class="note-body">
            This version intentionally uses simpler Home Assistant-style form patterns and fewer custom controls so it
            renders reliably in the dialog.
          </div>
        </div>

        ${this._renderPanel(
          'entities',
          'Entities',
          'Manage card entities and per-entity overrides.',
          this._renderEntitiesPanel(),
        )}
        ${this._renderPanel(
          'card',
          'Card Defaults',
          'Apply shared card settings like title, columns, and entity row behavior.',
          this._renderCardDefaults(),
        )}
        ${this._renderPanel(
          'bar',
          'Bar Defaults',
          'Shared name, icon, size, color, and direction defaults for all entities.',
          this._renderBarSettings(this._config, true),
        )}
        ${this._renderPanel(
          'value',
          'Value Defaults',
          'Global formatting, min/max/target, and attribute defaults.',
          this._renderValueSettings(this._config),
        )}
        ${this._renderPanel(
          'positions',
          'Position Defaults',
          'Choose where icon, name, values, and indicators render by default.',
          this._renderPositionsSettings(this._config),
        )}
        ${this._renderPanel(
          'severity',
          'Severity Defaults',
          'Map ranges to colors, icons, or hidden states.',
          this._renderSeveritySettings(this._config, null),
        )}
        ${this._renderPanel(
          'animation',
          'Animation Defaults',
          'Set shared animation behavior for all bars.',
          this._renderAnimationSettings(this._config),
        )}
        ${this._renderPanel(
          'actions',
          'Action Defaults',
          'Configure shared tap, hold, and double-tap actions.',
          this._renderActionSettings(this._config),
        )}
      </div>
    `;
  }

  private _renderPanel(key: SectionKey, title: string, description: string, content: TemplateResult): TemplateResult {
    const open = this._sections[key];

    return html`
      <section class="panel">
        <button class="panel-header" type="button" @click=${(): void => this._toggleSection(key)}>
          <div>
            <div class="panel-title">${title}</div>
            <div class="panel-description">${description}</div>
          </div>
          <ha-icon .icon=${open ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
        </button>
        ${open
          ? html`
              <div class="panel-body">${content}</div>
            `
          : html``}
      </section>
    `;
  }

  private _renderEntitiesPanel(): TemplateResult {
    return html`
      <div class="entity-list">
        ${this._configArray.map((entityConfig, index) => this._renderEntityCard(entityConfig, index))}
      </div>
      <div class="toolbar end">
        <button class="add-button" type="button" @click=${this._addEntity}>
          <ha-icon .icon=${'mdi:plus'}></ha-icon>
          <span>Add entity</span>
        </button>
      </div>
    `;
  }

  private _renderEntityCard(config: EditorBarConfig, index: number): TemplateResult {
    const isOpen = !!this._entityOpen[index];
    const title = config.name || config.entity || `Entity ${index + 1}`;
    const subtitle = this._getEntityHint(config);

    return html`
      <article class="entity-card">
        <div class="entity-header">
          <button class="entity-summary" type="button" @click=${(): void => this._toggleEntity(index)}>
            <div class="entity-title-row">
              <div class="entity-title">${title}</div>
              <ha-icon .icon=${isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
            </div>
            <div class="entity-subtitle">${subtitle}</div>
          </button>
          <div class="icon-actions">
            <button
              class="icon-button"
              type="button"
              ?disabled=${index === 0}
              @click=${(): void => this._moveEntity(index, -1)}
            >
              <ha-icon .icon=${'mdi:arrow-up'}></ha-icon>
            </button>
            <button
              class="icon-button"
              type="button"
              ?disabled=${index === this._configArray.length - 1}
              @click=${(): void => this._moveEntity(index, 1)}
            >
              <ha-icon .icon=${'mdi:arrow-down'}></ha-icon>
            </button>
            <button class="icon-button danger" type="button" @click=${(): void => this._removeEntity(index)}>
              <ha-icon .icon=${'mdi:delete-outline'}></ha-icon>
            </button>
          </div>
        </div>

        ${isOpen
          ? html`
              <div class="entity-body">
                ${this._renderEntityBasics(config)} ${this._renderSubheading('Bar')}
                ${this._renderBarSettings(config, false)} ${this._renderSubheading('Value')}
                ${this._renderValueSettings(config)} ${this._renderSubheading('Positions')}
                ${this._renderPositionsSettings(config)} ${this._renderSubheading('Severity')}
                ${this._renderSeveritySettings(config, index)} ${this._renderSubheading('Animation')}
                ${this._renderAnimationSettings(config)} ${this._renderSubheading('Actions')}
                ${this._renderActionSettings(config)}
              </div>
            `
          : html``}
      </article>
    `;
  }

  private _renderEntityBasics(config: EditorBarConfig): TemplateResult {
    return html`
      <div class="group-grid two-col">
        ${this._renderTextField('Entity ID', config.entity, (value): void => this._setField(config, 'entity', value))}
        ${this._renderTextField('Friendly Name', config.name, (value): void => this._setField(config, 'name', value))}
      </div>
      ${this._renderHint(this._getEntityHint(config))}
    `;
  }

  private _renderCardDefaults(): TemplateResult {
    return html`
      <div class="group-grid two-col">
        ${this._renderTextField('Header Title', this._config.title, (value): void =>
          this._setField(this._config, 'title', value),
        )}
        ${this._renderNumberField('Columns', this._config.columns, (value): void =>
          this._setField(this._config, 'columns', value),
        )}
      </div>
      ${this._renderChoiceField(
        'Stack',
        [{ label: 'None', value: '' }, { label: 'Horizontal', value: 'horizontal' }],
        this._config.stack,
        (value): void => this._setField(this._config, 'stack', value),
      )}
      <div class="toggle-grid">
        ${this._renderCheckbox('Entity Row', !!this._config.entity_row, (checked): void =>
          this._setBoolean(this._config, 'entity_row', checked),
        )}
        ${this._renderCheckbox('Entity Config', !!this._config.entity_config, (checked): void =>
          this._setBoolean(this._config, 'entity_config', checked),
        )}
      </div>
      ${this._renderHint(
        'These settings are similar to the shared top-level controls used in Home Assistant card editors.',
      )}
    `;
  }

  private _renderBarSettings(config: EditorBarConfig, global: boolean): TemplateResult {
    return html`
      <div class="group-grid two-col">
        ${global
          ? html``
          : this._renderTextField('Label', config.name, (value): void => this._setField(config, 'name', value))}
        ${this._renderTextField('Icon', config.icon, (value): void => this._setField(config, 'icon', value))}
        ${this._renderTextField('Height', config.height, (value): void => this._setField(config, 'height', value))}
        ${this._renderTextField('Width', config.width, (value): void => this._setField(config, 'width', value))}
        ${this._renderTextField('Color', config.color, (value): void => this._setField(config, 'color', value))}
      </div>
      ${this._renderChoiceField('Direction', DIRECTION_OPTIONS, config.direction || 'right', (value): void =>
        this._setField(config, 'direction', value),
      )}
      ${this._renderHint(
        'Use theme colors or CSS values. This is intentionally flatter and simpler than the previous custom layout.',
      )}
    `;
  }

  private _renderValueSettings(config: EditorBarConfig): TemplateResult {
    return html`
      <div class="toggle-grid">
        ${this._renderCheckbox('Limit Value', !!config.limit_value, (checked): void =>
          this._setBoolean(config, 'limit_value', checked),
        )}
        ${this._renderCheckbox('Complementary', !!config.complementary, (checked): void =>
          this._setBoolean(config, 'complementary', checked),
        )}
      </div>
      <div class="group-grid three-col">
        ${this._renderNumberField('Decimal', config.decimal, (value): void => this._setField(config, 'decimal', value))}
        ${this._renderNumberField('Min', config.min, (value): void => this._setField(config, 'min', value))}
        ${this._renderNumberField('Max', config.max, (value): void => this._setField(config, 'max', value))}
        ${this._renderNumberField('Target', config.target, (value): void => this._setField(config, 'target', value))}
      </div>
      <div class="group-grid two-col">
        ${this._renderTextField('Unit of Measurement', config.unit_of_measurement, (value): void =>
          this._setField(config, 'unit_of_measurement', value),
        )}
        ${this._renderTextField('Attribute', config.attribute, (value): void =>
          this._setField(config, 'attribute', value),
        )}
      </div>
      ${this._renderHint(
        'Use YAML for advanced object-style min/max sources. The visual editor focuses on common number-based editing.',
      )}
    `;
  }

  private _renderPositionsSettings(config: EditorBarConfig): TemplateResult {
    const positions = this._ensurePositions(config);

    return html`
      <div class="positions-grid">
        ${POSITION_KEYS.map(position =>
          this._renderChoiceField(position, POSITION_OPTIONS, positions[position] || '', (value): void => {
            this._setPosition(config, position, value);
          }),
        )}
      </div>
      ${this._renderHint('This mirrors the compact segmented-choice pattern common in Home Assistant editors.')}
    `;
  }

  private _renderSeveritySettings(config: EditorBarConfig, index: number | null): TemplateResult {
    const severity = config.severity || [];

    return html`
      ${severity.length === 0
        ? this._renderEmptyState('No severity rules yet', 'Add rules to map ranges to colors, icons, or hidden states.')
        : html`
            <div class="severity-list">
              ${severity.map((rule, severityIndex) => this._renderSeverityRule(config, rule, severityIndex))}
            </div>
          `}
      <div class="toolbar end">
        <button class="add-button" type="button" @click=${(): void => this._addSeverity(config, index)}>
          <ha-icon .icon=${'mdi:plus'}></ha-icon>
          <span>Add severity rule</span>
        </button>
      </div>
    `;
  }

  private _renderSeverityRule(
    config: EditorBarConfig,
    severity: EditorSeverityConfig,
    severityIndex: number,
  ): TemplateResult {
    const rules = config.severity || [];

    return html`
      <div class="rule-card">
        <div class="rule-header">
          <div class="rule-title">Rule ${severityIndex + 1}</div>
          <div class="icon-actions">
            <button
              class="icon-button"
              type="button"
              ?disabled=${severityIndex === 0}
              @click=${(): void => this._moveSeverity(config, severityIndex, -1)}
            >
              <ha-icon .icon=${'mdi:arrow-up'}></ha-icon>
            </button>
            <button
              class="icon-button"
              type="button"
              ?disabled=${severityIndex === rules.length - 1}
              @click=${(): void => this._moveSeverity(config, severityIndex, 1)}
            >
              <ha-icon .icon=${'mdi:arrow-down'}></ha-icon>
            </button>
            <button
              class="icon-button danger"
              type="button"
              @click=${(): void => this._removeSeverity(config, severityIndex)}
            >
              <ha-icon .icon=${'mdi:delete-outline'}></ha-icon>
            </button>
          </div>
        </div>
        <div class="group-grid two-col">
          ${this._renderNumberField('From', severity.from, (value): void =>
            this._setSeverityField(config, severityIndex, 'from', value),
          )}
          ${this._renderNumberField('To', severity.to, (value): void =>
            this._setSeverityField(config, severityIndex, 'to', value),
          )}
          ${this._renderTextField('Color', severity.color, (value): void =>
            this._setSeverityField(config, severityIndex, 'color', value),
          )}
          ${this._renderTextField('Icon', severity.icon, (value): void =>
            this._setSeverityField(config, severityIndex, 'icon', value),
          )}
        </div>
        ${this._renderCheckbox('Hide bar for this range', !!severity.hide, (checked): void =>
          this._setSeverityBoolean(config, severityIndex, 'hide', checked),
        )}
      </div>
    `;
  }

  private _renderAnimationSettings(config: EditorBarConfig): TemplateResult {
    const animation = this._ensureAnimation(config);

    return html`
      ${this._renderChoiceField(
        'Animation State',
        [{ label: 'Off', value: 'off' }, { label: 'On', value: 'on' }],
        animation.state || 'off',
        (value): void => this._setAnimationField(config, 'state', value),
      )}
      <div class="group-grid two-col">
        ${this._renderTextField('Speed (seconds)', animation.speed, (value): void =>
          this._setAnimationField(config, 'speed', value),
        )}
      </div>
    `;
  }

  private _renderActionSettings(config: EditorBarConfig): TemplateResult {
    return html`
      <div class="actions-list">
        ${(['tap_action', 'hold_action', 'double_tap_action'] as ActionKey[]).map(actionKey =>
          this._renderActionCard(config, actionKey),
        )}
      </div>
      ${this._renderHint(
        'This follows the same simple action selection flow used by many stable third-party cards: pick an action, then fill only the fields it needs.',
      )}
    `;
  }

  private _renderActionCard(config: EditorBarConfig, actionKey: ActionKey): TemplateResult {
    const actionConfig = this._getAction(config, actionKey);
    const action = actionConfig.action || '';
    const label = ACTION_LABELS[actionKey];

    return html`
      <div class="rule-card">
        <div class="rule-title">${label}</div>
        ${this._renderChoiceField(`${label} action`, ACTION_OPTIONS, action, (value): void =>
          this._setActionField(config, actionKey, 'action', value),
        )}
        ${action === 'navigate'
          ? this._renderTextField('Navigation Path', actionConfig.navigation_path, (value): void =>
              this._setActionField(config, actionKey, 'navigation_path', value),
            )
          : html``}
        ${action === 'url'
          ? this._renderTextField('URL', actionConfig.url_path, (value): void =>
              this._setActionField(config, actionKey, 'url_path', value),
            )
          : html``}
        ${action === 'call-service'
          ? this._renderTextField('Service', actionConfig.service, (value): void =>
              this._setActionField(config, actionKey, 'service', value),
            )
          : html``}
      </div>
    `;
  }

  private _renderSubheading(label: string): TemplateResult {
    return html`
      <div class="subheading">${label}</div>
    `;
  }

  private _renderTextField(label: string, value: unknown, onInput: (value: string) => void): TemplateResult {
    return html`
      <label class="field">
        <span class="field-label">${label}</span>
        <input
          class="field-input"
          .value=${this._stringValue(value)}
          @input=${(ev: Event): void => onInput(this._inputValue(ev))}
        />
      </label>
    `;
  }

  private _renderNumberField(label: string, value: unknown, onInput: (value: string) => void): TemplateResult {
    return html`
      <label class="field">
        <span class="field-label">${label}</span>
        <input
          class="field-input"
          type="number"
          .value=${this._stringValue(value)}
          @input=${(ev: Event): void => onInput(this._inputValue(ev))}
        />
      </label>
    `;
  }

  private _renderCheckbox(label: string, checked: boolean, onChange: (checked: boolean) => void): TemplateResult {
    return html`
      <label class="checkbox-card">
        <input type="checkbox" .checked=${checked} @change=${(ev: Event): void => onChange(this._checkedValue(ev))} />
        <span>${label}</span>
      </label>
    `;
  }

  private _renderChoiceField(
    label: string,
    options: ChoiceOption[],
    selected: string | undefined,
    onSelect: (value: string) => void,
  ): TemplateResult {
    const selectedValue = selected || '';

    return html`
      <div class="field">
        <div class="field-label">${label}</div>
        <div class="choice-group">
          ${options.map(
            option => html`
              <button
                class="choice-button ${selectedValue === option.value ? 'selected' : ''}"
                type="button"
                @click=${(): void => onSelect(option.value)}
              >
                ${option.label}
              </button>
            `,
          )}
        </div>
      </div>
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

  private _renderHint(text: string): TemplateResult {
    return html`
      <div class="hint">${text}</div>
    `;
  }

  private _toggleSection(key: SectionKey): void {
    this._sections = {
      ...this._sections,
      [key]: !this._sections[key],
    };
  }

  private _toggleEntity(index: number): void {
    this._entityOpen = this._entityOpen.map((open, itemIndex) => (itemIndex === index ? !open : open));
  }

  private _addEntity = (): void => {
    this._configArray = [...this._configArray, { entity: '' }];
    this._entityOpen = [...this._entityOpen, true];
    this._syncAndEmit();
  };

  private _moveEntity(index: number, direction: -1 | 1): void {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= this._configArray.length) {
      return;
    }

    this._configArray = arrayMove(this._configArray, index, newIndex) as EditorBarConfig[];
    this._entityOpen = arrayMove(this._entityOpen, index, newIndex) as boolean[];
    this._syncAndEmit();
  }

  private _removeEntity(index: number): void {
    this._configArray = this._configArray.filter((_, itemIndex) => itemIndex !== index);
    this._entityOpen = this._entityOpen.filter((_, itemIndex) => itemIndex !== index);

    if (this._configArray.length === 0) {
      this._configArray = [{ entity: '' }];
      this._entityOpen = [true];
    }

    this._syncAndEmit();
  }

  private _addSeverity(config: EditorBarConfig, index: number | null): void {
    const nextRule: EditorSeverityConfig = { from: '', to: '', color: '', icon: '', hide: false };
    config.severity = [...(config.severity || []), nextRule];

    if (index !== null) {
      this._entityOpen[index] = true;
    }

    this._syncAndEmit();
  }

  private _moveSeverity(config: EditorBarConfig, index: number, direction: -1 | 1): void {
    if (!config.severity) {
      return;
    }

    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= config.severity.length) {
      return;
    }

    config.severity = arrayMove(config.severity, index, newIndex) as EditorSeverityConfig[];
    this._syncAndEmit();
  }

  private _removeSeverity(config: EditorBarConfig, index: number): void {
    if (!config.severity) {
      return;
    }

    config.severity = config.severity.filter((_, severityIndex) => severityIndex !== index);
    this._syncAndEmit();
  }

  private _setField(config: EditorConfigTarget, key: string, value: string): void {
    if (value === '') {
      delete config[key];
    } else {
      config[key] = value;
    }
    this._syncAndEmit();
  }

  private _setBoolean(config: EditorBarConfig, key: keyof EditorBarConfig, checked: boolean): void {
    if (checked) {
      config[key] = checked;
    } else {
      delete config[key];
    }
    this._syncAndEmit();
  }

  private _setPosition(config: EditorBarConfig, key: string, value: string): void {
    const positions = this._ensurePositions(config);
    if (value === '') {
      delete positions[key];
    } else {
      positions[key] = value;
    }
    this._syncAndEmit();
  }

  private _setAnimationField(config: EditorBarConfig, key: keyof EditorAnimationConfig, value: string): void {
    const animation = this._ensureAnimation(config);
    if (value === '') {
      delete animation[key];
    } else {
      animation[key] = value;
    }
    this._syncAndEmit();
  }

  private _setActionField(
    config: EditorBarConfig,
    actionKey: ActionKey,
    key: keyof EditorActionConfig,
    value: string,
  ): void {
    const actionConfig = this._getAction(config, actionKey);

    if (key === 'action' && value === '') {
      delete config[actionKey];
      this._syncAndEmit();
      return;
    }

    if (value === '') {
      delete actionConfig[key];
    } else {
      actionConfig[key] = value;
    }

    if (!actionConfig.action) {
      delete config[actionKey];
    }

    this._syncAndEmit();
  }

  private _setSeverityField(
    config: EditorBarConfig,
    severityIndex: number,
    key: 'from' | 'to' | 'color' | 'icon',
    value: string,
  ): void {
    if (!config.severity) {
      return;
    }

    if (value === '') {
      delete config.severity[severityIndex][key];
    } else {
      config.severity[severityIndex][key] = value;
    }

    this._syncAndEmit();
  }

  private _setSeverityBoolean(config: EditorBarConfig, severityIndex: number, key: 'hide', checked: boolean): void {
    if (!config.severity) {
      return;
    }

    if (checked) {
      config.severity[severityIndex][key] = checked;
    } else {
      delete config.severity[severityIndex][key];
    }

    this._syncAndEmit();
  }

  private _ensurePositions(config: EditorBarConfig): EditorPositionsConfig {
    if (!config.positions) {
      config.positions = {};
    }
    return config.positions;
  }

  private _ensureAnimation(config: EditorBarConfig): EditorAnimationConfig {
    if (!config.animation) {
      config.animation = {};
    }
    return config.animation;
  }

  private _getAction(config: EditorBarConfig, actionKey: ActionKey): EditorActionConfig {
    if (!config[actionKey]) {
      config[actionKey] = {};
    }
    return config[actionKey] as EditorActionConfig;
  }

  private _syncAndEmit(): void {
    this._config = {
      ...this._config,
      entities: this._configArray.map(entityConfig => this._cleanConfig(entityConfig)),
    };

    this._emitConfigChanged();
    this.requestUpdate();
  }

  private _emitConfigChanged(): void {
    fireEvent(this, 'config-changed', { config: this._cleanConfig(this._config) as BarCardConfig });
  }

  private _cleanConfig(config: EditorBarConfig): EditorBarConfig {
    const cleaned: EditorBarConfig = { ...config };

    delete cleaned.entity;
    if (config.entity !== undefined) {
      cleaned.entity = config.entity;
    }

    if (cleaned.positions) {
      const positions = { ...cleaned.positions };
      Object.keys(positions).forEach(key => {
        if (positions[key] === '' || positions[key] === undefined) {
          delete positions[key];
        }
      });
      cleaned.positions = Object.keys(positions).length > 0 ? positions : undefined;
    }

    if (cleaned.animation) {
      const animation = { ...cleaned.animation };
      if (!animation.state) {
        delete animation.state;
      }
      if (!animation.speed) {
        delete animation.speed;
      }
      cleaned.animation = Object.keys(animation).length > 0 ? animation : undefined;
    }

    if (cleaned.severity) {
      const severity = cleaned.severity
        .map(rule => {
          const nextRule = { ...rule };
          if (!nextRule.from && nextRule.from !== 0) {
            delete nextRule.from;
          }
          if (!nextRule.to && nextRule.to !== 0) {
            delete nextRule.to;
          }
          if (!nextRule.color) {
            delete nextRule.color;
          }
          if (!nextRule.icon) {
            delete nextRule.icon;
          }
          if (!nextRule.hide) {
            delete nextRule.hide;
          }
          return nextRule;
        })
        .filter(rule => Object.keys(rule).length > 0);
      cleaned.severity = severity.length > 0 ? severity : undefined;
    }

    (['tap_action', 'hold_action', 'double_tap_action'] as ActionKey[]).forEach(actionKey => {
      const actionConfig = cleaned[actionKey] as EditorActionConfig | undefined;
      if (!actionConfig) {
        return;
      }

      const nextAction = { ...actionConfig };
      if (!nextAction.action) {
        delete cleaned[actionKey];
        return;
      }
      if (!nextAction.navigation_path) {
        delete nextAction.navigation_path;
      }
      if (!nextAction.url_path) {
        delete nextAction.url_path;
      }
      if (!nextAction.service) {
        delete nextAction.service;
      }
      cleaned[actionKey] = nextAction;
    });

    if (cleaned.entities) {
      cleaned.entities = cleaned.entities.map(entity => this._cleanConfig(entity));
    }

    Object.keys(cleaned).forEach(key => {
      const value = cleaned[key];
      if (value === '' || value === undefined) {
        delete cleaned[key];
      }
    });

    return cleaned;
  }

  private _getEntityHint(config: EditorBarConfig): string {
    if (!this.hass || !config.entity) {
      return 'Enter an entity id, then tune only the overrides you need.';
    }

    const stateObj = this.hass.states[config.entity];
    if (!stateObj) {
      return 'Entity not found yet in Home Assistant. Double-check the entity id.';
    }

    const friendlyName = stateObj.attributes.friendly_name || config.entity;
    return `${friendlyName}: ${stateObj.state}`;
  }

  private _inputValue(ev: Event): string {
    return (ev.currentTarget as HTMLInputElement).value;
  }

  private _checkedValue(ev: Event): boolean {
    return (ev.currentTarget as HTMLInputElement).checked;
  }

  private _stringValue(value: unknown): string {
    return value === undefined || value === null ? '' : String(value);
  }

  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
      }
      .editor-shell {
        display: grid;
        gap: 16px;
      }
      .editor-note,
      .panel,
      .entity-card,
      .rule-card {
        background: var(--ha-card-background, var(--card-background-color));
        border: 1px solid var(--divider-color);
        border-radius: 16px;
      }
      .editor-note {
        padding: 14px 16px;
      }
      .note-title,
      .panel-title,
      .entity-title,
      .rule-title,
      .subheading {
        font-weight: 600;
        color: var(--primary-text-color);
      }
      .note-body,
      .panel-description,
      .entity-subtitle,
      .hint,
      .empty-description {
        color: var(--secondary-text-color);
        line-height: 1.45;
      }
      .panel-header,
      .entity-summary,
      .icon-button,
      .choice-button,
      .add-button {
        font: inherit;
      }
      .panel-header,
      .entity-summary {
        width: 100%;
        background: transparent;
        border: 0;
        color: inherit;
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: left;
        cursor: pointer;
      }
      .panel-body,
      .entity-body {
        padding: 0 16px 16px;
        display: grid;
        gap: 14px;
      }
      .entity-header,
      .rule-header,
      .toolbar,
      .entity-title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      .entity-header {
        padding-right: 12px;
      }
      .icon-actions {
        display: flex;
        gap: 6px;
      }
      .icon-button {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        border: 1px solid var(--divider-color);
        background: transparent;
        color: var(--primary-text-color);
        cursor: pointer;
      }
      .icon-button[disabled] {
        opacity: 0.35;
        cursor: default;
      }
      .icon-button.danger {
        color: var(--error-color);
      }
      .subheading {
        padding-top: 4px;
        border-top: 1px solid var(--divider-color);
      }
      .field {
        display: grid;
        gap: 6px;
        min-width: 0;
      }
      .field-label {
        font-size: 12px;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .field-input {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.08));
        color: var(--primary-text-color);
        padding: 12px;
        font: inherit;
      }
      .group-grid {
        display: grid;
        gap: 12px;
      }
      .group-grid.two-col {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .group-grid.three-col {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      .toggle-grid,
      .positions-grid,
      .entity-list,
      .severity-list,
      .actions-list {
        display: grid;
        gap: 12px;
      }
      .toggle-grid {
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      }
      .positions-grid {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }
      .checkbox-card {
        display: flex;
        gap: 10px;
        align-items: center;
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        padding: 12px;
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.08));
      }
      .choice-group {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .choice-button,
      .add-button {
        border: 1px solid var(--divider-color);
        border-radius: 999px;
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.08));
        color: var(--primary-text-color);
        padding: 8px 12px;
        cursor: pointer;
      }
      .choice-button.selected,
      .add-button {
        border-color: var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      }
      .add-button {
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }
      .toolbar.end {
        justify-content: flex-end;
      }
      .hint {
        font-size: 12px;
      }
      .empty-state {
        padding: 16px;
        border: 1px dashed var(--divider-color);
        border-radius: 12px;
        text-align: center;
      }
      .empty-title {
        font-weight: 600;
        margin-bottom: 4px;
      }
      @media (max-width: 700px) {
        .group-grid.two-col,
        .group-grid.three-col {
          grid-template-columns: 1fr;
        }
        .entity-header,
        .rule-header {
          align-items: flex-start;
          flex-direction: column;
        }
        .icon-actions {
          align-self: flex-end;
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
  preview: false,
  description: 'A customizable bar card.',
});
