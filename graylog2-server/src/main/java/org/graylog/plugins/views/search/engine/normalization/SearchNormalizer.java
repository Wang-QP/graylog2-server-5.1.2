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
package org.graylog.plugins.views.search.engine.normalization;

import com.google.common.collect.ImmutableSet;
import org.graylog.plugins.views.search.ParameterProvider;
import org.graylog.plugins.views.search.Query;
import org.graylog.plugins.views.search.Search;

public interface SearchNormalizer {

    Query normalizeQuery(final Query query, final ParameterProvider parameterProvider);

    default Search normalize(final Search search) {
        final ImmutableSet<Query> newQueries = search.queries().stream()
                .map(query -> normalizeQuery(query, search))
                .collect(ImmutableSet.toImmutableSet());
        return search.toBuilder().queries(newQueries).build();
    }
}
