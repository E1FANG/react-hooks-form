import { Select } from "antd";
import { Raw } from "types";

type SelectProps = React.ComponentProps<typeof Select>;

// ant-d中的Select组件的value是number类型，而不是string类型
// 所以需要转换
// 转换规则是，当isNaN(Number(value))为true的时候，代表选择默认类型
// 当选择默认类型的时候，onChange会回调undefined

interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "defaultOptionName" | "options"> {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

/**
 * value可以传入多种类型的值
 * onChange 只会回调number｜undefined 类型
 * 当isNaN(Number(value))为true的时候，代表选择默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 * @param props
 * @constructor
 */

export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={options ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
