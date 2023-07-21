/*
 * Copyright (C) 2020 Graylog, Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Server Side Public License, version 1,
 * as published by MongoDB, Inc.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Server Side Public License for more details.
 *
 * You should have received a copy of the Server Side Public License
 * along with this program. If not, see
 * <http://www.mongodb.com/licensing/server-side-public-license>.
 */
import React from 'react';
import styled from 'styled-components';

import { Button, ButtonGroup } from 'components/bootstrap';
import { Icon, HoverForHelp } from 'components/common';
import type { SearchBarControl } from 'views/types';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButtonGroup = styled(ButtonGroup)`
  margin-left: 5px;
`;

const StyledButtonBar = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SearchFilterHelp = styled(HoverForHelp)`
  margin-left: 5px;
`;

export const SearchFilterExplanation = () => (
  <>
    <p>
      <i>搜索过滤</i> 包含自己的查询，并支持使用 <b>AND</b> 运算符.
    </p>
    <p>
      过滤器可以单独保存，并在保存的搜索和仪表板中重用。
      更新已保存的筛选器将自动影响包含该筛选器的搜索结果。
    </p>
  </>
);

type Props = {
  onHide: () => void,
  pluggableControls: Array<SearchBarControl>
}

const SearchFilterBanner = ({ onHide, pluggableControls }: Props) => {
  const hasSearchFiltersPlugin = !!pluggableControls.find((control) => control.id === 'search-filters');

  if (hasSearchFiltersPlugin) {
    return null;
  }

  return (
    <Container>
      过滤
      <SearchFilterHelp title="搜索过滤" trigger={['click']}>
        <SearchFilterExplanation />
        <p>
          企业版提供搜索过滤器和参数。
        </p>
        <StyledButtonBar>
          <Button onClick={onHide} bsSize="xs">
            隐藏控件
          </Button>
        </StyledButtonBar>
      </SearchFilterHelp>
      <StyledButtonGroup>
        <Button disabled bsSize="small">
          <Icon name="plus" />
        </Button>
        <Button disabled bsSize="small">
          <Icon name="folder" />
        </Button>
      </StyledButtonGroup>
    </Container>
  );
};

export default SearchFilterBanner;
