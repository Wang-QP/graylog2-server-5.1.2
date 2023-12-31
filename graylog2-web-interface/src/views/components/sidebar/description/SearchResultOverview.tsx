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
import PropTypes from 'prop-types';
import numeral from 'numeral';

import { Timestamp } from 'components/common';

type Props = {
  results: {
    timestamp?: string,
    duration?: number,
  },
};

const SearchResultOverview = ({ results: { timestamp, duration } }: Props) => {
  if (!timestamp || !duration) {
    return <i>尚未执行任何查询。</i>;
  }

  return (
    <span>
      执行查询花了 {numeral(duration).format('0,0')}ms 在 <Timestamp dateTime={timestamp} />.
    </span>
  );
};

SearchResultOverview.propTypes = {
  results: PropTypes.object.isRequired,
};

export default SearchResultOverview;
