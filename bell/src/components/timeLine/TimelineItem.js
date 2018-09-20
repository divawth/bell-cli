export default {
    template: `
        <li class="bell-time-line-item">
            <div class="bell-time-line-tail"></div>
            {{#if hasSlot('dot')}}
                <slot name="dot" />
            {{else}}
                <div class="bell-time-line-dot"
                    style="color: {{color}}"
                ></div>
            {{/if}}
            <div class="bell-time-line-content">
                {{#if hasSlot('children')}}
                    <slot name="children" />
                {{/if}}
            </div>
        </li>
    `,
    propTypes: {
        color: {
            type: 'string',
            value: '#348EED'
        }
    }

}