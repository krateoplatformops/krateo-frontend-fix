import { Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Upload } from "antd";

type FieldType = {
	name: string,
	type: "text" | "number" | "select" | "radioGroup" | "checkboxGroup" | "checkbox" | "textArea" | "datetime" | "file",
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

const FormGenerator = () => {
  const data: {title: string, fields: FieldType[] } = {
		title: "Name and description",
		fields: [
			{
				name: "lorem",
				type: "text",
				label: "lorem ipsum",
				rules: [
					{
						pattern: /\S/,
						message: "This is a required field"
					},
					{
						pattern: /^[A-Za-z]$/,
						message: "Insert a valid value"
					},
				],
				placeholder: "lorem ipsum",
			},
			{
				name: "lorem",
				type: "number",
				label: "lorem ipsum",
				rules: [],
				placeholder: "0,00",
				extra: {
					addonBefore: "€"
				}
			},
			{
				name: "lorem",
				type: "number",
				label: "lorem ipsum",
				rules: [],
				placeholder: "",
			},
			{
				name: "lorem",
				type: "select",
				label: "lorem ipsum",
				rules: [],
				placeholder: "",
				extra: {
					options: [
						{
							label: "lorem ipsum",
							value: 0,
						},
						{
							label: "lorem ipsum",
							value: 1,
						}
					]
				}
			},
			{
				name: "lorem",
				type: "radioGroup",
				label: "lorem ipsum",
				rules: [],
				placeholder: "",
				initialValue: 0,
				extra: {
					options: [
						{
							label: "lorem ipsum",
							value: 0,
						},
						{
							label: "lorem ipsum",
							value: 1,
						}
					]
				}
			},
			{
				name: "lorem",
				type: "checkboxGroup",
				label: "lorem ipsum",
				rules: [],
				placeholder: "",
				initialValue: [0,2],
				extra: {
					options: [
						{
							label: "lorem ipsum",
							value: 0,
						},
						{
							label: "lorem ipsum",
							value: 1,
						},
						{
							label: "lorem ipsum",
							value: 2,
						}
					]
				}
			},
			{
				name: "lorem",
				type: "checkbox",
				label: "lorem ipsum",
				rules: [],
				placeholder: "",
				initialValue: true,
			},
			{
				name: "lorem",
				type: "textArea",
				label: "lorem ipsum",
				rules: [],
				placeholder: "lorem ipsum",
				initialValue: "",
			},
			{
				name: "lorem",
				type: "datetime",
				label: "lorem ipsum",
				rules: [],
				placeholder: "lorem ipsum",
				initialValue: "2023-10-31T10:37Z",
				extra: {
					format: "DD MMM YYYY HH:mm",
					minDate: "2023-06-01T00:00Z",
					maxDate: "2024-12-01T00:00Z",
				}
			},
			{
				name: "lorem",
				type: "file",
				label: "lorem ipsum",
				rules: [],
				placeholder: "lorem ipsum",
				initialValue: "2023-10-31T10:37Z",
				extra: {
					accepted: ".doc,.pdf,.png",
					multiple: true,
					maxSize: 1048576,
					maxCount: 3
				}
			}
		]
	}
// "radioGroup" | "checkboxGroup" | "checkbox" | "textArea" | "datetime" | "file"
	const renderField = (field: FieldType) => {
		switch (field.type) {
			case "text":
				return <Input placeholder={field.placeholder} />
				break;
		
			case "number":
				return <InputNumber placeholder={field.placeholder} />
				break;

			case "select":
				return <Select options={field.extra?.options} placeholder={field.placeholder} />
				break;

			case "checkbox":
				return <Checkbox />

			case "datetime":
				return <DatePicker format={field.extra?.format} placeholder={field.placeholder} />

			case "textArea":
				return <Input.TextArea rows={3} placeholder={field.placeholder} />
			
			case "checkboxGroup":
				return <Checkbox.Group>{field.extra?.options?.map(el => <Checkbox value={el.value}>{el.label}</Checkbox>)}</Checkbox.Group>
			
			case "radioGroup":
				return <Radio.Group>{field.extra?.options?.map(el => <Radio value={el.value}>{el.label}</Radio>)}</Radio.Group>

			case "file":
				return <Upload />

			default:
				break;
		}
	}

	return (
		<Form
			layout="vertical"
			onFinish={() => {}}
			title={data.title}
		>
			{
				data.fields.map(field => (
					<Form.Item
						label={field.label}
						name={field.name}
						rules={field.rules}
					>
						{/* { renderField(field) } */}
					</Form.Item>
				))
			}
		</Form>
	)
}

export default FormGenerator;