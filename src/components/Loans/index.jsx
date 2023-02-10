import { Form, Input, Button, Divider, Select } from '@arco-design/web-react';
import { IconDelete } from '@arco-design/web-react/icon';

const defaultLoan = {
  amount: 1000000,
  interestRate: 4.35,
  count: 300,
  type: '1',
};

export default (props) => {
  const { loans, onChange } = props;
  const [form] = Form.useForm();

  const handleValuesChange = (_, values) => {
    onChange?.(values);
  }

  return (
    <Form
      style={{padding: 16, boxSizing: 'border-box'}}
      form={form}
      labelCol={{span: 180}}
      wrapperCol={{flex: 1}}
      layout="horizontal"
      autoComplete="off"
      initialValues={{
        loans,
      }}
      onValuesChange={handleValuesChange}
    >
      <Form.List field='loans'>
        {(fields, { add, remove, move }) => {
          return (
            <>
              {fields.map((item, index) => {
                return (
                  <div key={item.key}>
                    <Divider style={{marginTop: 0}}>
                      贷款{index + 1}&nbsp;&nbsp;
                      <Button
                        icon={<IconDelete />}
                        status="danger"
                        size="mini"
                        shape="circle"
                        onClick={() => remove(index)}
                      />
                    </Divider>
                    <Form.Item field={`${item.field}.type`} label="贷款类型">
                      <Select>
                        <Select.Option value="1">等额本息</Select.Option>
                        <Select.Option value="2">等额本金</Select.Option>
                        <Select.Option value="3">公积金自由还款</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item field={`${item.field}.amount`} label="剩余贷款">
                      <Input placeholder="请输入剩余贷款金额" addAfter="元" />
                    </Form.Item>
                    <Form.Item field={`${item.field}.interestRate`} label="贷款利率" normalize={(v) => parseFloat(v) || undefined}>
                      <Input placeholder="请输入贷款利率" addAfter="%" />
                    </Form.Item>
                    <Form.Item field={`${item.field}.count`} label="剩余期数" normalize={(v) => parseFloat(v) || undefined}>
                      <Input placeholder="请输入剩余期数" addAfter="月" />
                    </Form.Item>
                    <Form.Item noStyle shouldUpdate={(prev, next) => prev.type !== next.type}>
                      {(values) => {
                        return values.loans[index].type === '3' ? (
                          <Form.Item field={`${item.field}.expend`} label="月均还款" normalize={(v) => parseFloat(v) || undefined}>
                            <Input placeholder="请输入月均还款" addAfter="元" />
                          </Form.Item>
                        ) : null;
                      }}
                    </Form.Item>
                  </div>
                );
              })}
              <Form.Item>
                <Button long type="dashed" onClick={() => add(defaultLoan)}>添加贷款</Button>
              </Form.Item>
            </>
          );
        }}
      </Form.List>
    </Form>
  );
}
