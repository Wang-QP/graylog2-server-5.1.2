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
import { useContext, useState } from 'react';

import { DEFAULT_HIGHLIGHT_COLOR } from 'views/Constants';
import HighlightingRulesContext from 'views/components/contexts/HighlightingRulesContext';
import IconButton from 'components/common/IconButton';

import HighlightingRule, { HighlightingRuleGrid, RuleContainer } from './HighlightingRule';
import ColorPreview from './ColorPreview';
import HighlightForm from './HighlightForm';

import SectionInfo from '../SectionInfo';
import SectionSubheadline from '../SectionSubheadline';

const HighlightingRules = () => {
  const [showForm, setShowForm] = useState(false);
  const rules = useContext(HighlightingRulesContext) ?? [];

  return (
    <>
      <SectionInfo>
        可以突出显示搜索词和字段值。在结果中突出显示您的搜索查询可以在graylog服务器配置中启用/禁用。
        任何字段值都可以通过单击该值并选择来突出显示&quot;该高亮值&quot;。
        如果一个词或值有多个规则，则使用最后一个匹配的规则。
      </SectionInfo>
      <SectionSubheadline>活跃亮点 <IconButton className="pull-right" name="plus" onClick={() => setShowForm(!showForm)} /> </SectionSubheadline>
      {showForm && <HighlightForm onClose={() => setShowForm(false)} />}
      <HighlightingRuleGrid>
        <ColorPreview color={DEFAULT_HIGHLIGHT_COLOR} />
        <RuleContainer>搜索词</RuleContainer>
      </HighlightingRuleGrid>
      {rules.map((rule) => <HighlightingRule key={`${rule.field}-${rule.value}-${rule.color}-${rule.condition}`} rule={rule} />)}
    </>
  );
};

export default HighlightingRules;
