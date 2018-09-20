export default {
    template: `
        <li class="bell-list-item
            {{#if className}} {{className}}{{/if}}
            {{#if hasSlot('header')}} bell-list-item-has-header{{/if}}
            {{#if hasSlot('footer')}} bell-list-item-has-footer{{/if}}
        "{{#if style}} style="{{style}}"{{/if}} on-click="itemClick($event, hasSlot('nested'))">

            <div class="bell-list-item-content
                {{#if !disableHover}} bell-list-item-content-hover{{/if}}
                {{#if active}} bell-active{{/if}}
            ">
                {{#if hasSlot('header')}}
                    <div class="bell-list-item-header">
                        <slot name="header" />
                    </div>
                {{/if}}

                {{#if hasSlot('footer')}}
                    <div class="bell-list-item-footer">
                        <slot name="footer" />
                    </div>
                {{/if}}

                {{#if hasSlot('children')}}
                    <div class="bell-list-item-text">
                        <slot name="children" />
                    </div>
                {{/if}}
            </div>

            {{#if hasSlot('nested')}}
                <div class="bell-list-item-nested{{#if nestedIsShow}} bell-show{{/if}}">
                    <slot name="nested" />
                </div>
            {{/if}}

        </li>
    `,
    propTypes: {
        className: {
            type: 'string'
        },
        style: {
            type: 'string'
        },
        disableHover: {
            type: 'boolean'
        },
        active: {
            type: 'boolean'
        }
    },

    data() {
        return {
            nestedIsShow: false
        }
    },

    methods: {
        itemClick(event, hasNested) {
            if (!hasNested) {
                this.fire('click');
                event.stop();
                return;
            }
            this.toggle('nestedIsShow');
            event.stop();
        }
    }
};