import React from 'react';
import {
  Form,
  Select,
  DatePicker,
  Row,
  Col,
  Input,
  Checkbox,
  Radio,
  Button,
  Icon,
} from 'antd';
import GenerateForm from '../GenerateForm';
import styles from './index.less';

const formItemLayout = {
  style: {
    width: '100%',
    marginBottom: 0,
    display: 'flex',
  },
  labelCol: {
    style: { width: '115px' },
  },
  wrapperCol: {
    style: { flexGrow: 1 },
  },
};

const { Option } = Select;
const { RangePicker } = DatePicker;

const mapTypeToComponent = {
  input: {
    WrappedComponent: Input,
  },
  select: {
    WrappedComponent: Select,
    SubComponent: Option,
  },
  rangepicker: {
    WrappedComponent: RangePicker,
  },
  checkbox: {
    WrappedComponent: Checkbox.Group,
  },
  radio: {
    WrappedComponent: Radio.Group,
  },
};

class ListFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      needOpen: false,
      isOpen: false,
      openCol: this.props.isOpen !== undefined, // 是否外部受控
    };
  }

  /* 搜索*/
  onSearch = () => {
    this.listFilter.verify((error, values) => {
      if (error) {
        return;
      }
      this.props.onSearch && this.props.onSearch(values);
    });
  };

  /* 重置*/
  onReset = () => {
    this.getForm().resetFields();

    /* 对外暴露reset方法*/
    this.props.onReset && this.props.onReset();
  };

  /* 对外暴露Form的实例*/
  getForm = () => {
    return this.listFilter.getForm();
  };

  /**
   * 展开收起
   */
  openOptions = () => {
    const { openCol, isOpen } = this.state;
    if (openCol) {
      this.props.setOpen(!this.props.isOpen);
    } else {
      this.setState({
        isOpen: !isOpen,
      });
    }
  };

  /**
   * 提交
   */
  handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { onSearch } = this.props;
        if (onSearch) {
          onSearch(values);
        }
      }
    });
  }

  /**
   * 重置
   */
  handelSearchClear() {
    this.props.form.resetFields();
    this.handleSubmit();
  }

  /**
   * 切换
   */
  outherSetChange = () => {
    setTimeout(() => {
      this.handleSubmit();
    });
  };

  getLength(array) {
    let total = 0;
    array.forEach(item => {
      total += item.span ? item.span : 6;
    });
    return total / 6;
  }

  componentDidMount() {
    if (this.props.formSet) {
      const len = this.getLength(this.props.formSet);
      this.setState({
        needOpen: len > 8,
      });
      if (this.props.formData) {
        const fields = {};
        Object.keys(this.props.formData).forEach(key => {
          if (this.props.formData[key] !== undefined) {
            fields[key] = {
              value: this.props.formData[key],
            };
          }
        });
        this.props.form.setFields(fields);
      }
    }
  }

  render() {
    const {
      className = '',
      btnsClassName = '',
      filters,
      hasSearchBtn = true,
      hasResetBtn = true,
      searchBtnText = '查询' /* 搜索按钮文案*/,
      resetBtnText = '清除' /* 清除按钮文案*/,
    } = this.props;

    /* 搜索列表如果没有设置, 默认为一行3个*/
    if (filters) {
      filters.forEach(item => {
        if (!item.span) {
          item.span = 8;
        }
      });
    }

    const { needOpen, openCol } = this.state;
    const { formSet, form, outherSet, resetBtn = true } = this.props;
    const isOpen = openCol ? this.props.isOpen : this.state.isOpen;
    const { getFieldDecorator } = form;
    const Buttons = (
      <Form.Item {...formItemLayout}>
        <div>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          {resetBtn && (
            <Button
              style={{ marginLeft: '12px' }}
              onClick={() => this.handelSearchClear()}
            >
              重置
            </Button>
          )}
          {needOpen && (
            <>
              <a
                style={{
                  fontSize: '14px',
                  color: '#2B82D8',
                  marginLeft: '8px',
                }}
                onClick={this.openOptions}
              >
                {isOpen ? '收起' : '展开'}
              </a>
              <Icon
                type={isOpen ? 'up' : 'down'}
                style={{ fontSize: '14px', color: '#2B82D8' }}
                onClick={this.openOptions}
              />
            </>
          )}
        </div>
      </Form.Item>
    );

    let list = [];
    if (formSet) {
      if (this.getLength(formSet) === 8) {
        list = formSet;
      } else if (isOpen) {
        list = formSet;
      } else {
        list = formSet.slice(0, 7);
      }
    }
    const len = this.getLength(list);

    return (
      <div>
        {filters ? (
          <div>
            <div className={`${styles.listFilterWrap} ${className}`}>
              <GenerateForm
                formSet={filters}
                wrappedComponentRef={el => (this.listFilter = el)}
              />
              <div className={`${styles.btnGroup} ${btnsClassName}`}>
                {hasSearchBtn && (
                  <Button type="primary" onClick={this.onSearch}>
                    {searchBtnText}
                  </Button>
                )}
                {hasResetBtn && (
                  <Button type="default" onClick={this.onReset}>
                    {resetBtnText}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Form
            onSubmit={this.handleSubmit.bind(this)}
            className={styles.listFilter}
          >
            <Row gutter={20} className={styles.form}>
              {list.map(item => {
                const {
                  label, // ant design Form原生表单项label
                  type, // 组件类型
                  options = {}, // ant design Form原生表单项options
                  name, // ant design Form原生name属性
                  props, // 外部传入给组件的属性
                  span = 6,
                } = item;
                const { WrappedComponent } = mapTypeToComponent[
                  type.toLowerCase()
                ];

                if (type === 'select') {
                  const { SubComponent } = mapTypeToComponent[
                    type.toLowerCase()
                  ];
                  const subOptionsData = item.dataOptions || [];
                  const { models } = item;
                  const [valueKey = 'value', labelKey = 'label'] = models || [];

                  return (
                    <Col md={span} sm={24} key={name}>
                      <Form.Item {...formItemLayout} label={label}>
                        {getFieldDecorator(
                          name,
                          options,
                        )(
                          <WrappedComponent {...props}>
                            {subOptionsData.length > 0 &&
                              subOptionsData.map((v, i) => (
                                <SubComponent key={i} value={v[valueKey]}>
                                  {v[labelKey]}
                                </SubComponent>
                              ))}
                          </WrappedComponent>,
                        )}
                      </Form.Item>
                    </Col>
                  );
                }

                return (
                  <Col md={span} sm={24} key={name}>
                    <Form.Item {...formItemLayout} label={label}>
                      {getFieldDecorator(
                        name,
                        options,
                      )(<WrappedComponent {...props} />)}
                    </Form.Item>
                  </Col>
                );
              })}
              {len % 4 !== 0 && (
                <Col md={6} sm={24}>
                  {Buttons}
                </Col>
              )}
            </Row>

            {/* 表单个数是4的倍数时，单独一行 */}
            {len % 4 === 0 && (
              <Row gutter={20}>
                <Col md={24} sm={24} style={{ textAlign: 'right' }}>
                  {Buttons}
                </Col>
              </Row>
            )}
            {outherSet && outherSet.length > 0 && (
              <div className={styles.otherForm}>
                <div>
                  {outherSet.map(item => {
                    const {
                      label, // ant design Form原生表单项label
                      type, // 组件类型
                      options = {}, // ant design Form原生表单项options
                      name, // ant design Form原生name属性
                      props, // 外部传入给组件的属性
                      dataOptions,
                      isShow = true, // 是否显示
                    } = item;
                    const { WrappedComponent } = mapTypeToComponent[
                      type.toLowerCase()
                    ];
                    const { models } = item;
                    let listOptions;
                    if (models) {
                      const [valueKey = 'value', labelKey = 'label'] =
                        models || [];
                      listOptions = dataOptions.map(opt => ({
                        value: opt[valueKey],
                        label: opt[labelKey],
                      }));
                    } else {
                      listOptions = dataOptions;
                    }
                    return isShow ? (
                      <Form.Item label={label} key={name}>
                        {getFieldDecorator(
                          name,
                          options,
                        )(
                          <WrappedComponent
                            onChange={this.outherSetChange}
                            {...props}
                            options={listOptions}
                          />,
                        )}
                      </Form.Item>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </Form>
        )}
      </div>
    );
  }
}

export default Form.create()(ListFilter);
