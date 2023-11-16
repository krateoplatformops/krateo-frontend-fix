import { useEffect } from "react";
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Space, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { usePostContentMutation } from "../../../features/common/commonApiSlice";

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

const FormGenerator = () => {
  const data: {title: string, description: string, endpoint: string, fields: FieldType[] } = {
		title: "Form Name",
		description: "lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
		endpoint: "/loremipsum/",
		fields: [
			{
				name: "field1",
				type: "text",
				label: "lorem ipsum",
				required: true,
				rules: [
					{
						pattern: /^[A-Za-z]$/,
						message: "Insert a valid value"
					},
				],
				placeholder: "lorem ipsum",
			},
			{
				name: "field2",
				type: "number",
				label: "lorem ipsum",
				rules: [],
				placeholder: "0,00",
				extra: {
					addonBefore: "€"
				}
			},
			{
				name: "field3",
				type: "number",
				label: "lorem ipsum",
				rules: [],
				placeholder: "",
			},
			{
				name: "field4",
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
				name: "field5",
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
				name: "field6",
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
					]
				}
			},
			{
				name: "field7",
				type: "textArea",
				label: "lorem ipsum",
				rules: [],
				placeholder: "lorem ipsum",
				initialValue: "",
			},
			{
				name: "field8",
				type: "checkbox",
				label: "lorem ipsum",
				rules: [],
				placeholder: "",
				initialValue: true,
			},
			{
				name: "field9",
				type: "datetime",
				label: "lorem ipsum",
				rules: [],
				placeholder: "lorem ipsum",
				initialValue: "2023-10-31T10:37Z",
				extra: {
					format: "DD MMM YYYY",
					minDate: "2023-06-01T00:00Z",
					maxDate: "2024-12-01T00:00Z",
				}
			},
		]
	}

	const [postContent, { isLoading }] = usePostContentMutation();
  const messageKey = 'formGeneratorMessageKey';
  const [messageApi, contextHolder] = message.useMessage();
	const [form] = Form.useForm();

	// useEffect(() => {
  //   if (initialValues)
  //     form.setFieldsValue(initialValues)
  // }, [form, initialValues])

	const renderField = (field: FieldType) => {
		switch (field.type) {
			case "text":
				return <Input placeholder={field.placeholder} />
				break;
		
			case "number":
				return <InputNumber addonBefore={field.extra?.addonBefore} placeholder={field.placeholder} style={{width: '100%'}} />
				break;

			case "select":
				return <Select options={field.extra?.options} placeholder={field.placeholder} />
				break;

			case "checkbox":
				return <Checkbox>{field.label}</Checkbox>

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
				return <Checkbox.Group>{field.extra?.options?.map(el => <Checkbox value={el.value}>{el.label}</Checkbox>)}</Checkbox.Group>
			
			case "radioGroup":
				return <Radio.Group>{field.extra?.options?.map(el => <Radio value={el.value}>{el.label}</Radio>)}</Radio.Group>

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
		try {
			postContent({
				endpoint: data.endpoint,
				body: values,
			})
		} catch (err) {
      messageApi.open({key: messageKey, type: 'error', content: 'The operation couldn\'t be completed'});
		}
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
				title={data.title}
				name="formGenerator"
				autoComplete="off"
			>
				{
					data.fields.map(field => (
						<Form.Item
							label={field.type !== "checkbox" && field.label}
							name={field.name}
							rules={field.required ? [...field.rules, {required: true, message: "Insert a value"}] : field.rules}
						>
							{ renderField(field) }
						</Form.Item>
					))
				}
				<Form.Item>
					<Space style={{marginTop: '20px', width: '100%', justifyContent: 'end'}}>
						<Button htmlType="button" onClick={() => form.resetFields()}>
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