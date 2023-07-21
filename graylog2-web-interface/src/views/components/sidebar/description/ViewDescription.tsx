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
import PropTypes from 'prop-types';

import type QueryResult from 'views/logic/QueryResult';
import { Icon } from 'components/common';
import ViewTypeLabel from 'views/components/ViewTypeLabel';
import useViewType from 'views/hooks/useViewType';
import useViewMetadata from 'views/hooks/useViewMetadata';

import SearchResultOverview from './SearchResultOverview';

import SectionInfo from '../SectionInfo';
import SectionSubheadline from '../SectionSubheadline';

type Props = {
  results: QueryResult,
};

const ViewDescription = ({ results }: Props) => {
  const viewMetadata = useViewMetadata();
  const isAdHocSearch = !viewMetadata.id;
  const viewType = useViewType();
  const viewTypeLabel = viewType ? ViewTypeLabel({ type: viewType }) : '';
  const resultsSection = (
    <>
      <SectionSubheadline>
        执行
      </SectionSubheadline>
      <p>

        <SearchResultOverview results={results} />
      </p>
    </>
  );

  if (isAdHocSearch) {
    return (
      <>
        <SectionInfo>保存搜索或将其导出到仪表板，以添加自定义摘要和描述。</SectionInfo>
        {resultsSection}
      </>
    );
  }

  return (
    <>
      {(!viewMetadata.summary || !viewMetadata.description) && (
        <SectionInfo>
          要为该{viewTypeLabel}添加描述和摘要，请单击搜索栏中的<Icon name="ellipsis-h" />图标以打开其操作菜单。操作菜单包括&quot;编辑元数据&quot;选项。
        </SectionInfo>
      )}
      {resultsSection}
      <SectionSubheadline>
        搜索
      </SectionSubheadline>
      <p>
        {viewMetadata.summary || <i>这个{viewTypeLabel}没有摘要。</i>}
      </p>
      <p>
        {viewMetadata.description || <i>这个{viewTypeLabel}没有描述。</i>}
      </p>
    </>
  );
};

ViewDescription.propTypes = {
  results: PropTypes.object.isRequired,
};

export default ViewDescription;
