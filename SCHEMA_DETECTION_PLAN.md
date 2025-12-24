# Table Schema Change Detection System - Implementation Plan

## ✅ ĐÃ TẠO (Completed)

### 1. Entities
- `table-name.entity.ts` - Lưu snapshots/versions của table schemas
- `table-detail.entity.ts` - Lưu từng thay đổi cụ thể (add/modify/delete)

### 2. Interfaces & DTOs
- `schema.interface.ts` - Định nghĩa structures cho column, index, foreign key, table schema
- `export-table.dto.ts` - DTOs cho các operations

### 3. Services
- `schema-introspection.service.ts` - Query INFORMATION_SCHEMA để lấy thông tin table/column/index/constraints

## 🔄 ĐANG LÀM (In Progress)

### 4. Schema Comparison Service
File: `schema-comparison.service.ts`

**Chức năng:**
- So sánh 2 table schemas (old vs new)
- Detect thay đổi về:
  - ✅ Tables (added/deleted)
  - ✅ Columns (added/modified/deleted)
  - ✅ Indexes (added/deleted)
  - ✅ Unique constraints (added/deleted)
  - ✅ Foreign keys (added/modified/deleted)
  - ✅ Column attributes (data type, nullable, default, etc.)

**Output:** Array of `SchemaChange` objects

### 5. DDL Generator Service
File: `ddl-generator.service.ts`

**Chức năng:**
- Generate SQL DDL statements từ `SchemaChange` objects
- Support MySQL syntax:
  ```sql
  ALTER TABLE `table_name` ADD COLUMN `column_name` VARCHAR(255) NOT NULL;
  ALTER TABLE `table_name` MODIFY COLUMN `column_name` INT(11) DEFAULT NULL;
  ALTER TABLE `table_name` DROP COLUMN `column_name`;
  ALTER TABLE `table_name` ADD INDEX `idx_name` (`column_name`);
  ALTER TABLE `table_name` ADD UNIQUE KEY `uk_name` (`column_name`);
  ALTER TABLE `table_name` ADD CONSTRAINT `fk_name` FOREIGN KEY (`col`) REFERENCES `ref_table`(`ref_col`);
  ```

### 6. Table Service
File: `table.service.ts`

**Chức năng:**
- Business logic layer
- CRUD operations cho table_names và table_name_histories
- Export table changes workflow:
  1. Get current schema từ database
  2. Get previous snapshot từ table_names
  3. Compare và detect changes
  4. Generate DDL scripts
  5. Save changes vào table_name_histories
  6. Format output as HTML for frontend display

### 7. Table Controller
File: `table.controller.ts`

**Endpoints cần implement:**

```typescript
GET    /api/table                           // Get all table snapshots
GET    /api/table/:id/detail                // Get specific snapshot
POST   /api/table/clone-export              // Create new snapshot (clone)
POST   /api/table/change-is-latest-version  // Mark version as latest
POST   /api/table/change-note               // Update notes
GET    /api/table-details?table_name_id=:id // Get change history
POST   /api/export/table-details            // Detect and export changes
POST   /api/export/file-table-details       // Export DDL to file
```

### 8. Table Module
File: `table.module.ts`

**Wire everything together:**
- Register entities với TypeORM
- Provide all services
- Register controller

## 📋 WORKFLOW CHÍNH

### Export Table Changes Flow:

```
1. Frontend calls: POST /api/export/table-details
   Body: { db_name_id: 1, history_id?: 2 }

2. Backend:
   a. Get database connection info by db_name_id
   b. Connect to target database
   c. Call SchemaIntrospectionService.getDatabaseSchema()
   d. Get previous snapshot from table_names (if history_id provided)
   e. Call SchemaComparisonService.compareSchemas(old, new)
   f. Call DDLGeneratorService.generateDDL(changes)
   g. Format changes as HTML/JSON for json_change field
   h. Save to table_name_histories with env ('add'/'modify'/'delete')
   i. Return array of changes

3. Frontend displays changes in table with color coding:
   - Green: add
   - Yellow: modify
   - Red: delete
```

