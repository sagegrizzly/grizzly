import { Checkbox, Form } from 'components';
import { FilterBox } from './FilterBox';

export const Sidebar = () => {
  return (
    <div className='tw-w-[250px] tw-border-r-2 tw-border-solid tw-border-gray-light-3 tw-text-[13px] tw-flex-shrink-0'>
      <FilterBox>
        <Form.CheckboxGroup name='price'>
          <FilterBox.Title>Price</FilterBox.Title>
          <FilterBox.Item>
            <Checkbox label='Option 1' value='option+1' />
          </FilterBox.Item>
          <FilterBox.Item>
            <Checkbox label='Option 2' value='option+2' />
          </FilterBox.Item>
          <FilterBox.Item>
            <Checkbox label='Option 3' value='option+3' />
          </FilterBox.Item>
          <FilterBox.Item>
            <Checkbox label='Option 4' value='option+4' />
          </FilterBox.Item>
        </Form.CheckboxGroup>
      </FilterBox>

      <FilterBox>
        <Form.CheckboxGroup name='batteryType'>
          <FilterBox.Title>Battery Type</FilterBox.Title>
          <FilterBox.Item>
            <Checkbox label='Option 1' value='option+1' />
          </FilterBox.Item>
          <FilterBox.Item>
            <Checkbox label='Option 2' value='option+2' />
          </FilterBox.Item>
          <FilterBox.Item>
            <Checkbox label='Option 3' value='option+3' />
          </FilterBox.Item>
          <FilterBox.Item>
            <Checkbox label='Option 4' value='option+4' />
          </FilterBox.Item>
        </Form.CheckboxGroup>
      </FilterBox>

      <FilterBox>
        <Form.CheckboxGroup name='category'>
          <FilterBox.Title>Category</FilterBox.Title>
          <FilterBox.Item>
            <Checkbox label='Option 1' value='option+1' />
          </FilterBox.Item>
          <FilterBox.Item>
            <Checkbox label='Option 2' value='option+2' />
          </FilterBox.Item>
          <FilterBox.Item>
            <Checkbox label='Option 3' value='option+3' />
          </FilterBox.Item>
          <FilterBox.Item>
            <Checkbox label='Option 4' value='option+4' />
          </FilterBox.Item>
        </Form.CheckboxGroup>
      </FilterBox>

      <FilterBox>
        <Form.CheckboxGroup name='powerSource'>
          <FilterBox.Title>Power Source</FilterBox.Title>
          <FilterBox.Item>
            <Checkbox label='Option 1' value='1' />
          </FilterBox.Item>
          <FilterBox.Item>
            <Checkbox label='Option 2' value='2' />
          </FilterBox.Item>
          <FilterBox.Item>
            <Checkbox label='Option 3' value='3' />
          </FilterBox.Item>
          <FilterBox.Item>
            <Checkbox label='Option 4' value='4' />
          </FilterBox.Item>
        </Form.CheckboxGroup>
      </FilterBox>

      <FilterBox>
        <Form.CheckboxGroup name='voltage'>
          <FilterBox.Title>Voltage</FilterBox.Title>
          <FilterBox.Item>
            <Checkbox label='Option 1' value='1' />
          </FilterBox.Item>
          <FilterBox.Item>
            <Checkbox label='Option 2' value='2' />
          </FilterBox.Item>
          <FilterBox.Item>
            <Checkbox label='Option 3' value='3' />
          </FilterBox.Item>
          <FilterBox.Item>
            <Checkbox label='Option 4' value='4' />
          </FilterBox.Item>
        </Form.CheckboxGroup>
      </FilterBox>
    </div>
  );
};