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
import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import type { List as ImmutableList } from 'immutable';

import type FieldTypeMapping from 'views/logic/fieldtypes/FieldTypeMapping';
import FieldTypesContext from 'views/components/contexts/FieldTypesContext';
import { Button } from 'components/bootstrap';
import useActiveQueryId from 'views/hooks/useActiveQueryId';

import List from './List';
import FieldGroup from './FieldGroup';

type Props = {
  activeQueryFields: ImmutableList<FieldTypeMapping>,
  allFields: ImmutableList<FieldTypeMapping>,
};

const Container = styled.div`
  white-space: break-spaces;
  height: 100%;
  display: grid;
  display: -ms-grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr;
  -ms-grid-columns: 1fr;
  -ms-grid-rows: max-content 1fr;

  > *:nth-child(1) {
    grid-column: 1;
    -ms-grid-column: 1;
    grid-row: 1;
    -ms-grid-row: 1;
  }

  > *:nth-child(2) {
    grid-column: 1;
    -ms-grid-column: 1;
    grid-row: 2;
    -ms-grid-row: 2;
  }
`;

const FilterForm = styled.form`
  display: flex;
`;

const FilterInputWrapper = styled.div`
  margin-right: 5px;
`;

const FilterInput = styled.input`
  width: 100%;
`;

const FieldGroups = styled.div`
  margin-top: 5px;
  margin-bottom: 0;
`;

const FieldsOverview = ({ allFields, activeQueryFields }: Props) => {
  const [currentGroup, setCurrentGroup] = useState('current');
  const [filter, setFilter] = useState(undefined);
  const handleSearch = (e) => setFilter(e.target.value);
  const handleSearchReset = () => setFilter(undefined);

  return (
    <Container>
      <div>
        <FilterForm onSubmit={(e) => e.preventDefault()}>
          <FilterInputWrapper className="form-group has-feedback">
            <FilterInput id="common-search-form-query-input"
                         className="query form-control"
                         onChange={handleSearch}
                         value={filter || ''}
                         placeholder="过滤字段"
                         type="text"
                         autoComplete="off"
                         spellCheck="false" />
          </FilterInputWrapper>
          <div className="form-group">
            <Button type="reset" className="reset-button" onClick={handleSearchReset}>
              重置
            </Button>
          </div>
        </FilterForm>
        <FieldGroups>
          列出{' '}
          <FieldGroup selected={currentGroup === 'current'}
                      group="current"
                      text="当前查询"
                      title="这将显示当前查询中出现的字段。"
                      onSelect={setCurrentGroup} />
          {', '}
          <FieldGroup selected={currentGroup === 'all'}
                      group="all"
                      text="全部"
                      title="这将显示所有字段，但不显示保留(gl2_*)字段。"
                      onSelect={setCurrentGroup} />
          {' 或 '}
          <FieldGroup onSelect={setCurrentGroup}
                      selected={currentGroup === 'allreserved'}
                      group="allreserved"
                      text="全部包括保留"
                      title="这将显示所有字段，包括保留的(gl2_*)字段。" />
          {' 字段。'}
        </FieldGroups>
        <hr />
      </div>
      <List filter={filter}
            activeQueryFields={activeQueryFields}
            allFields={allFields}
            currentGroup={currentGroup} />
    </Container>
  );
};

const FieldsOverviewWithContext = (props) => {
  const activeQuery = useActiveQueryId();

  return (
    <FieldTypesContext.Consumer>
      {(fieldTypes) => {
        const allFields = fieldTypes?.all;
        const queryFields = fieldTypes?.queryFields;
        const activeQueryFields = queryFields?.get(activeQuery, allFields);

        return <FieldsOverview {...props} allFields={allFields} activeQueryFields={activeQueryFields} />;
      }}
    </FieldTypesContext.Consumer>
  );
};

export default FieldsOverviewWithContext;