### Version Control Flow:

```
1. User clicks "Export" → Creates new snapshot with is_latest_version=1
2. Old snapshots are marked is_latest_version=0
3. User can compare any 2 versions
4. User can "clone" (lock) current version and create new working version
5. Each change is tracked incrementally with timestamp
```

## 🎯 FEATURES

### Detect Changes For:

1. **Tables**
   - New tables added
   - Tables deleted

2. **Columns**
   - New columns added
   - Columns deleted
   - Column modifications:
     - Data type changed (VARCHAR(100) → VARCHAR(255))
     - Nullable changed (NULL → NOT NULL)
     - Default value changed
     - Auto-increment added/removed
     - Comment changed

3. **Indexes**
   - New indexes added (INDEX, UNIQUE, FULLTEXT)
   - Indexes deleted
   - Index type changed

4. **Constraints**
   - Unique constraints added/deleted
   - Check constraints added/deleted (MySQL 8.0+)

5. **Foreign Keys**
   - Foreign keys added
   - Foreign keys deleted
   - ON DELETE/ON UPDATE rules changed

6. **Table Properties**
   - Engine changed (MyISAM → InnoDB)
   - Collation changed
   - Comment changed

## 🔧 TECHNICAL DETAILS

### Database Schema Tables:

```sql
CREATE TABLE `table_names` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `db_name_id` INT NOT NULL,
  `table_name` VARCHAR(255) NOT NULL,
  `note` TEXT,
  `is_latest_version` TINYINT DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `table_name_histories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `table_name_id` INT NOT NULL,
  `table_name` VARCHAR(255) NOT NULL,
  `env` ENUM('add', 'modify', 'delete') NOT NULL,
  `json_change` LONGTEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`table_name_id`) REFERENCES `table_names`(`id`)
);
```

### JSON Change Format:

```html
<div class="schema-change">
  <h3>Table: users</h3>
  <h4>Columns Added:</h4>
  <pre>
ALTER TABLE `users` ADD COLUMN `email_verified` TINYINT(1) DEFAULT 0 AFTER `email`;
  </pre>

  <h4>Indexes Added:</h4>
  <pre>
ALTER TABLE `users` ADD UNIQUE KEY `uk_email` (`email`);
ALTER TABLE `users` ADD INDEX `idx_created_at` (`created_at`);
  </pre>

  <h4>Foreign Keys Added:</h4>
  <pre>
ALTER TABLE `users` ADD CONSTRAINT `fk_users_role`
  FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`)
  ON DELETE RESTRICT ON UPDATE CASCADE;
  </pre>
</div>
```

## 📊 EXAMPLE OUTPUT

### Frontend Display:

| ID | Table Name | Change Type | Changes | Created At |
|----|------------|-------------|---------|------------|
| 1 | users | add | Column `email_verified` added | 2025-12-23 20:30:00 |
| 2 | users | modify | Column `username` changed VARCHAR(50)→VARCHAR(100) | 2025-12-23 20:30:00 |
| 3 | orders | add | Index `idx_user_id` added | 2025-12-23 20:30:00 |
| 4 | orders | add | Foreign key `fk_orders_user` added | 2025-12-23 20:30:00 |

## 🚀 NEXT STEPS

Sau khi review plan này, tôi sẽ:

1. ✅ Implement SchemaComparisonService
2. ✅ Implement DDLGeneratorService
3. ✅ Implement TableService
4. ✅ Implement TableController
5. ✅ Create TableModule
6. ✅ Update app.module.ts để import TableModule
7. ✅ Test với database thật
8. ✅ Commit và push

---

**Vui lòng review plan này và cho tôi biết nếu cần điều chỉnh gì!** 🙏
