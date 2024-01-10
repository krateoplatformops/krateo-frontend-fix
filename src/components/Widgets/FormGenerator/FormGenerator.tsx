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

const FormGenerator = ({title, description, endpoint, prefix, fields }) => {

	const [postContent, { isLoading }] = usePostContentMutation();
	const messageKey = 'formGeneratorMessageKey';
	const [messageApi, contextHolder] = message.useMessage();
	const [form] = Form.useForm();
	const dispatch = useAppDispatch();

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
			const filterValues: DataListFilterType[] = Object.keys(values).map(k => ({fieldName: values[k], fieldValue: k}))
			dispatch(setFilters(filterValues))
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
				title={title}
				name="formGenerator"
				autoComplete="off"
			>
				{
					fields.map(field => (
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