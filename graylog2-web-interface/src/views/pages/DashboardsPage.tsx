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

import { LinkContainer } from 'components/common/router';
import { Col, Row, Button } from 'components/bootstrap';
import { DocumentTitle, PageHeader, IfPermitted } from 'components/common';
import Routes from 'routing/Routes';
import DocsHelper from 'util/DocsHelper';
import DashboardsOverview from 'views/components/dashboard/DashboardsOverview';

const DashboardsPage = () => (
  <DocumentTitle title="仪表板">
    <PageHeader title="仪表板"
                actions={(
                  <IfPermitted permissions="dashboards:create">
                    <LinkContainer to={Routes.pluginRoute('DASHBOARDS_NEW')}>
                      <Button bsStyle="success">创建新的仪表板</Button>
                    </LinkContainer>
                  </IfPermitted>
                )}
                documentationLink={{
                  title: '仪表板文档',
                  path: DocsHelper.PAGES.DASHBOARDS,
                }}>
      <span>
        使用仪表板创建消息的特定视图。在这里创建一个新的仪表板，并添加任何图形或
        您在graylog的其他部分创建的图表，只需单击一下。
      </span>
    </PageHeader>

    <Row className="content">
      <Col md={12}>
        <DashboardsOverview />
      </Col>
    </Row>
  </DocumentTitle>
);

export default DashboardsPage;
