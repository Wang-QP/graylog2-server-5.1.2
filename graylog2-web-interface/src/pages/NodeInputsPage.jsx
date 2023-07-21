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
import PropTypes from 'prop-types';
import React from 'react';
// eslint-disable-next-line no-restricted-imports
import createReactClass from 'create-react-class';
import Reflux from 'reflux';

import { Link } from 'components/common/router';
import { DocumentTitle, PageHeader, Spinner } from 'components/common';
import { InputsList } from 'components/inputs';
import Routes from 'routing/Routes';
import withParams from 'routing/withParams';
import { CurrentUserStore } from 'stores/users/CurrentUserStore';
import { InputStatesStore } from 'stores/inputs/InputStatesStore';
import { NodesStore } from 'stores/nodes/NodesStore';

function nodeFilter(state) {
  return state.nodes ? state.nodes[this.props.params.nodeId] : state.nodes;
}

const NodeInputsPage = createReactClass({
  // eslint-disable-next-line react/no-unused-class-component-methods
  displayName: 'NodeInputsPage',

  // eslint-disable-next-line react/no-unused-class-component-methods
  propTypes: {
    // eslint-disable-next-line react/no-unused-prop-types
    params: PropTypes.object.isRequired,
  },

  mixins: [Reflux.connect(CurrentUserStore), Reflux.connectFilter(NodesStore, 'node', nodeFilter)],

  componentDidMount() {
    this.interval = setInterval(InputStatesStore.list, 2000);
  },

  componentWillUnmount() {
    clearInterval(this.interval);
  },

  _isLoading() {
    return !this.state.node;
  },

  render() {
    if (this._isLoading()) {
      return <Spinner />;
    }

    const title = <span>{this.state.node.short_node_id} / {this.state.node.hostname} 节点输入</span>;

    return (
      <DocumentTitle title={`${this.state.node.short_node_id} / ${this.state.node.hostname} 节点输入`}>
        <div>
          <PageHeader title={title}>
            <span>
              Graylog节点通过输入接受数据。在这个页面上，您可以看到哪些输入正在这个特定节点上运行。
              您可以在<Link to={Routes.SYSTEM.INPUTS}>这里</Link>启动和终止集群上的输入。
            </span>
          </PageHeader>
          <InputsList permissions={this.state.currentUser.permissions} node={this.state.node} />
        </div>
      </DocumentTitle>
    );
  },
});

export default withParams(NodeInputsPage);
