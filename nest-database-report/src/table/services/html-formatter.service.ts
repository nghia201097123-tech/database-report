import { Injectable } from '@nestjs/common';
import { SchemaChange } from '../interfaces/schema.interface';

@Injectable()
export class HtmlFormatterService {
  /**
   * Format schema changes as HTML for frontend display
   */
  formatChangesAsHtml(changes: SchemaChange[]): string {
    if (changes.length === 0) {
      return '<div class="no-changes"><p>Không có thay đổi nào được phát hiện.</p></div>';
    }

    // Group changes by table and type
    const groupedChanges = this.groupChangesByTable(changes);

    let html = '<div class="schema-changes">';

    for (const [tableName, tableChanges] of groupedChanges.entries()) {
      html += this.formatTableChanges(tableName, tableChanges);
    }

    html += '</div>';

    return html;
  }

  /**
   * Group changes by table name
   */
  private groupChangesByTable(
    changes: SchemaChange[],
  ): Map<string, SchemaChange[]> {
    const grouped = new Map<string, SchemaChange[]>();

    for (const change of changes) {
      if (!grouped.has(change.tableName)) {
        grouped.set(change.tableName, []);
      }
      grouped.get(change.tableName).push(change);
    }

    return grouped;
  }

  /**
   * Format changes for a single table
   */
  private formatTableChanges(
    tableName: string,
    changes: SchemaChange[],
  ): string {
    let html = `<div class="table-changes">`;
    html += `<h3 style="color: #1890ff; margin: 20px 0 10px 0;">📋 Table: <code>${tableName}</code></h3>`;

    // Separate changes by type
    const adds = changes.filter((c) => c.changeType === 'add');
    const modifies = changes.filter((c) => c.changeType === 'modify');
    const deletes = changes.filter((c) => c.changeType === 'delete');

    // Format added items
    if (adds.length > 0) {
      html += this.formatChangeSection(
        '✅ Added',
        adds,
        '#52c41a',
        'add-section',
      );
    }

    // Format modified items
    if (modifies.length > 0) {
      html += this.formatChangeSection(
        '🔄 Modified',
        modifies,
        '#faad14',
        'modify-section',
      );
    }

    // Format deleted items
    if (deletes.length > 0) {
      html += this.formatChangeSection(
        '❌ Deleted',
        deletes,
        '#ff4d4f',
        'delete-section',
      );
    }

    html += `</div>`;

    return html;
  }

  /**
   * Format a section of changes (add/modify/delete)
   */
  private formatChangeSection(
    title: string,
    changes: SchemaChange[],
    color: string,
    className: string,
  ): string {
    let html = `<div class="${className}" style="margin: 15px 0;">`;
    html += `<h4 style="color: ${color}; margin: 10px 0;">${title}:</h4>`;

    // Group by object type
    const byType = this.groupChangesByObjectType(changes);

    for (const [objectType, items] of byType.entries()) {
      html += `<div class="object-type-group" style="margin-left: 20px;">`;
      html += `<h5 style="color: #666; margin: 8px 0;">${this.formatObjectType(objectType)}:</h5>`;

      for (const item of items) {
        html += this.formatChangeItem(item);
      }

      html += `</div>`;
    }

    html += `</div>`;

    return html;
  }

  /**
   * Group changes by object type
   */
  private groupChangesByObjectType(
    changes: SchemaChange[],
  ): Map<string, SchemaChange[]> {
    const grouped = new Map<string, SchemaChange[]>();

    for (const change of changes) {
      if (!grouped.has(change.objectType)) {
        grouped.set(change.objectType, []);
      }
      grouped.get(change.objectType).push(change);
    }

    return grouped;
  }

  /**
   * Format a single change item
   */
  private formatChangeItem(change: SchemaChange): string {
    let html = `<div class="change-item" style="margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 4px;">`;

    // Object name
    html += `<p style="margin: 5px 0;"><strong>${this.getObjectIcon(change.objectType)} ${change.objectName}</strong></p>`;

    // Show old definition for modify/delete
    if (change.oldDefinition && change.changeType === 'modify') {
      html += `<div style="margin: 5px 0;">`;
      html += `<span style="color: #ff4d4f;">Old:</span> <code style="background: #fff; padding: 2px 6px; border-radius: 3px;">${this.escapeHtml(change.oldDefinition)}</code>`;
      html += `</div>`;
    }

    // Show new definition for add/modify
    if (change.newDefinition && change.changeType !== 'delete') {
      html += `<div style="margin: 5px 0;">`;
      html += `<span style="color: #52c41a;">New:</span> <code style="background: #fff; padding: 2px 6px; border-radius: 3px;">${this.escapeHtml(change.newDefinition)}</code>`;
      html += `</div>`;
    }

    // DDL statement
    html += `<div style="margin: 10px 0;">`;
    html += `<strong>DDL:</strong>`;
    html += `<pre style="background: #272822; color: #f8f8f2; padding: 12px; border-radius: 4px; overflow-x: auto; margin: 5px 0;"><code>${this.escapeHtml(change.ddl)}</code></pre>`;
    html += `</div>`;

    html += `</div>`;

    return html;
  }

  /**
   * Get icon for object type
   */
  private getObjectIcon(objectType: string): string {
    const icons = {
      table: '🗂️',
      column: '📊',
      index: '🔍',
      constraint: '🔗',
    };
    return icons[objectType] || '📌';
  }

  /**
   * Format object type for display
   */
  private formatObjectType(objectType: string): string {
    const labels = {
      table: 'Tables',
      column: 'Columns',
      index: 'Indexes',
      constraint: 'Foreign Keys',
    };
    return labels[objectType] || objectType;
  }

  /**
   * Escape HTML special characters
   */
  private escapeHtml(text: string): string {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

  /**
   * Generate summary statistics
   */
  formatSummary(changes: SchemaChange[]): string {
    const stats = {
      tables: { add: 0, modify: 0, delete: 0 },
      columns: { add: 0, modify: 0, delete: 0 },
      indexes: { add: 0, modify: 0, delete: 0 },
      constraints: { add: 0, modify: 0, delete: 0 },
    };

    for (const change of changes) {
      const type = change.objectType === 'constraint' ? 'constraints' : `${change.objectType}s`;
      if (stats[type]) {
        stats[type][change.changeType]++;
      }
    }

    let html = '<div class="summary" style="background: #e6f7ff; padding: 15px; border-radius: 6px; margin: 15px 0;">';
    html += '<h4 style="margin: 0 0 10px 0; color: #1890ff;">📊 Summary:</h4>';
    html += '<ul style="margin: 0; padding-left: 20px;">';

    for (const [type, counts] of Object.entries(stats)) {
      const total = counts.add + counts.modify + counts.delete;
      if (total > 0) {
        html += `<li><strong>${type.charAt(0).toUpperCase() + type.slice(1)}:</strong> `;
        html += `<span style="color: #52c41a;">${counts.add} added</span>, `;
        html += `<span style="color: #faad14;">${counts.modify} modified</span>, `;
        html += `<span style="color: #ff4d4f;">${counts.delete} deleted</span>`;
        html += `</li>`;
      }
    }

    html += '</ul>';
    html += '</div>';

    return html;
  }
}
