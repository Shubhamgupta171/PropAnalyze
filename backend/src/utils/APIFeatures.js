class SQLAPIFeatures {
  constructor(tableName, queryString) {
    this.tableName = tableName;
    this.queryString = queryString;
    this.whereClauses = [];
    this.params = [];
    this.sortClause = 'ORDER BY created_at DESC';
    this.limitClause = '';
    this.selectClause = 'SELECT *';
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Simple filtering: key = value or key[op] = value
    Object.keys(queryObj).forEach(key => {
      let val = queryObj[key];
      
      // Handle operators: gte, gt, lte, lt
      if (typeof val === 'object' && val !== null) {
        Object.keys(val).forEach(op => {
          const sqlOp = { gte: '>=', gt: '>', lte: '<=', lt: '<' }[op];
          if (sqlOp) {
            this.params.push(val[op]);
            this.whereClauses.push(`${key} ${sqlOp} $${this.params.length}`);
          }
        });
      } else {
        // Check for key[op] pattern
        const match = key.match(/^(.+)\[(gte|gt|lte|lt)\]$/);
        if (match) {
          const field = match[1];
          const op = match[2];
          const sqlOp = { gte: '>=', gt: '>', lte: '<=', lt: '<' }[op];
          this.params.push(val);
          this.whereClauses.push(`${field} ${sqlOp} $${this.params.length}`);
        } else {
          this.params.push(val);
          this.whereClauses.push(`${key} = $${this.params.length}`);
        }
      }
    });

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').map(field => {
        if (field.startsWith('-')) {
          return `${field.substring(1)} DESC`;
        }
        return `${field} ASC`;
      }).join(', ');
      this.sortClause = `ORDER BY ${sortBy}`;
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(',');
      if (!fields.includes('id')) {
        fields.push('id');
      }
      this.selectClause = `SELECT ${fields.join(', ')}`;
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.limitClause = `LIMIT ${limit} OFFSET ${skip}`;
    return this;
  }

  build() {
    let query = `${this.selectClause} FROM ${this.tableName}`;
    if (this.whereClauses.length > 0) {
      query += ` WHERE ${this.whereClauses.join(' AND ')}`;
    }
    query += ` ${this.sortClause} ${this.limitClause}`;
    return { query, params: this.params };
  }
}

module.exports = SQLAPIFeatures;
