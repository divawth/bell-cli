export default {
    template: `
        <div class="bell-card-header
            {{#if className}} {{className}}{{/if}}
        "{{#if style}} style="{{style}}"{{/if}}>

            {{#if hasSlot('avatar')}}
                <slot name="avatar" />
            {{/if}}

            <div class="bell-card-header-detail">
                {{#if hasSlot('title')}}
                    <div class="bell-card-header-title
                        {{#if titleClass}} {{titleClass}}{{/if}}
                    ">
                        <slot name="title" />
                    </div>
                {{/if}}

                {{#if hasSlot('subTitle')}}
                    <div class="bell-card-header-sub-title
                        {{#if subTitleClass}} {{subTitleClass}}{{/if}}
                    ">
                        <slot name="subTitle" />
                    </div>
                {{/if}}
            </div>

            {{#if hasSlot('extra')}}
                <span class="bell-card-header-extra">
                    <slot name="extra" />
                </span>
            {{/if}}

            {{#if hasSlot('children')}}
                <slot name="children" />
            {{/if}}

        </div>
    `,

    propTypes: {
        className: {
            type: 'string'
        },
        style: {
            type: 'string'
        },
        titleClass: {
            type: 'string'
        },
        subTitleClass: {
            type: 'string'
        }
    }
};