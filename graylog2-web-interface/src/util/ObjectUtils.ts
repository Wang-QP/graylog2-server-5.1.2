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
const ObjectUtils = {
  clone<T>(object: T): T {
    return JSON.parse(JSON.stringify(object));
  },

  isEmpty(object) {
    const keys = Object.keys(object);

    return keys && keys.length === 0;
  },

  trimObjectFields(obj: object, fieldsToTrim: string[]) {
    const newObj = { ...obj };

    if (fieldsToTrim.length > 0) {
      fieldsToTrim.forEach((field) => {
        if (field in obj && typeof obj[field] === 'string') {
          newObj[field] = obj[field].trim();
        }
      });
    }

    return newObj;
  },
};

export default ObjectUtils;
