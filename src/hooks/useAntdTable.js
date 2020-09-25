import useRequest from '@ahooksjs/use-request';
import { useState, useCallback, useEffect, useRef } from 'react';
import { usePersistFn, useUpdateEffect } from 'ahooks';

function useAntdTable(service, options) {
  const {
    form,
    refreshDeps = [],
    manual,
    defaultType = 'simple',
    defaultParams,
    ...restOptions
  } = options;
  const result = useRequest(service, {
    ...restOptions,
    paginated: true,
    manual: true,
  });

  const { params, run } = result;

  const cacheFormTableData = params[2] || {};

  // 优先从缓存中读
  const [type, setType] = useState(cacheFormTableData.type || defaultType);

  // 全量 form 数据，包括 simple 和 advance
  const [allFormData, setAllFormData] = useState(
    cacheFormTableData.allFormData || (defaultParams && defaultParams[1]) || {},
  );

  // 获取当前展示的 form 字段值
  const getActivetFieldValues = useCallback(() => {
    if (!form) {
      return {};
    }
    // antd 3
    if (form.getFieldInstance) {
      const tempAllFiledsValue = form.getFieldsValue();
      const filterFiledsValue = {};
      Object.keys(tempAllFiledsValue).forEach(key => {
        if (form.getFieldInstance ? form.getFieldInstance(key) : true) {
          filterFiledsValue[key] = tempAllFiledsValue[key];
        }
      });
      return filterFiledsValue;
    }
    // antd 4
    return form.getFieldsValue(null, () => true);
  }, [form]);

  const formRef = useRef(form);
  formRef.current = form;

  /* 初始化，或改变了 searchType, 恢复表单数据 */
  useEffect(() => {
    if (!formRef.current) {
      return;
    }
    // antd 3
    if (formRef.current.getFieldInstance) {
      // antd 3 需要判断字段是否存在，否则会抛警告
      const filterFiledsValue = {};
      Object.keys(allFormData).forEach(key => {
        if (
          formRef.current.getFieldInstance
            ? formRef.current.getFieldInstance(key)
            : true
        ) {
          filterFiledsValue[key] = allFormData[key];
        }
      });

      formRef.current.setFieldsValue(filterFiledsValue);
    } else {
      // antd 4
      formRef.current.setFieldsValue(allFormData);
    }
  }, [type, !!form]);

  // 首次加载，手动提交。为了拿到 form 的 initial values
  useEffect(() => {
    // 如果有缓存，则使用缓存，重新请求
    if (params.length > 0) {
      run(...params);
      return;
    }

    // 如果没有缓存，触发 submit
    if (!manual) {
      _submit(defaultParams);
    }
  }, []);

  const changeType = useCallback(() => {
    const currentFormData = getActivetFieldValues();
    setAllFormData({ ...allFormData, ...currentFormData });

    const targetType = type === 'simple' ? 'advance' : 'simple';
    setType(targetType);
  }, [type, allFormData, getActivetFieldValues]);

  const _submit = useCallback(
    initParams => {
      setTimeout(() => {
        const activeFormData = getActivetFieldValues();
        // 记录全量数据
        const _allFormData = { ...allFormData, ...activeFormData };
        setAllFormData(_allFormData);
        // has defaultParams
        if (initParams) {
          run(initParams[0], _allFormData, {
            allFormData: _allFormData,
            type,
          });
          return;
        }

        run(
          {
            pageSize: options.defaultPageSize || 10,
            ...(params[0] || {}), // 防止 manual 情况下，第一次触发 submit，此时没有 params[0]
            current: 1,
          },
          activeFormData,
          {
            allFormData: _allFormData,
            type,
          },
        );
      });
    },
    [getActivetFieldValues, run, params, allFormData, type],
  );

  const reset = useCallback(() => {
    if (form) {
      form.resetFields();
    }
    _submit();
  }, [form, _submit]);

  const resetPersistFn = usePersistFn(reset);

  // refreshDeps 变化，reset。
  useUpdateEffect(() => {
    if (!manual) {
      resetPersistFn();
    }
  }, [...refreshDeps]);

  const submit = usePersistFn(e => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    _submit();
  });

  return {
    ...result,
    search: {
      submit,
      type,
      changeType,
      reset,
    },
  };
}

export default useAntdTable;
