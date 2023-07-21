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
// eslint-disable-next-line no-restricted-imports
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import React from 'react';
import Reflux from 'reflux';

import { LinkContainer } from 'components/common/router';
import { DocumentTitle, Spinner } from 'components/common';
import PageHeader from 'components/common/PageHeader';
import ExtractorsList from 'components/extractors/ExtractorsList';
import { DropdownButton, MenuItem } from 'components/bootstrap';
import Routes from 'routing/Routes';
import DocsHelper from 'util/DocsHelper';
import withParams from 'routing/withParams';
import { InputsActions } from 'stores/inputs/InputsStore';
import { NodesActions, NodesStore } from 'stores/nodes/NodesStore';

const ExtractorsPage = createReactClass({
  // eslint-disable-next-line react/no-unused-class-component-methods
  displayName: 'ExtractorsPage',

  // eslint-disable-next-line react/no-unused-class-component-methods
  propTypes: {
    params: PropTypes.object.isRequired,
  },

  mixins: [Reflux.listenTo(NodesStore, 'onNodesChange')],

  getInitialState() {
    return {
      node: undefined,
    };
  },

  componentDidMount() {
    const { params } = this.props;

    InputsActions.get(params.inputId).then((input) => this.setState({ input }));
    NodesActions.list();
  },

  // eslint-disable-next-line react/no-unused-class-component-methods
  onNodesChange(nodes) {
    const { params } = this.props;
    const newNode = params.nodeId ? nodes.nodes[params.nodeId] : Object.values(nodes.nodes).filter((node) => node.is_leader)[0];

    const { node } = this.state;

    if (!node || node.node_id !== newNode.node_id) {
      this.setState({ node: newNode });
    }
  },

  _isLoading() {
    const { node, input } = this.state;

    return !(input && node);
  },

  render() {
    if (this._isLoading()) {
      return <Spinner />;
    }

    const { node, input } = this.state;

    return (
      <DocumentTitle title={`${input.title}提取器`}>
        <div>
          <PageHeader title={<span><em>{input.title}</em>提取器</span>}
                      actions={(
                        <DropdownButton bsStyle="info" id="extractor-actions-dropdown" title="操作" pullRight>
                          <LinkContainer to={Routes.import_extractors(node.node_id, input.id)}>
                            <MenuItem>导入提取器</MenuItem>
                          </LinkContainer>
                          <LinkContainer to={Routes.export_extractors(node.node_id, input.id)}>
                            <MenuItem>导出提取器</MenuItem>
                          </LinkContainer>
                        </DropdownButton>
                      )}
                      documentationLink={{
                        title: '提取器文档',
                        path: DocsHelper.PAGES.EXTRACTORS,
                      }}>
            <span>
              提取器应用于该输入接收到的每条消息。
              使用它们可以提取任何文本数据并将其转换为字段，以便稍后进行过滤和分析。
              示例:从日志消息中提取http响应代码，将其转换为数字字段，并将其作为<em>http_response_code</em>附加到消息中。
            </span>
          </PageHeader>
          <ExtractorsList input={input} node={node} />
        </div>
      </DocumentTitle>
    );
  },
});

export default withParams(ExtractorsPage);
