import React from "react";
import {Field, FormSection} from "redux-form";
import {selectField} from "servicebot-base-form";
import getWidgets from "../core-input-types/client"
const values = require('object.values');
if (!Object.values) {
    values.shim();
}
let PriceOperation = (props) => {
    let {input} = props;
    return (
        <select {...input}>
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
            <option value="divide">Percent Decrease</option>
            <option value="multiply">Percent Increase</option>
        </select>
    )
};

let RenderWidget = (props) => {
    const {showPrice, member, currency, widgetType, configValue, defaultWidgetValue} = props;

    const widget = getWidgets().find(widgetToCheck => widgetToCheck.type === widgetType);
    if (!widget) {
        console.error("widget does not exist ", widgetType);
    }
    return (
        <div>
            <FormSection name={`${member}.config`}>
                {widget.config && <Field name={`value`} component={widget.config}/>}
                {widget.pricing && showPrice &&
                <div className="addon-widget-has-pricing">
                    <FormSection name={`pricing`}>

                    <Field name="operation" component={selectField} label="Apply Price Change"
                           options={[
                               {id: "add", name: "Add to base price"},
                               {id: "subtract", name: "Subtract from base price"},
                               {id: "multiply", name: "Percent add to base price"},
                               {id: "divide", name: "Percent off from base price"},
                           ]}/>

                        <div className="addon-widget-pricing-inputs-wrapper">
                            <label className="control-label form-label-flex-md addon-widget-pricing-input-label">Add-On Pricing</label>
                            <Field name={`value`} configValue={configValue} currency={currency} component={widget.pricing}/>
                        </div>
                    </FormSection>
                </div>}
            </FormSection>
            {widget.widget &&
            <Field name={`${member}.data.value`} currency={currency} configValue={configValue} component={widget.widget}/>}
        </div>
    );
};


let PriceBreakdown = (props) => {
    const {inputs} = props;
    let widgets = getWidgets().reduce((acc, widget) => {
        acc[widget.type] = widget;
        return acc;
    }, {});

    let breakdown = inputs.reduce((acc, input) => {
        if (input.config && input.config.pricing && widgets[input.type].handler.priceHandler) {
            acc.push(<div>{input.prop_label} - {input.config.pricing.operation}
                - {widgets[input.type].handler.priceHandler(input.data, input.config)}</div>);
        }
        return acc;
    }, []);

    if (breakdown.length == 0) {
        breakdown = <div/>
    }
    return (
        <div>
            {breakdown}
        </div>
    );
};
let WidgetList = props => (
    <Field name={props.name} id={props.name} component={selectField}
           options={getWidgets()} valueKey="type" labelKey="label"
    />
);

export {RenderWidget, WidgetList, PriceBreakdown}