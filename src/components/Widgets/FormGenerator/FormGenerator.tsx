import { useEffect } from "react";
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Space, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { usePostContentMutation } from "../../../features/common/commonApiSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { DataListFilterType, setFilters } from "../../../features/dataList/dataListSlice";

type FieldType = {
	name: string,
	type: "text" | "number" | "select" | "radioGroup" | "checkboxGroup" | "checkbox" | "textArea" | "datetime",
	label: string,
	required?: boolean,
	rules: {
		pattern: RegExp,
		message: string
	}[],
	placeholder: string,
	initialValue?: string | number | boolean | string[] | number[] | boolean[],
	extra?: {
		addonBefore?: string,
		options?: {
			label: string,
			value: string | number | boolean,
		}[],
		format?: string,
		minDate?: string,
		maxDate?: string,
		accepted?: string,
		multiple?: boolean,
		maxSize?: number,
		maxCount?: number
	}
	conditions?: {
		type: "hidden" | "visible" | "enabled" | "disabled" | "value",
		extFieldname: string,
		extValues: string[] | number[] | boolean[],
	}[]
}

const FormGenerator = ({title, endpoint, initialValues, prefix, fields, onClose }) => {

	const [postContent, { isLoading }] = usePostContentMutation();
	const messageKey = 'formGeneratorMessageKey';
	const [messageApi, contextHolder] = message.useMessage();
	const [form] = Form.useForm();
	const dispatch = useAppDispatch();

	const renderField = (field: FieldType) => {
		switch (field.type) {
			case "text":
				return <Input placeholder={field.placeholder} />
		
			case "number":
				return <InputNumber addonBefore={field.extra?.addonBefore} placeholder={field.placeholder} style={{width: '100%'}} />

			case "select":
				return <Select options={field.extra?.options} placeholder={field.placeholder} />

			case "checkbox":
				return <Checkbox value={field.initialValue}>{field.label}</Checkbox>

			case "datetime":
				return	<DatePicker
							allowClear={true}
							changeOnBlur={true}
							format={field.extra?.format}
							placeholder={field.placeholder}
							style={{width: '100%'}}
						/>

			case "textArea":
				return <Input.TextArea rows={3} placeholder={field.placeholder} />
			
			case "checkboxGroup":
				return <Checkbox.Group>{field.extra?.options?.map((el, i) => <Checkbox key={`checkbox_${i}`} value={el.value}>{el.label}</Checkbox>)}</Checkbox.Group>
			
			case "radioGroup":
				return <Radio.Group>{field.extra?.options?.map((el, i) => <Radio key={`radio_${i}`} value={el.value}>{el.label}</Radio>)}</Radio.Group>

			default:
				break;
		}
	}

	const onSubmit = (values: object) => {
		// convert all dayjs date to ISOstring
		Object.keys(values).forEach(k => {
			if (dayjs.isDayjs(values[k])) {
				values[k] = (values[k] as unknown as Dayjs).toISOString()
			}
		});
		// send data
		if (endpoint) {
			// call endpoint
			try {
				postContent({
					endpoint: endpoint,
					body: values,
				})
			} catch (err) {
				messageApi.open({key: messageKey, type: 'error', content: 'The operation couldn\'t be completed'});
			}	
		}
		if (prefix) {
			// apply filters
			let filters: DataListFilterType[] = [];
			fields.forEach((field: FieldType, index) => {
				if (Object.values(values)[index] !== undefined) {
					filters = [...filters, {fieldType: field.type, fieldName: field.name, fieldValue: Object.values(values)[index]}]
				}
			})
			dispatch(setFilters(filters))
      		// close panel
			onClose()
		}
	}

	const reset = () => {
		// instead to use resetFields to clear initialValues
		const emptyFields = {};
		fields.forEach(f => {
			emptyFields[f.name] = undefined
		})
		form.setFieldsValue(emptyFields);
	}

	useEffect(() => {
    if (isLoading) {
      messageApi.open({key: messageKey, type: 'loading', content: 'Sending data...'});
    }
  }, [isLoading, messageApi]);

	return (
		<>
			{contextHolder}
			<Form
				form={form}
				layout="vertical"
				onFinish={onSubmit}
				title={title}
				name="formGenerator"
				autoComplete="off"
				initialValues={initialValues}
			>
				{
					fields.map((field, i) => (
						<Form.Item
							key={`FormItem_${i}`}
							label={field.type !== "checkbox" && field.label}
							name={field.name}
							rules={field.required ? [...field.rules, {required: true, message: "Insert a value"}] : field.rules}
							valuePropName={field.type === "checkbox" ? "checked" : undefined}
						>
							{ renderField(field) }
						</Form.Item>
					))
				}
				<Form.Item>
					<Space style={{marginTop: '20px', width: '100%', justifyContent: 'end'}}>
						<Button htmlType="button" onClick={() => reset()}>
							Reset
						</Button>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</>
	)
}

export default FormGenerator;