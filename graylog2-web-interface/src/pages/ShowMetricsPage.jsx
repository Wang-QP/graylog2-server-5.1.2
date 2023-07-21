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

import { DocumentTitle, PageHeader, Spinner } from 'components/common';
import { MetricsComponent } from 'components/metrics';
import withParams from 'routing/withParams';
import withLocation from 'routing/withLocation';
import { MetricsActions, MetricsStore } from 'stores/metrics/MetricsStore';
import { NodesStore } from 'stores/nodes/NodesStore';

const ShowMetricsPage = createReactClass({
  // eslint-disable-next-line react/no-unused-class-component-methods
  displayName: 'ShowMetricsPage',

  // eslint-disable-next-line react/no-unused-class-component-methods
  propTypes: {
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  },

  mixins: [Reflux.connect(NodesStore), Reflux.connect(MetricsStore), Reflux.listenTo(NodesStore, '_getMetrics')],

  // eslint-disable-next-line react/no-unused-class-component-methods
  _getMetrics() {
    MetricsActions.names();
  },

  render() {
    if (!this.state.nodes || !this.state.metricsNames) {
      return <Spinner />;
    }

    let { nodeId } = this.props.params;

    // "leader" node ID is a placeholder for leader node, get first leader node ID
    if (nodeId === 'leader' || nodeId === 'master') { // `master` is deprecated but we still support it here
      const nodeIDs = Object.keys(this.state.nodes);
      const leaderNodes = nodeIDs.filter((nodeID) => this.state.nodes[nodeID].is_leader);

      nodeId = leaderNodes[0] || nodeIDs[0];
    }

    const { metricsNames, metricsErrors } = this.state;

    const node = this.state.nodes[nodeId];
    const title = <span>节点指标 {node.short_node_id} / {node.hostname}</span>;
    const { namespace } = MetricsStore;
    const names = metricsNames[nodeId];
    const error = metricsErrors ? metricsErrors[nodeId] : undefined;
    const { filter } = this.props.location.query;

    return (
      <DocumentTitle title={`${node.short_node_id} / ${node.hostname} 节点指标`}>
        <span>
          <PageHeader title={title}>
            <span>
              所有graylog节点都提供一组用于诊断、调试和监控的内部指标。注意，您可以访问所有的度量也都通过JMX。<br />
              该节点总共报告 {(names || []).length} 个指标。
            </span>
          </PageHeader>

          <MetricsComponent names={names} namespace={namespace} nodeId={nodeId} filter={filter} error={error} />
        </span>
      </DocumentTitle>
    );
  },
});

export default withParams(withLocation(ShowMetricsPage));
